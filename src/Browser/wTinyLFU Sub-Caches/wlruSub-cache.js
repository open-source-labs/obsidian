import { plural } from "https://deno.land/x/deno_plural@2.0.0/mod.ts";

import normalizeResult from "../normalize.js";
import destructureQueries from "../destructure.js";
import LRUCache from '../lruBrowserCache.js';

/*****
* Window LRU
*****/
export default function WLRUCache(capacity) {
  this.capacity = capacity;
  this.currentSize = 0;
  this.nodeHash = new Map();

  this.head = new Node('head', null);
  this.tail = new Node('tail', null);
  this.head.next = this.tail;
  this.tail.prev = this.head;
}
// Methods copied from lru browser cache
WLRUCache.prototype = Object.create(LRUCache.prototype, {constructor: {value: WLRUCache}});

WLRUCache.prototype.putAndNominate = function (key, node) {
  const nominated = this.put(key, node);
  // TODO: add logic to send nominated node to TinyLFU
}