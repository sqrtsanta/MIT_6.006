const assert = require('assert');

const { fibonacci } = require("./index");

describe("Dynamic", () => {
  describe("fibonacci", () => {
    it("returns 610 for 14 index", () => {
      assert.equal(fibonacci(14), 610);
    });

    it("returns 1346269 for 30 index", () => {
      assert.equal(fibonacci(30), 1346269);
    });
  });
});
