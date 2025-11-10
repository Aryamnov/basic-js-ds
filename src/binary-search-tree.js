const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addWithin(this.rootNode, data);

    function addWithin(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (value === node.data) {
        return node;
      }

      if (value < node.data) {
        node.left = addWithin(node.left, value);
      } else {
        node.right = addWithin(node.right, value);
      }

      return node;
    }
  }

  find(data) {
    return searchWithin(this.rootNode, data);

    function searchWithin(node, value) {
      if (!node) return null;
      if (value === node.data) return node;
      return value < node.data
          ? searchWithin(node.left, value)
          : searchWithin(node.right, value);
    }
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, value) {
      if (!node) return null;

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        // node with value found
        // no children
        if (!node.left && !node.right) {
          return null;
        }

        // one child
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }

        // two children: replace with min from right subtree
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }

        node.data = minFromRight.data;
        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) return null;

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootNode) return null;

    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};