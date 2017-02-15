/*
* BST - Binary Search Tree
* Invariant:
*   node.value() > node.left().value()
*   node.value() <= node.right().value()
*/

class Tree {
  constructor(value) {
    this._root = new Node(value);
  }

  // Insert new Node according to invariant:
  insert(value) {
    let node = this.find(value);

    node.append(new Node(value));

    // Increment every node's subtreeSize up to the root
    while (node) {
      node.inc();
      node = node.parent();
    }
  }

  // Walk down the tree and find the Node, available for inserting
  find(value) {
    let node = this._root;

    while (true) {
      if (value <= node.value() && node.left()) {
        node = node.left();
        continue;
      }

      if (value > node.value() && node.right()) {
        node = node.right();
        continue;
      }

      return node;
    }
  }

  // Find method alternative for augmenting with fn
  findWithFn(value, fn) {
    let node = this._root;

    while (true) {
      if (!fn(node.value())) {
        return null;
      }

      if (value <= node.value() && node.left()) {
        node = node.left();
        continue;
      }

      if (value > node.value() && node.right()) {
        node = node.right();
        continue;
      }

      return node;
    }
  }

  size() {
    return this._root.size();
  }

  // Count nodes with: node.value() <= value
  lteq(value) {
    let node = this._root;
    let rank = 0;

    while (node && node.value() <= value) {
      rank += 1;

      if (node.left()) {
        rank += node.left().size();
      }

      node = node.right();
    }

    return rank;
  }
}

// Build tree from array
Tree.fromArray = function(array) {
  if (array.length < 1) {
    throw Error('Source array must have at least 1 element');
  }

  const tree = new Tree(array[0]);

  for (let i = 1; i < array.length; i++) {
    tree.insert(array[i]);
  }

  return tree;
}

class Node {
  constructor(value) {
    this._value = value;
    this._subtreeSize = 1;
  }

  append(node) {
    if (node.left() && node.right()) {
      throw Error('This node has full set of children');
    }

    node._parent = this;

    if (node.value() <= this.value()) {
      this._left = node;
    } else {
      this._right = node;
    }
  }

  value()  { return this._value; }

  parent() { return this._parent; }
  left()   { return this._left; }
  right()  { return this._right; }

  size()   { return this._subtreeSize; }
  inc()    { this._subtreeSize += 1; }
  dec()    { this._subtreeSize -= 1; }
}

module.exports = Tree;
