const Heap = require("../../heap");
const { ShortestPathDictionary } = require("./utils");

const build = (G, vertex, options = {}) => {
  const dict = new ShortestPathDictionary(vertex, options);
  const Q = new Heap(G.getVertices(), (left, right) => {
    return dict.get(left).weight < dict.get(right).weight;
  });

  return { dict, Q };
}

const run = (Q, dict, options = {}) => {
  const vertex = Q.extractNext();
  const edges = options.isBackward ? vertex.getIncomingEdges() : vertex.getEdges();
  edges.forEach(edge => dict.relax(edge));
  Q.rebuild();
  return vertex;
}

const buildProcessedCheckF = () => {
  const flags = {};

  return (vertex) => {
    if (flags[vertex.getValue()]) {
      return true;
    }
    flags[vertex.getValue()] = true;
    return false;
  }
}

const BidirectionalDijkstra = {
  find(G, startVertex, endVertex) {
    if (startVertex === endVertex) {
      return {
        path: [],
        weight: 0,
      };
    }

    const { dict: fwDict, Q: fwQ } = build(G, startVertex);
    const { dict: bwDict, Q: bwQ } = build(G, endVertex, { isBackward: true });

    const isAlreadyProcessed = buildProcessedCheckF();

    let hasIntersection = false;
    while(!hasIntersection && fwQ.length > 0 && bwQ.length > 0) {
      const fwVertex = run(fwQ, fwDict);
      const bwVertex = run(bwQ, bwDict, { isBackward: true });

      hasIntersection = isAlreadyProcessed(fwVertex) || isAlreadyProcessed(bwVertex);
    }

    let vertex;
    let weight = Infinity;

    G.getVertices().forEach(v => {
      const w = fwDict.get(v).weight + bwDict.get(v).weight;

      if (w < weight) {
        vertex = v;
        weight = w;
      }
    });

    const fwPath = fwDict.path(vertex);
    const bwPath = bwDict.path(vertex, { isBackward: true });

    const path = fwPath.concat(bwPath.slice(1));

    return {
      weight,
      path,
    }
  },
};

module.exports = BidirectionalDijkstra;
