export class Node {
  constructor(data, left=null, right=null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

/*
  Binary Search Tree means that
  for Node
    - each node.left descdendents are less than Node
    - each node.right descendents are greater than Node

*/
export class BST {
  constructor() {
    this.root = null;
  }

  /*

  */
  add(data) {
    function _insert(node) {
      if (data < node.data) {
        if (node.left === null) {
          node.left = new Node(data);
          return;
        } else if (node.left !== null) {
          return _insert(node.left);
        }
      } else if (data > node.data) {
        if (node.right === null) {
          node.right = new Node(data);
          return;
        } else if (node.right !== null) {
          return _insert(node.right);
        }
      } else {
        return null;
      }
    }
    if (this.root === null) {
      this.root = new Node(data);
      return;
    } else {
      return _insert(this.root, data);
    }
  }

  remove(data) {
    /*

    */
    function _remove(node, data) {
      if (node === null) {
        return null;
      }

      if (node.data === data) {
        if (node.left === null && node.right === null) {
          return null;
        }

        if (node.left === null) {
          return node.right;
        }

        if (node.right === null) {
          return node.left;
        }

        // node has two children
        // take node.right brach
        // find last left node
        // replace node with found
        // call _remove for replacedNode.right (node.right)
        let tmpNode = node.right;
        while (tmpNode.left !== null) {
          tmpNode = tmpNode.left;
        }
        node.data = tmpNode.data;
        // remove found node
        node.right = _remove(node.right, tmpNode.data);
        return node;
      } else if (data < node.data) {
        node.left = _remove(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = _remove(node.right, data);
        return node;
      }
    }

    if (this.root === null || !this.isPresent(data)) {
      return null;
    } else {
      this.root = _remove(this.root, data);
    }
  }

  /*
    Binary Search Tree very left bottom element is the Min
  */
  findMin() {
    if (this.root === null) return null;
    let node = this.root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  /*
    Binary Search Tree very right element is the Max
  */
  findMax() {
    if (this.root === null) return null;
    let node = this.root;
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }

  find(data) {
    return this._findNode(data);
  }

  isPresent(data) {
    return !!this._findNode(data);
  }

  _findNode(data) {
    let node = this.root;
    while (node !== null) {
      if (data < node.data) {
        node = node.left;
      } else if (data > node.data) {
        node = node.right;
      } else { // if data === node.data
        return node;
      }
    }
    return null;
  }

  // difference between maxHeight - minHeight <= 1
  isBalanced() {
    return this.findMaxHeight() - this.findMinHeight() <= 1;
  }

  findMinHeight(node = this.root) {
    if (node === null) {
      return -1;
    }

    const left = this.findMinHeight(node.left);
    const right = this.findMinHeight(node.right);
    if (left < right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  findMaxHeight(node = this.root) {
      if (node === null) {
        return -1;
      }

      const left = this.findMaxHeight(node.left);
      const right = this.findMaxHeight(node.right);
      if (left > right) {
        return left + 1;
      } else {
        return right + 1;
      }
  }

  print(node) {
    console.log(node.data);
  }

  inOrder(node = this.root) {
    // console.log(node)
    if (node) {
      if (node.left) this.inOrder.call(this, node.left);
      this.print(node);
      if (node.right) this.inOrder.call(this,node.right);
    }
  }

  preOrder(node = this.root) {
    if (node) {
      this.print(node);
      if (node.left) this.preOrder.call(this, node.left);
      if (node.right) this.preOrder.call(this, node.right);
    }
  }

  postOrder(node = this.root) {
    if (node) {
      if (node.left) this.postOrder.call(this, node.left);
      if (node.right) this.postOrder.call(this, node.right);
      this.print(node);
    }
  }

  levelOrder() {
    if (this.root === null) return null;
    let Q = [];
    Q.push(this.root);
    while (Q.length > 0) {
      let node = Q.shift();
      this.print(node);
      if (node.left !== null) {
        Q.push(node.left);
      }
      if (node.right !== null) {
        Q.push(node.right);
      }
    }
  }
}

let bst = new BST();
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(2);
bst.add(1);
console.log(
  'Min: ', bst.findMin(),
  'Max: ', bst.findMax(),
  'Find: ', bst.find(5),
  'isPresent: ', bst.isPresent(5)
)

bst.remove(5);
console.log(
  'Min: ', bst.findMin(),
  'Max: ', bst.findMax(),
  'Find: ', bst.find(5),
  'isPresent: ', bst.isPresent(5)
)


const bst2 = new BST();

bst2.add(9);
bst2.add(4);
bst2.add(17);
bst2.add(3);
bst2.add(6);
bst2.add(22);
bst2.add(5);
bst2.add(7);
bst2.add(20);
console.log(bst2.findMinHeight());
console.log(bst2.findMaxHeight());
console.log("isBalanced", bst2.isBalanced());
bst2.add(10);
console.log(bst2.findMinHeight());
console.log(bst2.findMaxHeight());
console.log(bst2.isBalanced());
console.log("inOrder"); bst2.inOrder();
console.log("preOrder"); bst2.preOrder();
console.log("postOrder"); bst2.postOrder();
console.log("levelOrder"); bst2.levelOrder();
