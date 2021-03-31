class LRUCache {
    constructor(capacity) {
        this.cache = new Map();
        this.capacity = capacity;
    }

    get(key) {
        if (this.cache.has(key)) {
            let value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        } else {
            console.log('key not found');
            return null;
        }
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size >= this.capacity) {
            let LRUKey = this.cache.keys().next().value;
            this.cache.delete(LRUKey);
        }
    }
}

let testCache = new LRUCache(7);
console.log(testCache);

testCache.put('Item~1', 'Value~1');
testCache.put('Item~2', 'Value~2');
testCache.put('Item~3', 'Value~3');
testCache.put('Item~4', 'Value~4');
testCache.put('Item~5', 'Value~5');
testCache.put('Item~6', 'Value~6');
console.log(testCache);
testCache.put('Item~7', 'Value~7');
//item 1 is evicted
console.log(testCache);
