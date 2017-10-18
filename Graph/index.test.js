const assert = require('assert');
const { Graph, Vertex, BFS, DFS, shortestPath } = require("./index");

describe("Graph", () => {
  describe("when with positive weights", () => {
    const a = new Vertex("a");
    const b = new Vertex("b");
    const c = new Vertex("c");
    const d = new Vertex("d");
    const e = new Vertex("e");
    const f = new Vertex("f");
    const g = new Vertex("g");
    const h = new Vertex("h");

    const ab = a.connectWith(b, { weight: 2 });
    const ac = a.connectWith(c, { weight: 4 });
    const ae = a.connectWith(e, { weight: 1 });

    const ba = b.connectWith(a, { weight: 2 });
    const be = b.connectWith(e, { weight: 8 });
    const bc = b.connectWith(c, { weight: 3 });
    const bd = b.connectWith(d, { weight: 5 });
    const bf = b.connectWith(f, { weight: 3 });

    const ea = e.connectWith(a, { weight: 1 });
    const eb = e.connectWith(b, { weight: 8 });
    const eg = e.connectWith(g, { weight: 2 });

    const ca = c.connectWith(a, { weight: 4 });
    const cb = c.connectWith(b, { weight: 3 });
    const cf = c.connectWith(f, { weight: 7 });

    const db = d.connectWith(b, { weight: 5 });
    const dg = d.connectWith(g, { weight: 3 });
    const dh = d.connectWith(h, { weight: 6 });
    const df = d.connectWith(f, { weight: 2 });

    const ge = g.connectWith(e, { weight: 2 });
    const gd = g.connectWith(d, { weight: 3 });
    const gh = g.connectWith(h, { weight: 11 });

    const fb = f.connectWith(b, { weight: 3 });
    const fc = f.connectWith(c, { weight: 7 });
    const fd = f.connectWith(d, { weight: 2 });
    const fh = f.connectWith(h, { weight: 8 });

    const hf = h.connectWith(f, { weight: 8 });
    const hd = h.connectWith(d, { weight: 6 });
    const hg = h.connectWith(g, { weight: 11 });

    const G = new Graph(
      [a, b, c, d, e, f, g, h],
      [
        ab, ac, ae,
        ba, be, bc, bd, bf,
        ea, eb, eg,
        ca, cb, cf,
        db, dg, dh, df,
        ge, gd, gh,
        fb, fc, fd, fh,
        hf, hd, hg,
      ]
    );

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

        it("finds shortest path between vertices e & f", () => {
          const { path, weight } = shortestPath.Naive.find(e, f);

          assert.deepEqual(path, ["e", "a", "b", "f"]);
          assert.deepEqual(weight, 6);
        });
      });

      describe("Dijkstra#find", () => {
        it("finds shortest path between vertices a & h", () => {
          const { path, weight } = shortestPath.Dijkstra.find(G, a, h);

          assert.deepEqual(path, ["a", "e", "g", "d", "h"]);
          assert.deepEqual(weight, 12);
        });

        it("finds shortest path between vertices a & a", () => {
          const { path, weight } = shortestPath.Dijkstra.find(G, a, a);

          assert.deepEqual(path, []);
          assert.deepEqual(weight, 0);
        });

        it("finds shortest path between vertices e & f", () => {
          const { path, weight } = shortestPath.Dijkstra.find(G, e, f);

          assert.deepEqual(path, ["e", "a", "b", "f"]);
          assert.deepEqual(weight, 6);
        });
      });

      describe("BellmanFord#find", () => {
        it("finds shortest path between vertices a & h", () => {
          const { path, weight } = shortestPath.BellmanFord.find(G, a, h);

          assert.deepEqual(path, ["a", "e", "g", "d", "h"]);
          assert.deepEqual(weight, 12);
        });

        it("finds shortest path between vertices a & a", () => {
          const { path, weight } = shortestPath.BellmanFord.find(G, a, a);

          assert.deepEqual(path, []);
          assert.deepEqual(weight, 0);
        });

        it("finds shortest path between vertices e & f", () => {
          const { path, weight } = shortestPath.BellmanFord.find(G, e, f);

          assert.deepEqual(path, ["e", "a", "b", "f"]);
          assert.deepEqual(weight, 6);
        });
      });

      describe("BidirectionalDijkstra#find", () => {
        it("finds shortest path between vertices a & h", () => {
          const { path, weight } = shortestPath.BidirectionalDijkstra.find(G, a, h);

          assert.deepEqual(path, ["a", "e", "g", "d", "h"]);
          assert.deepEqual(weight, 12);
        });

        it("finds shortest path between vertices a & a", () => {
          const { path, weight } = shortestPath.BidirectionalDijkstra.find(G, a, a);

          assert.deepEqual(path, []);
          assert.deepEqual(weight, 0);
        });

        it("finds shortest path between vertices e & f", () => {
          const { path, weight } = shortestPath.BidirectionalDijkstra.find(G, e, f);

          assert.deepEqual(path, ["e", "a", "b", "f"]);
          assert.deepEqual(weight, 6);
        });
      });
    });
  });

  describe("when with negative weights", () => {
    const r = new Vertex("r");
    const s = new Vertex("s");
    const v = new Vertex("v");
    const u = new Vertex("u");
    const w = new Vertex("w");
    const x = new Vertex("x");

    const rs = r.connectWith(s, { weight: 5 });
    const rv = r.connectWith(v, { weight: 3 });

    const sv = s.connectWith(v, { weight: 2 });
    const su = s.connectWith(u, { weight: 6 });

    const vu = v.connectWith(u, { weight: 7 });
    const vw = v.connectWith(w, { weight: 4 });
    const vx = v.connectWith(x, { weight: 2 });

    const uw = u.connectWith(w, { weight: -1 });
    const ux = u.connectWith(x, { weight: -2 });

    const wx = w.connectWith(x, { weight: -2 });

    const G = new Graph(
      [r, s, v, u],
      [
        rs, rv,
        sv, su,
        vu, vw, vx,
        uw, ux,
        wx,
      ]
    );

    describe("BellmanFord#find", () => {
      it("finds shortest path between vertices r & x", () => {
        const { path, weight } = shortestPath.BellmanFord.find(G, r, x);

        assert.deepEqual(path, ["r", "v", "x"]);
        assert.deepEqual(weight, 5);
      });

      it("finds shortest path between vertices r & r", () => {
        const { path, weight } = shortestPath.BellmanFord.find(G, r, r);

        assert.deepEqual(path, []);
        assert.deepEqual(weight, 0);
      });
    });
  });

  describe("when with negative weights & cycles", () => {
    const r = new Vertex("r");
    const s = new Vertex("s");
    const v = new Vertex("v");
    const u = new Vertex("u");
    const w = new Vertex("w");
    const x = new Vertex("x");

    const rs = r.connectWith(s, { weight: 5 });
    const rv = r.connectWith(v, { weight: 3 });

    const sv = s.connectWith(v, { weight: 2 });

    const vu = v.connectWith(u, { weight: 7 });
    const vw = v.connectWith(w, { weight: 4 });
    const vx = v.connectWith(x, { weight: 2 });

    const uw = u.connectWith(w, { weight: -1 });
    const ux = u.connectWith(x, { weight: -2 });
    const us = u.connectWith(s, { weight: -10 });

    const wx = w.connectWith(x, { weight: -2 });

    const G = new Graph(
      [r, s, v, u],
      [
        rs, rv,
        sv,
        vu, vw, vx,
        uw, ux, us,
        wx,
      ]
    );

    describe("BellmanFord#find", () => {
      it("finds shortest path between vertices r & x", () => {
        const { path, weight } = shortestPath.BellmanFord.find(G, r, x);

        assert.deepEqual(path, []);
        assert.deepEqual(weight, undefined);
      });

      it("finds shortest path between vertices r & r", () => {
        const { path, weight } = shortestPath.BellmanFord.find(G, r, r);

        assert.deepEqual(path, []);
        assert.deepEqual(weight, 0);
      });
    });
  });
});
