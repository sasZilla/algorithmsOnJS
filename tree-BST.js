/*
  Given a binary tree, find its minimum depth.
  The minimum depth is the number of nodes along the shortest path
  from root node down to the nearest leaf node.
*/
/*
1. Recursion O(n^2)
  - if no left and no right return 1 (found leaf)
  - if no left => continue by right branch
  - if no right => continue left branch
  - if has both => return branch with min depth
2. Use Queue
  - create Queue to put each level nodes and depth
  - start from root( push {root, depth=1} to the Queue)
  - run loop while Q is not empty
    I) shift {bottom element, depth} (first will be root)
    II) if node has not left and right children: => return depth
    III) if node has left: => push to Q {node.left, depth+1}
    III) if node has rigth: => push to Q {node.rigth, depth+1}
*/
export function findMinDepth(node) {
  if (node === null) return 0;

  if (node.left === null && node.right === null) {
    return 1;
  }

  if (node.left === null) return findMinDepth(node.right) + 1;
  if (node.right === null) return findMinDepth(node.left) + 1;

  let left = findMinDepth(node.left);
  let right = findMinDepth(node.right);
  return Math.min(left, right) + 1;
}

export function findMinDepthQ(root) {
  if (root === null) return 0;

  let Q = [];
  Q.push({node: root, depth: 1});
  while (Q.length > 0) {
    let { node, depth } = Q.shift();

    if (node.left === null && node.right === null) {
      return depth;
    }

    if (node.left !== null) {
      Q.push({node: node.left, depth: depth + 1});
    }

    if (node.right !== null) {
      Q.push({node: node.right, depth: depth + 1});
    }
  }
}


/*
  Maximum Path Sum in a Binary Tree
  Given a binary tree, find the maximum path sum. The path may start and end at any node in the tree.

  Example:

  Input: Root of below tree
         1
        / \
       2   3
  Output: 6

  Input Root of below tree
         10
        / \
       2  10
      / \  \
     20 1 -25
          / \
         3  4
  Output: 20 -> 2 -> 10 -> 10 = 42
============================================================
Given:
  - Binary tree
  - Node has integer values (positive, negative, 0)
  - Find Path with Max Sum
  - path can start from any place(first node can be in any place)
  - check if has node in three? yes
Solution:
  1. Broadforce solution: Find all possible paths and then find min
  2. Recursion, keep res, Time Complexity: O(n)
    - if node === null: => return 0
    - l = findMaxPath(node.left)
    - r = findMaxPath(node.right)
    - keep maxSingle as max(max(l,r) + node.value, node.value)
    - keep nodeTop as max(l+r+node.value, maxSingle)
    - update res if need res = max(res, nodeTop)
    - return res
*/

export function findMaxPath(node, res=0) {
  if (node === null) return 0;

  let l = findMaxPath(node.left, res);
  let r = findMaxPath(node.right, res);

  let maxSingle = Math.max(Math.max(l,r) + node.data, node.data);
  let maxTop = Math.max(l+r+node.data, maxSingle);

  res = Math.max(maxTop, res);

  // or just return
  // Math.max(
  //  node.value,
  //  Max(l,r) + node,value
  //  l+r+node.value,
  //  res
  // )
  return res;
}

/*
  Check if a given array can represent Preorder Traversal of Binary Search Tree
  Given an array of numbers, return true if given array can represent preorder traversal of a Binary Search Tree, else return false. Expected time complexity is O(n).

  Examples:

  Input:  pre[] = {2, 4, 3}
  Output: true
  Given array can represent preorder traversal
  of below tree
      2

        4
       /
      3

  Input:  pre[] = {2, 4, 1}
  Output: false
  Given array cannot represent preorder traversal
  of a Binary Search Tree.

  Input:  pre[] = {40, 30, 35, 80, 100}
  Output: true
  Given array can represent preorder traversal
  of below tree
       40
     /
   30    80

    35     100


  Input:  pre[] = {40, 30, 35, 20, 80, 100}
  Output: false
  Given array cannot represent preorder traversal
  of a Binary Search Tree.
================================================================================
Sulution:
1. O(N)
  - Run preorder print algorithm
  - on each node increment index
*/

export function canBeRepresentedByPreorderTraversal(root, arr) {
  let treeArr = [];
  function buildPreorderArr(root) {
    if (root === null) return;

    treeArr.push(root.data);
    buildPreorderArr(root.left);
    buildPreorderArr(root.right);
  }

  // TODO: think if it can be improved
  function buildPreorderArrQ(root, arr) {
    if (root === null) return;

    let currIndex = 0;
    let Q = [];
    Q.push(root);
    while (Q.length > 0 && currIndex < arr.length) {
      let root = Q.pop();

      if (arr[currIndex] !== root.data) {
        return false;
      }

      if (root.left !== null) Q.push(root.left);
      if (root.right !== null) Q.push(root.right);

      currIndex++;
    }

    return true;
  }

  buildPreorderArr(root)
  for (let i=0;i<arr.length;i++) {
    if (arr[i] !== treeArr[i]) {
      return false;
    }
  }

  return true;
}

/*
  Check whether a binary tree is a full binary tree or not
  A full binary tree is defined as a binary tree
  in which all nodes have either zero or two child nodes.
  Conversely, there is no node in a full binary tree,
  which has one child node.
======================================================================
Given:
  - Binary Tree
  - Find if it's full or not(0 or 2 child nodes)
  - Return True/False
Solution: O(N)
  - Move throught the tree ( for example use Queue)
  - if node has 1 child node: return false;
*/

export function checkWhetherBinaryTreeIsFull(root) {
  if (root === null) return true;
  if (root.left === null && root.right === null) return true;

  let Q = [];
  Q.push(root);
  while (Q.length > 0) {
    root = Q.shift();
    if (
      (root.left !== null && root.right === null) ||
      (root.left === null && root.right !== null)
    ) {
      return false;
    }
    if (root.left) Q.push(root.left);
    if (root.right) Q.push(root.right);
  }
  return true;
}
