const BFS = require("../bfs");

const Naive = {
  find(startVertex, endVertex) {
    if (startVertex === endVertex) {
      return {
        path: [],
        weight: 0,
      };
    }

    // maps for predecessors & current weights;
    const P = {};
    const W = {
      [startVertex.getValue()]: 0,
    };

    // functions for easier access to maps
    const get = (vx) => ({
      predecessor: P[vx.getValue()],
      weight: Number.isInteger(W[vx.getValue()]) ? W[vx.getValue()] : Infinity,
    });

    const set = (vx, predecessor, weight) => {
      P[vx.getValue()] = predecessor;
      W[vx.getValue()] = weight;
    }

    let isRelaxing = true;
    while(isRelaxing) {
      isRelaxing = false;
      BFS.each((vertex, level, edge) => {
        if (edge) {
          const origin = get(edge.origin);
          const destination = get(edge.destination);

          if (destination.weight > origin.weight + edge.weight) {
            set(edge.destination, edge.origin, origin.weight + edge.weight);
            isRelaxing = true;
          }
        }
      }, startVertex, { loosely: true });
    }

    const path = [];
    let vertex = endVertex;

    while (vertex) {
      path.push(vertex.getValue());

      if (vertex === startVertex) {
        vertex = null;
      } else {
        vertex = get(vertex).predecessor;
      }
    }

    const { weight } = get(endVertex);

    return {
      path: path.reverse(),
      weight,
    };
  },
};

module.exports = Naive;
