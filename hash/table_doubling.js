const LinkedList = require("../linked_list");
const { universalHashF } = require("./utils");

/*
* TableDoublingHash
* Insert, Delete, Search - O(1)
*
* The problem with ChainingHash
* we need to define capacity, but data is coming in unpredictible way
* solution:
*   define initial capacity,
*   enlarge it on insert if necessary
*   shrink it on delete if necessary
*/
class TableDoublingHash {
  constructor(capacity = 8) {
    this.init(capacity);
  }

  init(capacity) {
    this.table = [];
    this.capacity = capacity;
    this.length = 0;
    this.hashF = universalHashF(capacity);
  }

  insert(key, value) {
    const hashKey = this.hashF(key);

    if (!this.table[hashKey]) {
      this.table[hashKey] = new LinkedList(key, value);
      this.length += 1;
    } else {
      const list = this.table[hashKey];

      if (list.search(key)) {
        list.delete(key);
        list.insert(key, value);
      } else {
        list.insert(key, value);
        this.length += 1;
      }
    }

    if (this.length >= this.capacity) {
      this.enlarge();
    }
  }

  delete(key) {
    const hashKey = this.hashF(key);

    if (this.table[hashKey]) {
      const list = this.table[hashKey];
      list.delete(key);
      this.length -= 1;
    }

    if (this.length / 4 >= this.capacity) {
      this.shrink();
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

  rebuild(capacity) {
    const oldTable = this.table.slice(0);

    this.init(capacity);

    oldTable.forEach(list => {
      if (list) {
        list.forEach(item => {
          this.insert(item.key(), item.value());
        });
      }
    });
  }

  enlarge() {
    this.rebuild(this.capacity * 2);
  }

  shrink() {
    this.rebuild(this.capacity / 2);
  }
}

module.exports = TableDoublingHash;
