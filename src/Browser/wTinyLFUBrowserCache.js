import { plural } from "https://deno.land/x/deno_plural/mod.ts";

import normalizeResult from "./normalize.js";
import destructureQueries from "./destructure.js";
import LRUCache from './lruBrowserCache.js';

// Basic list node structure
class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value;
    this.next = this.prev = null;
  }
}

/*****
* Overall w-TinyLFU Cache
*****/
export default function WTinyLFUCache (capacity) {
  this.WLRU = new WLRUCache(capacity * .01);
  this.SLRU = new SLRUCache(capacity * .99);
}

/*****
* Window LRU
*****/
export function WLRUCache(capacity) {
  this.capacity = capacity;
  this.currentSize = 0;
  this.ROOT_QUERY = {};
  this.ROOT_MUTATION = {};
  this.nodeHash = new Map();

  this.head = new Node('head', null);
  this.tail = new Node('tail', null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
}
// Methods copied from lru browser cache
WLRUCache.prototype = Object.create(LRUCache.prototype, {constructor: {value: WLRUCache}});

/*****
* Main SLRU Cache
*****/
export function SLRUCache(capacity) {
  // TODO: Figure out initial capacities for each segment
  // Probationary LRU Cache using existing LRU structure in lruBrowserCache.js
  this.probationaryLRU = new LRUCache;
  // Protected LRU Cache
  this.protectedLRU = new LRUCache;
}

// Get item from cache, 
// updates last access and promotes items to protected
SLRUCache.prototype.get = function (key) {
  // get the item from the protectedLRU
  const protectedItem = this.protectedLRU.get(key);
  // check to see if the item is in the probationaryLRU
  const probationaryItem = this.probationaryLRU.peek(key);

  // If the item is in neither segment, return undefined
  if (protectedItem === undefined && probationaryItem === undefined) return;

  // If the item only exists in the protected segment, return that item
  if (protectedItem !== undefined) return protectedItem;

  // If the item only exists in the probationary segment, promote to protected and return item
  this.probationaryLRU.delete(key);
  // if adding an item to the protectedLRU results in ejection, demote ejected node
  this.putAndDemote(key, probationaryItem);
  return probationaryItem;
}

// Get item from cache, update last access,
// and promotes existing items to protected
SLRUCache.prototype.get = function (key) {
  const protectedItem = this.protectedLRU.get(key);
  const probationaryItem = this.probationaryLRU.peek(key);

  // if the key is found in neither segment, return undefined
  if (protectedItem === undefined && probationaryItem === undefined) return;

  // if found in protected, return the item
  if (protectedItem !== undefined) return protectedItem;

  // if found in probationary, promote and return item
  this.probationaryLRU.delete(key);
  // if adding an item to the protectedLRU results in ejection, demote ejected node
  this.putAndDemote(key, probationaryItem);
  return probationaryItem
}

// Get an item from a key without updating access or promoting
SLRUCache.prototype.peek = function (key) {
  const protectedItem = this.protectedLRU.peek(key);
  const probationaryItem = this.probationaryLRU.peek(key);

  // return the protectedItem unless it is undefined, then return probationaryItem instead
  return protectedItem === undefined ? probationaryItem : protectedItem;
}

// add or update item in cache
// if item does not exist, added to probational segment
// if item exists in probational segment, update value and promote to protected
// if exists in protected segment, update and make most recent
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

// deletes an item from BOTH segments of the cache
SLRUCache.prototype.delete = function (key) {
  this.protectedLRU.delete(key);
  this.probationaryLRU.delete(key);
}

// Check to see if the item exists in the cache without updating access
SLRUCache.prototype.has = function (key) {
  return this.protectedLRU.nodeHash.get(key) || this.probationaryLRU.nodeHash.get(key);
}

// TODO - maybe - add method for completely wiping both caches? Iterating over them? Returning array of keys or nodes? returning length?

// Adds a node to the protectedLRU 
// if that results in an ejection, add the ejected node to the probationary LRU
SLRUCache.prototype.putAndDemote = function (key, node) {
  // if adding an item to the protectedLRU results in ejection, demote ejected node
  const demoted = this.protectedLRU.put(key, node);
  if (demoted) this.probationaryLRU.put(demoted.key, demoted);
}