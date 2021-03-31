const {
    performance
} = require('perf_hooks');

const gc1 = (object) => {
    this.storage = object;
    const badSet = new Set();
    // const goodSet = new Set();

    for (let key in this.storage) {
        if (this.storage[key] === 'DELETED') {
            badSet.add(key);
            delete this.storage[key];
        }
        // else goodSet.add(key);
    }
    console.log(badSet);
    // console.log(goodSet);

    // helper function to remove bad hashes
    const helper = () => {
        // examine the root query first
        const rootQuery = this.storage['ROOT_QUERY'];
        // iterate through each key in root query
        for (let query in rootQuery) {
            let hash = rootQuery[query];
            // console.log(hash);
            // if the hash is an array
            if (Array.isArray(hash)) {
                // filter the hash array, removing any items that are in badSet
                hash = hash.filter(item => !badSet.has(item));
                rootQuery[query] = hash;
                // console.log(hash);
                // if the hash array is empty, delete query
                if (hash.length === 0) {
                    delete rootQuery[query];
                }
            } // if the hash is a string
            else {
                if (badSet.has(hash)) {
                    delete rootQuery[query];
                }
            }
        }

        // examine the rest of the cache except for root mutation?
        for (let hash in this.storage) {
            if (hash === 'ROOT_MUTATION') continue;

            for (let subHash in hash) {
                if (Array.isArray(hash[subHash])) {
                    hash[subHash] = hash[subHash].filter(item => !badSet.has(item));
                    console.log(hash[subHash]);
                    if (hash[subHash].length === 0) {
                        delete hash[subHash];
                    }
                } else {
                    if (badSet.has(hash[subHash])) {
                        delete subHash;
                    }
                }
            }
        }
    }

    helper();
    // return this.storage;
} // don't use

const gc2 = (object) => {
    this.storage = object;
    const badHashes = new Set();
    const goodHashes = new Set();

    // go through cache, excluding root query and mutation
    // add hashes to either bad or good sets
    // a hash is "bad" if it's marked for deletion
    const helper1 = () => {
        for (let key in this.storage) {
            if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
            if (this.storage[key] === 'DELETED') {
                badHashes.add(key);
                delete this.storage[key];
            }
        }
    }

    // go through root query, remove any instances of bad hashes
    const helper2 = () => {
        const rootQuery = this.storage['ROOT_QUERY'];
        for (let key in rootQuery) {
            if (Array.isArray(rootQuery[key])) {
                rootQuery[key] = rootQuery[key].filter(x => !badHashes.has(x));
                if (rootQuery[key].length === 0) delete rootQuery[key];
                for (let el of rootQuery[key]) goodHashes.add(el);
            } else(badHashes.has(rootQuery[key])) ? delete rootQuery[key] : goodHashes.add(rootQuery[key]);
        }
    }

    // helper function to go through the good hashes, see if they have sub hashes
    // and add those to good hashes set
    const helper3 = () => {
        for (let key in this.storage) {
            if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
            for (let i in this.storage[key]) {
                if (Array.isArray(this.storage[key][i])) {
                    for (let el of this.storage[key][i]) {
                        if (el.includes('~') && !badHashes.has(el)) {
                            goodHashes.add(el);
                        }
                    }
                } else if (typeof this.storage[key][i] === 'string') {
                    if (this.storage[key][i].includes('~') && !badHashes.has(this.storage[key][i])) {
                        goodHashes.add(this.storage[key][i]);
                    }
                }
            }
        }
    }

    // helper function to remove inaccessible hashes if they are not in goodhashes set
    const helper4 = () => {
        for (let key in this.storage) {
            if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
            if (!goodHashes.has(key)) delete this.storage[key];
            for (let i in this.storage[key]) {
                if (Array.isArray(this.storage[key][i])) {
                    this.storage[key][i] = this.storage[key][i].filter(x => !badHashes.has(x));
                } else if (typeof this.storage[key][i] === 'string') {
                    if (this.storage[key][i].includes('~') && badHashes.has(this.storage[key][i])) {
                        delete this.storage[key][i];
                    }
                }
            }
        }
    }

    let t0_h1 = performance.now();
    helper1();
    let t1_h1 = performance.now();

    let t0_h2 = performance.now();
    helper2();
    let t1_h2 = performance.now();

    let t0_h3 = performance.now();
    helper3();
    let t1_h3 = performance.now();

    let t0_h4 = performance.now();
    helper4();
    let t1_h4 = performance.now();

    // console.log('Time for helper1: ', t1_h1 - t0_h1);
    // console.log('Time for helper2: ', t1_h2 - t0_h2);
    // console.log('Time for helper3: ', t1_h3 - t0_h3);
    // console.log('Time for helper4: ', t1_h4 - t0_h4);
    // console.log('Total time: ', t1_h4 - t0_h1);

    console.log(badHashes);
    console.log(goodHashes);
    return this.storage;
}

const test_1 = {
    ROOT_QUERY: {
        'actor(id:1)': 'Actor~1',
        favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~3'], // includes reference to deleted hash
        'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    ROOT_MUTATION: {
        'favoriteMovie(id:2)': 'Movie~2',
        "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })": 'Movie~5',
        'deleteMovie(id:3)': 'Movie~3',
    },

    'Movie~1': {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        actors: 'Actor~2',
        genre: 'ACTION',
        releaseYear: 1989,
    },
    'Movie~2': {
        id: '2',
        title: 'Empire Strikes Back',
        actors: ['Actor~1', 'Actor~3'],
        releaseYear: 1980,
        isFavorite: true,
    },
    // DELETED
    'Movie~3': 'DELETED',
    'Movie~5': {
        id: '5',
        title: 'The Fugitive',
        genre: 'ACTION',
        releaseYear: 1993,
        isFavorite: false,
    },
    'Actor~1': {
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
        films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery'
    },
    'Actor~3': {
        id: '3',
        firstName: 'Mark',
        lastName: 'Hamill'
    },
    'Actor~4': {
        id: '4',
        firstName: 'Patti',
        lastName: 'LuPone'
    }, // INACCESSIBLE
    'Actor~5': {
        id: '5',
        firstName: 'Gary',
        lastName: 'Oldman'
    }, // INACCESSIBLE
};

const test_2 = {
    ROOT_QUERY: {
        'actor(id:4)': 'Actor~4',
        'actor(id:1)': 'Actor~1',
        favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~3'], // includes reference to deleted hash
        'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    ROOT_MUTATION: {
        'favoriteMovie(id:2)': 'Movie~2',
        "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })": 'Movie~5',
        'deleteMovie(id:3)': 'Movie~3',
    },

    'Movie~1': {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        actors: 'Actor~2',
        genre: 'ACTION',
        releaseYear: 1989,
    },
    'Movie~2': {
        id: '2',
        title: 'Empire Strikes Back',
        actors: ['Actor~1', 'Actor~3'],
        releaseYear: 1980,
        isFavorite: true,
    },
    // DELETED
    'Movie~3': 'DELETED',
    'Movie~5': 'DELETED',
    'Actor~1': {
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
        films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery'
    },
    'Actor~3': {
        id: '3',
        firstName: 'Mark',
        lastName: 'Hamill'
    },
    'Actor~4': {
        id: '4',
        firstName: 'Patti',
        lastName: 'LuPone',
    },
    'Actor~5': 'DELETED', // DELETED
};

const test_3 = {
    ROOT_QUERY: {
        // 'actor(id:4)': 'Actor~4',
        'actor(id:1)': 'Actor~1',
        favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~3'], // includes reference to deleted hash
        'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    ROOT_MUTATION: {
        'favoriteMovie(id:2)': 'Movie~2',
        "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })": 'Movie~5',
        'deleteMovie(id:3)': 'Movie~3',
    },

    'Movie~1': {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        actors: 'Actor~2',
        genre: 'ACTION',
        releaseYear: 1989,
    },
    'Movie~2': {
        id: '2',
        title: 'Empire Strikes Back',
        actors: ['Actor~1', 'Actor~3'],
        releaseYear: 1980,
        isFavorite: true,
    },
    // DELETED
    'Movie~3': 'DELETED',
    'Movie~5': 'DELETED',
    'Movie~6': {
        id: '6',
        title: 'Whatever'
    }, // INACCESSIBLE IF ACTOR 4 IS DELETED
    'Actor~1': {
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
        films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery'
    },
    'Actor~3': {
        id: '3',
        firstName: 'Mark',
        lastName: 'Hamill'
    },
    'Actor~4': {
        id: '4',
        firstName: 'Patti',
        lastName: 'LuPone',
        films: 'Movie~6'
    }, // INACCESSIBLE
    'Actor~5': 'DELETED', // DELETED
};

// let test1 = gc2(test_1);
// console.log(test1);
// let test2 = gc2(test_2);
// console.log(test2);
// let test3 = gc2(test_3);
// console.log(test3);
// let test4 = gc2(test_3);
// console.log(test4);

/*--------------------------------------------------------------*/

function gc() {
    // garbageCollection;  garbage collection: removes any inaccessible hashes from the cache
    const badHashes = getBadHashes();
    const goodHashes = rootQueryCleaner(badHashes);
    const goodHashes2 = getGoodHashes(badHashes, goodHashes);
    removeInaccessibleHashes(badHashes, goodHashes2);
}

// remove hashes that are flagged for deletion and store records of them in a set badHashes for removal inside root queries
function getBadHashes() {
    const badHashes = new Set();
    for (let key in storage) {
        if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
        if (storage[key] === 'DELETED') {
            badHashes.add(key);
            delete storage[key];
        }
    }
    return badHashes;
}

// go through root queries, remove all instances of bad hashes, add remaining hashes into goodHashes set
function rootQueryCleaner(badHashes) {
    const goodHashes = new Set();
    const rootQuery = storage['ROOT_QUERY'];
    for (let key in rootQuery) {
        if (Array.isArray(rootQuery[key])) {
            rootQuery[key] = rootQuery[key].filter(x => !badHashes.has(x));
            if (rootQuery[key].length === 0) delete rootQuery[key];
            for (let el of rootQuery[key]) goodHashes.add(el);
        } else(badHashes.has(rootQuery[key])) ? delete rootQuery[key] : goodHashes.add(rootQuery[key]);
    }
    return goodHashes;
}

// Go through the cache, check good hashes for any nested hashes and add them to goodHashes set
function getGoodHashes(badHashes, goodHashes) {
    for (let key in storage) {
        if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
        for (let i in storage[key]) {
            if (Array.isArray(storage[key][i])) {
                for (let el of storage[key][i]) {
                    if (el.includes('~') && !badHashes.has(el)) {
                        goodHashes.add(el);
                    }
                }
            } else if (typeof storage[key][i] === 'string') {
                if (storage[key][i].includes('~') && !badHashes.has(storage[key][i])) {
                    goodHashes.add(storage[key][i]);
                }
            }
        }
    }
    return goodHashes;
}

// Remove inaccessible hashes by checking if they are in goodhashes set or not
function removeInaccessibleHashes(badHashes, goodHashes) {
    for (let key in storage) {
        if (key === 'ROOT_QUERY' || key === 'ROOT_MUTATION') continue;
        if (!goodHashes.has(key)) delete storage[key];
        for (let i in storage[key]) {
            if (Array.isArray(storage[key][i])) {
                storage[key][i] = storage[key][i].filter(x => !badHashes.has(x));
            } else if (typeof storage[key][i] === 'string') {
                if (storage[key][i].includes('~') && badHashes.has(storage[key][i])) {
                    delete storage[key][i];
                }
            }
        }
    }
    return storage;
}

const storage = {
    ROOT_QUERY: {
        'actor(id:1)': 'Actor~1',
        favoriteMovies: ['Movie~1', 'Movie~2', 'Movie~3'], // includes reference to deleted hash
        'movies(input:{genre:ACTION})': ['Movie~1', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    ROOT_MUTATION: {
        'favoriteMovie(id:2)': 'Movie~2',
        "addMovie(input: {title: 'The Fugitive', releaseYear: 1993, genre: ACTION })": 'Movie~5',
        'deleteMovie(id:3)': 'Movie~3',
    },

    'Movie~1': {
        id: '1',
        title: 'Indiana Jones and the Last Crusade',
        actors: 'Actor~2',
        genre: 'ACTION',
        releaseYear: 1989,
    },
    'Movie~2': {
        id: '2',
        title: 'Empire Strikes Back',
        actors: ['Actor~1', 'Actor~3'],
        releaseYear: 1980,
        isFavorite: true,
    },
    // DELETED
    'Movie~3': 'DELETED',
    'Movie~5': {
        id: '5',
        title: 'The Fugitive',
        genre: 'ACTION',
        releaseYear: 1993,
        isFavorite: false,
    },
    'Actor~1': {
        id: '1',
        firstName: 'Harrison',
        lastName: 'Ford',
        films: ['Movie~1', 'Movie~2', 'Movie~3', 'Movie~5'], // includes reference to deleted hash
    },
    'Actor~2': {
        id: '2',
        firstName: 'Sean',
        lastName: 'Connery'
    },
    'Actor~3': {
        id: '3',
        firstName: 'Mark',
        lastName: 'Hamill'
    },
    'Actor~4': {
        id: '4',
        firstName: 'Patti',
        lastName: 'LuPone'
    }, // INACCESSIBLE
    'Actor~5': {
        id: '5',
        firstName: 'Gary',
        lastName: 'Oldman'
    }, // INACCESSIBLE
};

let getBadHashesTest = getBadHashes(test_1);
// console.log(getBadHashesTest);
let rootQueryCleanerTest = rootQueryCleaner(getBadHashesTest);
// console.log(rootQueryCleanerTest);
let getGoodHashesTest= getGoodHashes(getBadHashesTest,rootQueryCleanerTest);
// console.log(getGoodHashesTest);
let removeInaccessibleHashesTest = removeInaccessibleHashes(getBadHashesTest, getGoodHashesTest);
// console.log(removeInaccessibleHashesTest);