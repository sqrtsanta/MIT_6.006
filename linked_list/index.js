class Item {
  constructor(key, value) {
    this._key = key;
    this._value = value;
  }

  value() { return this._value; }
  key() { return this._key; }

  setNext(item) { this._next = item; }
  next() { return this._next; }

  setPrev(item) { this._prev = item; }
  prev() { return this._prev; }
}

class LinkedList {
  constructor(key, value) {
    if (key && value) {
      this._curr = new Item(key, value);
    }
  }

  insert(key, value) {
    if (!this._curr) {
      this._curr = new Item(key, value);
      return;
    }

    const curr = this._curr;
    const next = new Item(key, value);

    next.setPrev(curr);
    curr.setNext(next);

    this._curr = next;
  }

  delete(key) {
    const item = this.search(key);

    if (!item) {
      return;
    }

    if (item.prev()) {
      item.prev().setNext(item.next());
    }

    if (item.next()) {
      item.next().setPrev(item.prev());
    }

    if (item.key() === this._curr.key()) {
      this._curr = item.prev();
    }
  }

  search(key) {
    if (!this._curr) {
      return;
    }

    let curr = this._curr;
    while (curr) {
      if (curr.key() === key) {
        return curr;
      }

      curr = curr.prev();
    }
  }

  forEach(fn) {
    if (!this._curr) {
      return;
    }

    let curr = this._curr;
    while (curr) {
      fn(curr);

      curr = curr.prev();
    }
  }
}

module.exports = LinkedList;
