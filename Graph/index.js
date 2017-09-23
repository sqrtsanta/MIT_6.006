const Vertex = require("./vertex");
const BFS = require("./bfs");
const DFS = require("./dfs");

const Naive = require("./shortest_path/naive");

module.exports = {
  Vertex,
  BFS,
  DFS,
  shortestPath: {
    Naive,
  },
};
