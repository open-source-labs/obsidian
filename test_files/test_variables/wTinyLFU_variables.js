// import { FrequencySketch } from '../../src/Browser/FrequencySketch.js'

/*****
* Overall w-TinyLFU Cache
*****/
export default function WTinyLFUCache (capacity) {
  this.capacity = capacity;
  this.sketch = {};

  // initialize window cache with access to frequency sketch
  this.WLRU = new LRUCache(capacity * .01);
  this.WLRU.sketch = this.sketch;
  // initialize segmented main cache with access to frequency sketch
  this.SLRU = new SLRUCache(capacity * .99);
  this.SLRU.probationaryLRU.sketch = this.sketch;
  this.SLRU.protectedLRU.sketch = this.sketch;
}

WTinyLFUCache.prototype.putAndPromote = async function (key, value) {
  const WLRUCandidate = this.WLRU.put(key, value);
  // if adding to the WLRU cache results in an eviction...
  if (WLRUCandidate) {
    // if the probationary cache is at capacity...
    let winner = WLRUCandidate;
    if (this.SLRU.probationaryLRU.nodeHash.size >= Math.floor(this.SLRU.probationaryLRU.capacity)) {
      // send the last accessed item in the probationary cache to the TinyLFU
      const SLRUCandidate = this.SLRU.probationaryLRU.getCandidate();
      // determine which item will improve the hit-ratio most
      winner = await this.TinyLFU(WLRUCandidate, SLRUCandidate);
    }
    // add the winner to the probationary SLRU 
    this.SLRU.probationaryLRU.put(winner.key, winner.value);
  }
}

WTinyLFUCache.prototype.TinyLFU = function (WLRUCandidate, SLRUCandidate) {
  // get the frequency values of both items
  const WLRUFreq = this.sketch[WLRUCandidate.key];
  const SLRUFreq = this.sketch[SLRUCandidate.key];
  // return the object with the higher frequency, prioritizing items in the window cache,
  return WLRUFreq >= SLRUFreq ? WLRUCandidate : SLRUCandidate;
}

/*****
* Main SLRU Cache
*****/
function SLRUCache(capacity) {
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
  if (demoted) this.probationaryLRU.put(demoted.key, demoted.value);
}

class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value;
    this.next = this.prev = null;
  }
}

function LRUCache(capacity) {
  this.capacity = capacity;
  this.currentSize = 0;
  // node hash for cache lookup and storage
  this.nodeHash = new Map();

  // doubly-linked list to keep track of recency and handle eviction
  this.head = new Node('head', null);
  this.tail = new Node('tail', null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
}

LRUCache.prototype.removeNode = function (node) {
  const prev = node.prev;
  const next = node.next; 
  prev.next = next; 
  next.prev = prev;
};


LRUCache.prototype.addNode = function (node) {
  const tempTail = this.tail.prev;
  tempTail.next = node;
  
  this.tail.prev = node;
  node.next = this.tail;
  node.prev = tempTail;
}

// Like get, but doesn't update anything
LRUCache.prototype.peek = function(key) {
  const node = this.nodeHash.get(key);
  if (!node) return null;
  return node.value;
}

// Like removeNode, but takes key and deletes from hash
LRUCache.prototype.delete = function (key) {
  const node = this.nodeHash.get(key);
  const prev = node.prev;
  const next = node.next; 
  prev.next = next; 
  next.prev = prev;
  this.nodeHash.delete(key);
}

LRUCache.prototype.get = function(key) {
  const node = this.nodeHash.get(key);
 
  // check if node does not exist in nodeHash obj
  if (!node) return null;
  // update position to most recent in list
  this.removeNode(node);
  this.addNode(node);
  return node.value;
}

// used by wTinyLFU to get SLRU eviction candidates for TinyLFU decision
LRUCache.prototype.getCandidate = function () {
  const tempHead = this.head.next;
  this.removeNode(tempHead);
  this.nodeHash.delete(tempHead.key);
  return {key: tempHead.key, value: tempHead.value};
}

LRUCache.prototype.put = function (key, value) {
  // create a new node
  const newNode = new Node(key, value);

  // remove node from old position
  const node = this.nodeHash.get(key);
  if (node) this.removeNode(node);

  // add new node  to tail
  this.addNode(newNode);
  this.nodeHash.set(key, newNode);

  // check capacity - if over capacity, remove and reassign head node
  if (this.nodeHash.size > this.capacity){
    const tempHead = this.head.next;
    this.removeNode(tempHead);
    this.nodeHash.delete(tempHead.key);
    // return tempHead for use in w-TinyLFU's SLRU cache
    return {key: tempHead.key, value: tempHead.value};
  }
}

