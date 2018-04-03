import { LinkedList, Node } from '../data-structures/linked-list';

/*
  Given a linked list which is sorted, how will you insert in sorted way
  Given a sorted linked list and a value to insert, write a function to insert the value in sorted way.
  Initial Linked List
    2->5->7->10->15
  SortedLinked List
    2->5->7->9->10->15
  Linked List after insertion of 9
  UpdatedSortedLinked List
==================================================
Given:
  - Sorted Linked list
  - values of integer
  - inset in order element
Solution:
  - strart from head
  - if head > target => target.next = head head = target
  - while head.next < target and head.next
    - head = head.next

  * head < target and head.next >= target, so we need to insert element between
  - if head.next === null => head.next = target
  - target = head.next
  - head.next = target
Time Complexity O(n)
Space Complexity O(1)
*/

function insetInSortedList(list, target) {
  if (list.head === null) return list.head = target;
  if (list.head.value > target.value) {
    target.next = list.head;
    list.head = target;
    return;
  }

  let current = list.head;
  while (current.next !== null && current.next.value < target.value) {
    current = current.next;
  }
  if (current.next === null) {
    current.next = target;
  } else {
    target.next = current.next;
    current.next = target;
  }
}

/*
  Compare two strings represented as linked lists
  Given two linked lists, represented as linked lists
  (every character is a node in linked list).
  Write a function compare() that works similar to strcmp(),
  i.e., it returns 0 if both strings are same,
  1 if first linked list is lexicographically greater,
  and -1 if second string is lexicographically greater.

  Examples:

  Input: list1 = g->e->e->k->s->a
         list2 = g->e->e->k->s->b
  Output: -1

  Input: list1 = g->e->e->k->s->a
         list2 = g->e->e->k->s
  Output: 1

  Input: list1 = g->e->e->k->s
         list2 = g->e->e->k->s
  Output: 0
=============================================
Given:
  - Two string as LinkedLists
  - every character is a node in LL
  - 0 if both strings are same,
  - 1 if first linked list is lexicographically greater,
  - -1 if second string is lexicographically greater.
Solution:
  - move throught linkedlists in sync
  - compare symbols with = > <
  - regarding to condition return 1 or -1
  - if all are at the end return 0
  - if any has not null node return that this list is greater(1 or -1)
*/

export function compare(l1, l2) {
  let l1Head = l1.head;
  let l2Head = l2.head;

  while (l1Head && l2Head && l1Head.value === l2Head.value) {
    l1Head = l1Head.next;
    l2Head = l2head.next;
  }

  let result = 0;
  switch (true) {
    case (l1Head !== null && l2Head !== null):
      result = l1Head.value > l2Head.value ? 1 : -1;
      break;
    case (l1Head !== null):
      result = 1;
      break;
    case (l2Head !== null):
      result = -1;
      break
    default:
      result = 0;
  }

  return result;
}


/*
  Add two numbers represented by linked lists
  Given two numbers represented by two linked lists,
  write a function that returns sum list.
  The sum list is linked list representation of addition of two input numbers.
  It is not allowed to modify the lists.
  Also, not allowed to use explicit extra space (Hint: Use Recursion).

  Example

  Input:
    First List: 5->6->3  // represents number 563
    Second List: 8->4->2 //  represents number 842
  Output
    Resultant list: 1->4->0->5  // represents number 1405
============================================
Given:
  - 2 LLists(2 numbers)
  - both >= 0
  - element can be 0..9
  - find sum of this LL
  - can't modify any LL
  - can't use explicit space
================================================
Solution:
  - idea is to create and use .prev for nodes
  see function implementation
*/

function sumTwoLinkedList(L1, L2) {
  function prepare(L) {
    let node = L.head;
    let prev = null;
    while (node !== null) {
      node.prev = prev;
      prev = node;
      node = node.next;
    }
    L.tail = node;
  }

  function F(node, t1, t2) {
    const t1V = t1 !== null ? t1.value : 0;
    const t2V = t2 !== null ? t2.value : 0;
    const V = node.value + t1V + t2V;

    node.value = V % 10;

    return V - node.value;
  }

  prep(L1);
  prep(L2);

  let R = new LinkedList(0);
  prep(R);
  let node = R.tail;

  let t1 = L1.tail;
  let t2 = L2.tail;
  while (t1 || t2) {
    let V = F(node, t1, t2);
    if (t1) t1 = t1.prev;
    if (t2) t2 = t2.prev;

    if ( !(t1 === null && t2 === null && V === 0) ) {
      node.prev = new Node(V);
      node.prev.next = node;
      node = node.prev;
    }
  }
  R.head = node;
  return R;
}
