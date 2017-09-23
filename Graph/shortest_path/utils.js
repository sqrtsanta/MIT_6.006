const orInfinity = (number) => Number.isInteger(number) ? number : Infinity;

class ShortestPathDictionary {
  constructor(startVertex) {
    this.P = {};
    this.W = {
      [startVertex.getValue()]: 0,
    };
    this.startVertex = startVertex;
  }

  get(vx) {
    return {
      predecessor: this.P[vx.getValue()],
      weight: orInfinity(this.W[vx.getValue()]),
    }
  }

  set(vx, predecessor, weight) {
    this.P[vx.getValue()] = predecessor;
    this.W[vx.getValue()] = weight;
  }

  path(endVertex) {
    const path = [];
    let vertex = endVertex;

    while (vertex) {
      path.push(vertex.getValue());

      if (vertex === this.startVertex) {
        vertex = null;
      } else {
        vertex = this.get(vertex).predecessor;
      }
    }

    return path.reverse();
  }

  relax(edge) {
    const origin = this.get(edge.origin);
    const destination = this.get(edge.destination);

    if (destination.weight > origin.weight + edge.weight) {
      this.set(edge.destination, edge.origin, origin.weight + edge.weight);
    }
  }
}

module.exports = {
  ShortestPathDictionary,
};
