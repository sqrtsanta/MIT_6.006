const BST = require('./index');

/*
* Booking - system to reserve time
* k - parameter, in vicinity of which, time is reserved
*/
class Booking {
  constructor(array, k) {
    this._tree = BST.fromArray(array);
    this._k = k;
  }

  reserve(time) {
    // count 0 as now/starting point
    if (time <= 0) {
      return false;
    }

    const node = this._tree.findWithFn(time, (value) => {
      return Math.abs(value - time) >= this._k;
    });

    if (!node) {
      return false;
    }

    this._tree.insert(time);

    return true;
  }

  // number of reservations before "time"
  rank(time) {
    return this._tree.lteq(time);
  }
}

module.exports = Booking;
