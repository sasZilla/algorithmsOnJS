import { Node } from '../data-structures/tree';
import { findMinDepth, findMinDepthQ } from '../tree-BST.js';

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(4);
test('findMinDepth', () => {
  expect(findMinDepth(root)).toBe(2);
});

test('findMinDepthQ', () => {
  expect(findMinDepthQ(root)).toBe(2);
})
