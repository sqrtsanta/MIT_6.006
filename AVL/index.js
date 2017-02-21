const asciitree = require('ascii-tree');

/*
* AVL - balanced BST
* Balance requirement:
*   Height of node's left child and height of node's right child
*   differ at most by one
*/

class Node {
  constructor(value) {
    this._value = value;
    this._height = 0;
  }

  append(node) {
    if (node.left() && node.right()) {
      throw Error('This node has full set of children');
    }

    node.setParent(this);

    if (node.value() <= this.value()) {
      this.setLeft(node);
    } else {
      this.setRight(node);
    }
  }

  parent() { return this._parent; }
  setParent(node) { this._parent = node; }

  value() { return this._value; }

  left() { return this._left; }
  setLeft(node) { this._left = node; }
  isLeft(node) { return this.left() && this.left().value() === node.value(); }

  right() { return this._right; }
  setRight(node) { this._right = node; }
  isRight(node) { return this.right() && this.right().value() === node.value(); }

  height() { return this._height; }
  calcHeight() {
    const lHeight = this.left() ? this.left().height() : -1;
    const rHeight = this.right() ? this.right().height() : -1;

    this._height = Math.max(lHeight, rHeight) + 1;
  }
  childrenHeightDiff() {
    const lHeight = this.left() ? this.left().height() : -1;
    const rHeight = this.right() ? this.right().height() : -1;

    return lHeight - rHeight;
  }
}

class Tree {
  constructor(value) {
    this._root = new Node(value);
  }

  // Insert new Node according to invariant:
  insert(value) {
    const node = this.find(value);

    node.append(new Node(value));

    this.recalcHeight(node);

    this.balance(node);
  }

  // Walk down the tree and find the Node, available for inserting
  find(value) {
    let node = this._root;

    while (node) {
      if (value <= node.value() && node.left()) {
        node = node.left();
      } else if (value > node.value() && node.right()) {
        node = node.right();
      } else {
        return node;
      }
    }
  }

  balance(node) {
    if (!node) {
      return;
    }

    const parent = node.parent();
    const left = node.left();
    const right = node.right();

    const diff = node.childrenHeightDiff();
    const leftChildDiff = left ? left.childrenHeightDiff() : 0;
    const rightChildDiff = right ? right.childrenHeightDiff() : 0;

    if (Math.abs(diff) <= 1) {
      this.balance(parent);
      return;
    }

    switch (true) { // eslint-disable-line default-case
      case diff > 0 && leftChildDiff > 0:
        this.rRotate(node);
        break;
      case diff > 0 && leftChildDiff < 0:
        this.lRotate(left);
        this.rRotate(node);
        break;
      case diff < 0 && rightChildDiff > 0:
        this.rRotate(right);
        this.lRotate(node);
        break;
      case diff < 0 && rightChildDiff < 0:
        this.lRotate(node);
        break;
    }

    if (parent) {
      this.recalcHeight(parent);
      this.balance(parent);
    }
  }

  lRotate(node) {
    const x = node;
    const P = x.parent();
    const y = x.right();
    const B = y.left();

    if (P) {
      P.isLeft(x) ? P.setLeft(y) : P.setRight(y);
      y.setParent(P);
    } else {
      this._root = y;
      y.setParent(null);
    }

    y.setLeft(x);
    x.setParent(y);

    if (B) {
      x.setRight(B);
      B.setParent(x);
    } else {
      x.setRight(null);
    }

    x.calcHeight();
    y.calcHeight();
  }

  rRotate(node) {
    const y = node;
    const P = y.parent();
    const x = y.left();
    const B = x.right();

    if (P) {
      P.isLeft(y) ? P.setLeft(x) : P.setRight(x);
      x.setParent(P);
    } else {
      this._root = x;
      x.setParent(null);
    }

    x.setRight(y);
    y.setParent(x);

    if (B) {
      y.setLeft(B);
      B.setParent(y);
    } else {
      y.setLeft(null);
    }

    y.calcHeight();
    x.calcHeight();
  }

  // Increment every node's height up to the root
  recalcHeight(node) { // eslint-disable-line class-methods-use-this
    let _node = node;
    while (_node) {
      _node.calcHeight();
      _node = _node.parent();
    }
  }

  height() {
    return this._root.height();
  }

  toString() {
    function print(node, level = 1, prefix = '') {
      let str = `${'#'.repeat(level)}${prefix}${node.value()}#${node.height()}`;

      if (node.right()) {
        str += `\r\n${print(node.right(), level + 1, 'r ')}`;
      }

      if (node.left()) {
        str += `\r\n${print(node.left(), level + 1, 'l ')}`;
      }

      return str;
    }

    return asciitree.generate(print(this._root));
  }
}

// Build tree from array
Tree.fromArray = (array) => {
  if (array.length < 1) {
    throw Error('Source array must have at least 1 element');
  }

  const tree = new Tree(array[0]);

  for (let i = 1; i < array.length; i += 1) {
    tree.insert(array[i]);
  }

  return tree;
};

module.exports = Tree;
