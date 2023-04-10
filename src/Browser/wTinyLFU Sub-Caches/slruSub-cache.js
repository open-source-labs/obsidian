import LRUCache from './lruSub-cache.js';

/*****
* Main SLRU Cache
*****/
export default function SLRUCache(capacity) {
  // Probationary LRU Cache using existing LRU structure in lruBrowserCache.js
  this.probationaryLRU = new LRUCache(capacity * .20);
  // Protected LRU Cache
  this.protectedLRU = new LRUCache(capacity * .80);
}

// Get item from cache, updates last access, 
// and promotes existing items to protected
SLRUCache.prototype.get = function (key) {
  // get the item from the protectedLRU
  const protectedItem = this.protectedLRU.get(key);
  // check to see if the item is in the probationaryLRU
  const probationaryItem = this.probationaryLRU.peek(key);

  // If the item is in neither segment, return undefined
  if (protectedItem === null && probationaryItem === null) return;

  // If the item only exists in the protected segment, return that item
  if (protectedItem !== null) return protectedItem;

  // If the item only exists in the probationary segment, promote to protected and return item
  // if adding an item to the protectedLRU results in ejection, demote ejected node
  this.probationaryLRU.delete(key);
  this.putAndDemote(key, probationaryItem);
  return probationaryItem;
}

// add or update item in cache
SLRUCache.prototype.put = function (key, node) {
  // if the item is in the protected segment, update it
  if (this.protectedLRU.nodeHash.get(key)) this.putAndDemote(key, node);
  else if (this.probationaryLRU.nodeHash(key)) {
    // if the item is in the probationary segment, 
    // promote and update it
    this.probationaryLRU.delete(key);
    this.putAndDemote(key, node);
  }
  // if in neither, add item to the probationary segment
  else this.probationaryLRU.put(key, node)
}

// Check to see if the item exists in the cache without updating access
SLRUCache.prototype.has = function (key) {
  return this.protectedLRU.nodeHash.get(key) || this.probationaryLRU.nodeHash.get(key);
}

// Adds a node to the protectedLRU 
SLRUCache.prototype.putAndDemote = function (key, value) {
  // if adding an item to the protectedLRU results in ejection, demote ejected node
  const demoted = this.protectedLRU.put(key, value);
  if (demoted) this.probationaryLRU.put(demoted.key, demoted);
}