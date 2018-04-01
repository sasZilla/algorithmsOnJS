import { Node } from '../../data-structures/tree';
import {
  findMinDepth, findMinDepthQ,
  findMaxPath,
  canBeRepresentedByPreorderTraversal,
  checkWhetherBinaryTreeIsFull
} from '../tree-BST.js';

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

test('findMaxPath', () => {
  expect(findMaxPath(root)).toBe(14);
})

describe('canBeRepresentedByPreorderTraversal', () => {
  test('canBeRepresentedByPreorderTraversal', () => {
    let testArr = [2, 4, 3];
    let testTree = new Node(2);
    testTree.right = new Node(4);
    testTree.right.left = new Node(3);
    expect(canBeRepresentedByPreorderTraversal(testTree, testArr)).toBe(true);
  });

  test('canBeRepresentedByPreorderTraversal', () => {
    let testArr = [2, 4, 1];
    let testTree = new Node(2);
    testTree.right = new Node(4);
    testTree.left = new Node(1);
    expect(canBeRepresentedByPreorderTraversal(testTree, testArr)).toBe(false);
  });

  test('canBeRepresentedByPreorderTraversal', () => {
    let testArr = [40, 30, 35, 80, 100];
    let testTree = new Node(40);
    testTree.left = new Node(30);
    testTree.left.right = new Node(35);
    testTree.right = new Node(80);
    testTree.right.right = new Node(100);
    expect(canBeRepresentedByPreorderTraversal(testTree, testArr)).toBe(true);
  });

  test('canBeRepresentedByPreorderTraversal', () => {
    let testArr = [40, 30, 35, 20, 80, 100];
    let testTree = new Node(40);
    testTree.left = new Node(30);
    testTree.left.left = new Node(20);
    testTree.left.right = new Node(35);
    testTree.right = new Node(80);
    testTree.right.right = new Node(100);
    expect(canBeRepresentedByPreorderTraversal(testTree, testArr)).toBe(false);
  });
});

test('checkWhetherBinaryTreeIsFull', () => {
  let testTree = new Node(10);
  testTree.left = new Node(20);
  testTree.right = new Node(30);

  testTree.left.left = new Node(50);
  testTree.left.right = new Node(40);
  testTree.right.left = new Node(60);
  testTree.right.right = new Node(70);

  testTree.left.left.left = new Node(80);
  testTree.left.left.right = new Node(90);
  testTree.left.right.left = new Node(80);
  testTree.left.right.right = new Node(90);
  testTree.right.left.left = new Node(80);
  testTree.right.left.right = new Node(90);
  testTree.right.right.left = new Node(80);
  testTree.right.right.right = new Node(90);

  expect(checkWhetherBinaryTreeIsFull(testTree)).toBe(true);
});
