const assert = require('assert');
const { Vertex, DepthFirst } = require("./index");

describe("DepthFirst", () => {
  const a = new Vertex('a');
  const b = new Vertex('b');
  const c = new Vertex('c');
  const d = new Vertex('d');
  const e = new Vertex('e');

  a.setNeighbours([b, c]);
  b.setNeighbours([a, d]);
  c.setNeighbours([a, d]);
  d.setNeighbours([b, c, e]);
  e.setNeighbours([d]);

  describe("#each", () => {
    it("traverse graph in depth-first way", () => {
      const path = [];

      DepthFirst.each((vertex, levelIndex) => {
        if (path[levelIndex]) {
          path[levelIndex].push(vertex.getValue());
        } else {
          path[levelIndex] = [vertex.getValue()];
        }
      }, a);

      assert.deepEqual([["a"], ["b", "c"], ["d"], ["e"]], path);
    });
  })
});
