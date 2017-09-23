const Edge = require("./edge");

class Vertex {
  constructor(value) {
    this.value = value;
    this.edges = [];
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getNeighbours() {
    return this.edges.map(edge => edge.endVertex);
  }

  connectWith(vertex, properties) {
    const edge = new Edge(this, vertex, properties);

    this.edges.push(edge);

    return edge;
  }

  getEdges() {
    return this.edges;
  }
}

module.exports = Vertex;
