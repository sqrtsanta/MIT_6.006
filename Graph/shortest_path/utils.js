const orInfinity = (number) => Number.isInteger(number) ? number : Infinity;

class ShortestPathDictionary {
  constructor(startVertex, config = {}) {
    this.P = {};
    this.W = {
      [startVertex.getValue()]: 0,
    };
    this.startVertex = startVertex;
    this.config = config;
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

  path(endVertex, options = {}) {
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

    return options.isBackward ? path : path.reverse();
  }

  getOrigin(edge) {
    return this.config.isBackward ? edge.destination : edge.origin;
  }

  getDestination(edge) {
    return this.config.isBackward ? edge.origin : edge.destination;
  }

  isRelaxable(edge) {
    const origin = this.getOrigin(edge);
    const destination = this.getDestination(edge);

    return this.get(destination).weight > this.get(origin).weight + edge.weight;
  }

  relax(edge) {
    if (this.isRelaxable(edge)) {
      const origin = this.getOrigin(edge);
      const destination = this.getDestination(edge);

      this.set(
        destination,
        origin,
        this.get(origin).weight + edge.weight
      );
    }
  }
}

module.exports = {
  ShortestPathDictionary,
};
