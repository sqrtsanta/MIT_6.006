const { ShortestPathDictionary } = require("./utils");

const BellmanFord = {
  find(G, startVertex, endVertex) {
    if (startVertex === endVertex) {
      return {
        path: [],
        weight: 0,
      };
    }

    const dict = new ShortestPathDictionary(startVertex);

    G.getVertices().forEach(() => {
      G.getEdges().forEach(edge => {
        dict.relax(edge);
      });
    });

    let isAcyclic = false;
    G.getEdges().forEach(edge => {
      if (!isAcyclic && dict.isRelaxable(edge)) {
        isAcyclic = true;
      }
    });

    if (isAcyclic) {
      return {
        path: [],
        weight: undefined,
      };
    }

    const path = dict.path(endVertex);
    const { weight } = dict.get(endVertex);

    return {
      path,
      weight,
    };
  },
};

module.exports = BellmanFord;
