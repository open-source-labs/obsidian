export type Node = {
  key: any;
  value: any;
  next:  Node | null;
}

export type CacheItem = {

}

export interface LRU {
  capacity: number;
  currentSize: number;
  ROOT_QUERY: {};
  ROOT_MUTATION: {};
  nodeHash: Map<string, Node>;
  head: Node;
  tail: Node;
  put: Function;
  getCandidate: Function;
  
}

export type SLRU = {
  probationaryLRU: LRU;
  protectedLRU: LRU;
}