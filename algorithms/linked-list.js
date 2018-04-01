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

  while (l1Head && l2Head) {
    let l1Char = l1Head.value;
    let l2Char = l2Head.value;

    if (l1Char > l2Char) {
      return 1;
    } else if (l1Char < l2Char) {
      return -1;
    }

    l1Head = l1Head.next;
    l2Head = l2head.next;
  }

  if (l1Head !== null) return 1;
  if (l2Head !== null) return -1;

  return 0;
}
