class Edge {
  constructor(origin, destination, properties = {}) {
    this.origin = origin;
    this.destination = destination;

    Object.keys(properties).forEach(key => {
      this[key] = properties[key];
    });
  }
}

module.exports = Edge;
