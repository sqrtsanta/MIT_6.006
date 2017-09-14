class Vertex {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  setNeighbours(vertices) {
    this.neighbours = vertices;
  }

  getNeighbours() {
    return this.neighbours;
  }
}

class DepthFirst {
  static each(f, vertex) {
    let levelIndex = 0;

    const levelDict = {
      [vertex.getValue()]: levelIndex,
    };

    f(vertex, levelIndex);

    let frontier = vertex.getNeighbours();
    let nextFrontier = [];

    while (frontier.length !== 0) {
      levelIndex += 1;

      frontier.forEach(nextVertex => {
        if (levelDict[nextVertex.getValue()] == null) {
          levelDict[nextVertex.getValue()] = levelIndex;

          f(nextVertex, levelIndex);

          nextVertex.getNeighbours().forEach((neighbourVertex) => {
            nextFrontier.push(neighbourVertex);
          });
        }
      });

      frontier = nextFrontier;
      nextFrontier = [];
    }
  }
}

module.exports = {
  Vertex,
  DepthFirst,
};
