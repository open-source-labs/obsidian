import { plural } from "https://deno.land/x/deno_plural/mod.ts";

import normalizeResult from "./normalize.js";
import destructureQueries from "./destructure.js";

class Node {
  constructor (key, value) {
    this.key = key;
    this.value = value;
    this.next = this.prev = null;
  }
}