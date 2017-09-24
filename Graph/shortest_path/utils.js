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

  isRelaxable(edge) {
    const origin = this.get(edge.origin);
    const destination = this.get(edge.destination);

    return destination.weight > origin.weight + edge.weight;
  }

  relax(edge) {
    if (this.isRelaxable(edge)) {
      this.set(
        edge.destination,
        edge.origin,
        this.get(edge.origin).weight + edge.weight
      );
    }
  }
}

module.exports = {
  ShortestPathDictionary,
};
