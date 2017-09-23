const DFS = {
  each(f, initialVertex) {
    const levelIndex = 0;

    const visited = {
      [initialVertex.getValue()]: true,
    };

    f(initialVertex, levelIndex);

    const innerEach = (innerVertex, innerLevelIndex) => {
      innerVertex.getEdges().forEach(edge => {
        if (!visited[edge.destination.getValue()]) {
          visited[edge.destination.getValue()] = true;

          f(edge.destination, innerLevelIndex, edge);

          innerEach(edge.destination, innerLevelIndex + 1);
        }
      });
    };

    innerEach(initialVertex, levelIndex + 1);
  },
};

module.exports = DFS;
