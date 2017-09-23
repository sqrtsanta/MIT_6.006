const assert = require('assert');
const { Vertex, BFS, DFS, shortestPath } = require("./index");

describe("Graph", () => {
  const a = new Vertex("a");
  const b = new Vertex("b");
  const c = new Vertex("c");
  const d = new Vertex("d");
  const e = new Vertex("e");
  const f = new Vertex("f");
  const g = new Vertex("g");
  const h = new Vertex("h");

  a.connectWith(b, { weight: 2 });
  a.connectWith(c, { weight: 4 });
  a.connectWith(e, { weight: 1 });

  b.connectWith(a, { weight: 2 });
  b.connectWith(e, { weight: 8 });
  b.connectWith(c, { weight: 3 });
  b.connectWith(d, { weight: 5 });
  b.connectWith(f, { weight: 3 });

  e.connectWith(a, { weight: 1 });
  e.connectWith(b, { weight: 8 });
  e.connectWith(g, { weight: 2 });

  c.connectWith(a, { weight: 4 });
  c.connectWith(b, { weight: 3 });
  c.connectWith(f, { weight: 7 });

  d.connectWith(b, { weight: 5 });
  d.connectWith(g, { weight: 3 });
  d.connectWith(h, { weight: 6 });
  d.connectWith(f, { weight: 2 });

  g.connectWith(e, { weight: 2 });
  g.connectWith(d, { weight: 3 });
  g.connectWith(h, { weight: 11 });

  f.connectWith(b, { weight: 3 });
  f.connectWith(c, { weight: 7 });
  f.connectWith(d, { weight: 2 });
  f.connectWith(h, { weight: 8 });

  h.connectWith(f, { weight: 8 });
  h.connectWith(d, { weight: 6 });
  h.connectWith(g, { weight: 11 });

  describe("BFS", () => {
    describe("#each", () => {
      it("traverse graph in depth-first way", () => {
        const path = [];

        BFS.each((vertex, levelIndex) => {
          if (path[levelIndex]) {
            path[levelIndex].push(vertex.getValue());
          } else {
            path[levelIndex] = [vertex.getValue()];
          }
        }, a);

        assert.deepEqual([['a'], ['b', 'c', 'e'], ['d', 'f', 'g'], ['h']], path);
      });
    })
  });

  describe("DFS", () => {
    describe("#each", () => {
      it("traverse graph in depth-first way", () => {
        const path = [];

        DFS.each((vertex, levelIndex) => {
          if (path[levelIndex]) {
            path[levelIndex].push(vertex.getValue());
          } else {
            path[levelIndex] = [vertex.getValue()];
          }
        }, a);

        assert.deepEqual([['a'], ['b'], ['e'], ['g'], ['d'], ['h'], ['f'], ['c']], path);
      });
    });
  });

  describe("shortestPath", () => {
    describe("Naive#find", () => {
      it("finds shortest path between vertices a & h", () => {
        const { path, weight } = shortestPath.Naive.find(a, h);

        assert.deepEqual(path, ["a", "e", "g", "d", "h"]);
        assert.deepEqual(weight, 12);
      });

      it("finds shortest path between vertices a & a", () => {
        const { path, weight } = shortestPath.Naive.find(a, a);

        assert.deepEqual(path, []);
        assert.deepEqual(weight, 0);
      });

      it("finds shortest path between vertices a & a", () => {
        const { path, weight } = shortestPath.Naive.find(e, f);

        assert.deepEqual(path, ["e", "a", "b", "f"]);
        assert.deepEqual(weight, 6);
      });
    });
  });
});
