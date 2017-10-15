const { ShortestPathDictionary } = require("./utils");

const BidirectionalDijkstra = {
  find(G, startVertex, endVertex) {
    if (startVertex === endVertex) {
      return {
        path: [],
        weight: 0,
      };
    }

    const dict = new ShortestPathDictionary(startVertex);
  },
};

module.exports = BidirectionalDijkstra;
