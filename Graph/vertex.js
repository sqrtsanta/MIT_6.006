const Edge = require("./edge");

class Vertex {
  constructor(value) {
    this.value = value;
    this.edges = [];
    this.incomingEdges = [];
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

    this.addEdge(edge);
    vertex.addIncomingEdge(edge);

    return edge;
  }

  getEdges() {
    return this.edges;
  }

  addEdge(edge) {
    this.edges.push(edge);
  }

  getIncomingEdges() {
    return this.incomingEdges;
  }

  addIncomingEdge(edge) {
    this.incomingEdges.push(edge);
  }
}

module.exports = Vertex;
