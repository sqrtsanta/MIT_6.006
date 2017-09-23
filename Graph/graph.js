class Graph {
  constructor(V, E) {
    this._vertices = V;
    this._edges = E;
  }

  getEdges() {
    return this._edges;
  }

  getVertices() {
    return this._vertices;
  }
}

module.exports = Graph;
