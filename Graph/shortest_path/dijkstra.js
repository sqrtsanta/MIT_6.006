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

    const Q = G.getVertices().slice();
    while(Q.length > 0) {
      // Since Q is Array, we get O(n2) complexity
      // can be improved by min-heap or fibonacci-heap
      const minVertex = Q.sort((leftVertex, rightVertex) => {
        const left = dict.get(leftVertex).weight;
        const right = dict.get(rightVertex).weight;

        if(!isFinite(left - right)) {
          return isFinite(left) ? -1 : 1;
        }

        return left - right;
      }).shift();

      minVertex.getEdges().forEach(edge => {
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
