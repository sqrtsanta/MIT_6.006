const LinkedList = require('../linked_list');
const { universalHashF } = require('./utils');

/*
* ChainingHash
* Insert, Delete, Search - O(1)
*
* simple approach: key -> table[key]
* but if the key is too big, too much memory wasted
* solution: key -> hash(key) -> table[hashKey]
* to deal with possible collisions, we keep items in linked list
*
* disadvantage - we need to define initial capacity
* works only for static set of keys S in U (universe of keys)
*/
class ChainingHash {
  constructor(capacity) {
    this.table = [];
    this.hashF = universalHashF(capacity);
  }

  insert(key, value) {
    const hashKey = this.hashF(key);

    if (!this.table[hashKey]) {
      this.table[hashKey] = new LinkedList(key, value);
    } else {
      const list = this.table[hashKey];

      // do not keep duplicates, overwrite them
      list.delete(key);
      list.insert(key, value);
    }
  }

  delete(key) {
    const hashKey = this.hashF(key);

    if (this.table[hashKey]) {
      const list = this.table[hashKey];
      list.delete(key);
    }
  }

  search(key) {
    const hashKey = this.hashF(key);
    const list = this.table[hashKey];

    if (!list) {
      return;
    }

    const item = list.search(key);

    if (item) {
      return item.value();
    }
  }
}

module.exports = ChainingHash;
