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

class BreadthFirst {
  static each(f, initialVertex) {
    let levelIndex = 1;

    const levelDict = {
      [initialVertex.getValue()]: levelIndex,
    };

    f(initialVertex, levelIndex - 1);

    let frontier = [initialVertex];
    let nextFrontier = [];

    while (frontier.length !== 0) {
      levelIndex += 1;

      frontier.forEach(vertex => {
        vertex.getNeighbours().forEach((childVertex) => {
          if (!levelDict[childVertex.getValue()]) {
            levelDict[childVertex.getValue()] = levelIndex;

            f(childVertex, levelIndex - 1, vertex);

            nextFrontier.push(childVertex);
          }
        });
      });

      frontier = nextFrontier;
      nextFrontier = [];
    }
  }
}

class DepthFirst {
  static each(f, initialVertex) {
    const levelIndex = 1;

    const levelDict = {
      [initialVertex.getValue()]: levelIndex,
    };

    f(initialVertex, levelIndex - 1);

    const innerEach = (innerF, innerVertex, innerLevelIndex) => {
      innerVertex.getNeighbours().forEach((childVertex) => {
        if (!levelDict[childVertex.getValue()]) {
          levelDict[childVertex.getValue()] = innerLevelIndex;

          innerF(childVertex, innerLevelIndex - 1, innerVertex);

          innerEach(f, childVertex, innerLevelIndex + 1);
        }
      });
    }

    innerEach(f, initialVertex, levelIndex + 1);
  }
}

module.exports = {
  Vertex,
  BreadthFirst,
  DepthFirst,
};
