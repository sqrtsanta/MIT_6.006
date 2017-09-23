const BFS = {
  each(f, initialVertex, options = {}) {
    let levelIndex = 0;

    const visited = {
      [initialVertex.getValue()]: true,
    };

    f(initialVertex, levelIndex);

    let frontier = [initialVertex];
    let nextFrontier = [];

    while (frontier.length !== 0) {
      levelIndex += 1;

      frontier.forEach(vertex => {
        vertex.getEdges().forEach(edge => {
          const isVisited = visited[edge.destination.getValue()];

          if (options.loosely && isVisited) {
            f(edge.destination, levelIndex, edge);
          }

          if (!isVisited) {
            visited[edge.destination.getValue()] = true;

            f(edge.destination, levelIndex, edge);

            nextFrontier.push(edge.destination);
          }
        })
      });

      frontier = nextFrontier;
      nextFrontier = [];
    }
  },
};

module.exports = BFS;
