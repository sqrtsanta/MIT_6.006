const BFS = require("../bfs");
const { ShortestPathDictionary } = require("./utils");

const Naive = {
  find(startVertex, endVertex) {
    if (startVertex === endVertex) {
      return {
        path: [],
        weight: 0,
      };
    }

    const dict = new ShortestPathDictionary(startVertex);

    let isRelaxing = true;
    while(isRelaxing) {
      isRelaxing = false;
      BFS.each((vertex, level, edge) => {
        if (edge) {
          const origin = dict.get(edge.origin);
          const destination = dict.get(edge.destination);

          if (destination.weight > origin.weight + edge.weight) {
            dict.set(edge.destination, edge.origin, origin.weight + edge.weight);
            isRelaxing = true;
          }
        }
      }, startVertex, { loosely: true });
    }

    const path = dict.path(endVertex);
    const { weight } = dict.get(endVertex);

    return {
      path,
      weight,
    };
  },
};

module.exports = Naive;
