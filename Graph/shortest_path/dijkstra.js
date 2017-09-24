const Heap = require("../../heap");
const { ShortestPathDictionary } = require("./utils");

const Dijkstra = {
  find(G, startVertex, endVertex) {
    if (startVertex === endVertex) {
      return {
        path: [],
        weight: 0,
      };
    }

    const dict = new ShortestPathDictionary(startVertex);

    const Q = new Heap(G.getVertices(), (left, right) => {
      return dict.get(left).weight < dict.get(right).weight;
    });

    // @TODO This can probably violate heap
    while(Q.length > 0) {
      Q.extractNext().getEdges().forEach(edge => {
        dict.relax(edge);
      });
    }

    const path = dict.path(endVertex);
    const { weight } = dict.get(endVertex);

    return {
      path,
      weight,
    }
  },
}

module.exports = Dijkstra;
