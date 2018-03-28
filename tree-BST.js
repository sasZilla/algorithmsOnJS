/*
  Given a binary tree, find its minimum depth.
  The minimum depth is the number of nodes along the shortest path
  from root node down to the nearest leaf node.
*/
/*
  The idea:
    - use recursion
    - if no left and no right return 1 (found leaf)
    - if no left => continue by right branch
    - if no right => continue left branch
    - if has both => return branch with min depth
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
