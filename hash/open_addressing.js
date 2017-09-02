
const { linearProbingHashF } = require('./utils');

const DELETED = Symbol('DELETED');

const isDeleted = item => item === DELETED;
const isPresent = item => item && !isDeleted(item);

class Item {
  constructor(key, value) {
    this.item = [key, value];
  }

  key() {
    return this.item[0];
  }

  value() {
    return this.item[1];
  }
}

/*
* OpenAddressingHash
* Insert, Delete, Search - O(1)
*
* The problem with TableDoublingHash
* we need to work with LinkedList (pointers/etc)
* solution:
*   use probing strategy: hashKey calculated with probeIndex
*   enlarge it on insert if necessary
*   shrink it on delete if necessary
*/
class OpenAddressingHash {
  constructor(capacity = 8) {
    this.init(capacity);
  }

  init(capacity) {
    this.table = [];
    this.capacity = capacity;
    this.length = 0;
    this.hashF = linearProbingHashF(capacity);
  }

  insert(key, value, probeIndex = 0) {
    if (probeIndex >= this.capacity - 1) {
      return;
    }

    const hashKey = this.hashF(key, probeIndex);
    const item = this.table[hashKey];

    if (isPresent(item) && item.key() !== key) {
      this.insert(key, value, probeIndex + 1);
    } else {
      this.table[hashKey] = new Item(key, value);
      this.length += 1;
    }

    if (this.length === this.capacity) {
      this.enlarge();
    }
  }

  delete(key, probeIndex = 0) {
    if (probeIndex >= this.capacity - 1) {
      return;
    }

    const hashKey = this.hashF(key, probeIndex);
    const item = this.table[hashKey];

    if (!item) {
      return;
    }

    if (isDeleted(item) || item.key() !== key) {
      this.delete(key, probeIndex + 1);
    } else {
      this.table[hashKey] = DELETED;
      this.length -= 1;
    }

    if (this.length / 4 >= this.capacity) {
      this.shrink();
    }
  }

  search(key, probeIndex = 0) {
    if (probeIndex >= this.capacity - 1) {
      return;
    }

    const hashKey = this.hashF(key, probeIndex);
    const item = this.table[hashKey];

    if (!item) {
      return;
    }

    if (isDeleted(item) || item.key() !== key) {
      return this.search(key, probeIndex + 1);
    } else {
      return item.value();
    }
  }

  rebuild(capacity) {
    const oldTable = this.table.slice(0);

    this.init(capacity);

    for (let i = 0; i < oldTable.length; i += 1) {
      const item = oldTable[i];

      if (isPresent(item)) {
        this.insert(item.key(), item.value());
      }
    }
  }

  enlarge() {
    this.rebuild(this.capacity * 2);
  }

  shrink() {
    this.rebuild(this.capacity / 2);
  }
}

module.exports = OpenAddressingHash;
