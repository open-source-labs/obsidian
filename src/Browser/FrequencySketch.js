// CONVERT TO TYPESCRIPT FOR TYPE ENFORCING (MOSTLY TO INTEGERS)

const nearestPowerOfTwo = num => {
  const exp = Math.floor(Math.log2(num));
  if (Math.pow(2, exp) === num) return num;

  return Math.pow(2, exp+1);
}

const hashCode = (input) => {
  let hash, code;
  hash = 0;
  for (let i = 0; i < input.length; i++) {
    code = input.charCodeAt(i);
    hash = ((hash<<5)-hash)+code;
    hash = hash & hash;
  }
  return hash;
}

const FrequencySketch = () => {

  const RESET_MASK = 0x7777777777777777;
  const ONE_MASK = 0x1111111111111111;

  let sampleSize, blockMask, size;
  const table = [];

  /**
   * Initializes and increases the capacity of this FrequencySketch instance
   * so it can accurately estimate the popularity of data given the maximum
   * size of the cache. Frequency counts become zero when resizing.
   * 
   * @param maxSize cache capacity
   */
  const updateCapacity = maxSize => {
    const max = Math.floor(maxSize);  //to ensure it's an integer
    if(table.length >= max) return;

    table = new Array(Math.max(nearestPowerOfTwo(max), 8));
    sampleSize = (maxSize === 0) ? 10 : (10*max);
    blockMask = (table.length >>> 3) - 1;

    if (sampleSize <= 0) sampleSize = Number.MAX_SAFE_INTEGER;
    size = 0;
  }  
  /**
   * Returns true if the sketch has not been initialized, indicating updateCapcity
   * needs to be called before tracking frequencies. 
   */
  const isNotInitialized = () => {
    return table.length === 0;
  }
  /**
   * Returns the estimated frequency of an element, up to the maximum(15).
   * 
   * @param el the element being counted
   * @return the estimated frequency - required to be nonnegative
   */

  const frequency = el => {
    if(isNotInitialized()) return 0;
    
    const count = new Array(4);

    const blockHash = supphash(hashCode(el));
    const counterHash = rehash(blockHash);
    const block = (blockHash & blockMask) << 3;

    for (let i = 0; i < 4; i++) {
      const h = counterHash >>> (i << 3);
      const index = (h >>> 1) & 15;
      const offset = h & 1;
      count[i] = ((table[block+offset+(i<<1)] >>> (index << 2)) & 15);
    }
    return Math.min(...count);
  }

  /**
   * Increment the frequency of the element if it does not exceed the maximum(15)
   * @param el element to add
   */
  const increment = el => {
    if (isNotInitialized()) return;

    const index = new Array[8];

    const blockHash = supphash(hashCode(el));
    const counterHash = rehash(blockHash);
    const block = (blockHash & blockMask) << 3;

    for (const i = 0; i < 4; i++) {
      const h = counterHash >>> (i << 3);
      index[i] = (h >>> 1) & 15;
      const offset = h & 1;
      index[i + 4] = block + offset + (i << 1);
    }
    const incremented =
          incrementAt(index[4], index[0])
        | incrementAt(index[5], index[1])
        | incrementAt(index[6], index[2])
        | incrementAt(index[7], index[3]);

    if (incremented && (++size == sampleSize)) {
      reset();
    }
  }

  /** Applies a supplemental hash functions for less collisions. */
  const supphash = x => {
    x ^= x >> 17;
    x *= 0xed5ad4bb;
    x ^= x >> 11;
    x *= 0xac4c1b51;
    x ^= x >> 15;
    return x;
}

  /** Applies another round of hashing to acheive three round hashing. */
  const rehash = x => {
    x *= 0x31848bab;
    x ^= x >> 14;
    return x;
  }

  /**
   * Increments the specified counter by 1 if it is not already at the maximum value (15).
   *
   * @param i the table index (16 counters)
   * @param j the counter to increment
   * @return if incremented
   */
  const incrementAt = (i,j) => {
    const offset = j << 2;
    const mask = (15 << offset);
    if ((table[i] & mask) != mask) {
      table[i] += (1 << offset);
      return true;
    }
    return false;
  }

  /** Reduces every counter by half of its original value. */
  const reset = () => {
    let count = 0;
    for (let i = 0; i < table.length; i++) {
      count += bitCount(table[i] & ONE_MASK);
      table[i] = (table[i] >>> 1) & RESET_MASK;
    }
    size = (size - (count >>> 2)) >>> 1;
  }
}

FrequencySketch();