function Node(element) {
  this.element = element;
  this.next = null;
}

function LList(element) {
  this.head = element ? new Node(element) : null;
  this.push = push;
  this.find = find;
  this.insert = insert;
  this.remove = remove;
  this.display = display;

  this.insertSorted = insertSorted;
  this.simpleReverse = simpleReverse;
  this.reverse = reverse;
}

function find(item) {
  var currNode = this.head;
  while (currNode && currNode.element !== item) {
    currNode = currNode.next;
  }
  return currNode;
}

function push(item) {
  var pushedNode = new Node(item);
  pushedNode.next = this.head;
  this.head = pushedNode;
}

function insert(newElement, item) {
  var newNode = new Node(newElement);
  var currNode = this.find(item);
  newNode.next = currNode.next;
  currNode.next = newNode;
}

function remove(item) {
  var currNode = this.find(item);
  var nextNode = currNode.next;
  if (nextNode) {
    currNode.element = nextNode.element;
    currNode.next = nextNode.next;
  } else {
    currNode = null;
  }
}

function display(head) {
  var currNode = head || this.head;
  while (currNode) {
    console.log(currNode.element, '->');
    currNode = currNode.next;
  }
}

/*
  Test cases
*/

var cities = new LList('head');
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();


/*
* Given a linked list which is sorted, how will you insert in sorted way
*/

function insertSorted(item) {
  var currNode = this.head;

  // insert instead of head
  if (!currNode || currNode.element >= item) {
    this.head = new Node(item);
    this.head.next = currNode;
    return;
  }

  while (currNode) {
    var nextNode = currNode.next;
    if (currNode.element <= item && (nextNode && item <= nextNode.element || !nextNode)) {
      currNode.next = new Node(item);
      currNode.next.next = nextNode;
      return;
    }
    currNode = currNode.next;
  }
}

var numbers = new LList(1);
numbers.insert(3, 1);
numbers.insert(5, 3);
numbers.insert(6, 5);
numbers.insert(10, 6);
numbers.insert(11, 10);
numbers.display();
console.log('Insert 9 at the middle of list');
numbers.insertSorted(9);
numbers.display();
console.log('Insert 0 at the start of list');
numbers.insertSorted(0);
numbers.display();
console.log('Insert 12 at the end of list');
numbers.insertSorted(12);
numbers.display();

/*
  Compare two strings represented as linked lists
  Given two linked lists, represented as linked lists
  (every character is a node in linked list).
  Write a function compare() that works similar to strcmp(), i.e.,
  it returns 0 if both strings are same, 1 if first linked list is lexicographically greater,
  and -1 if second string is lexicographically greater.

  Input: list1 = g->e->e->k->s->a
       list2 = g->e->e->k->s->b
  Output: -1

  Input: list1 = g->e->e->k->s->a
         list2 = g->e->e->k->s
  Output: 1

  Input: list1 = g->e->e->k->s
         list2 = g->e->e->k->s
  Output: 0
*/

function compare(l1,l2) {
  var l1Node = l1.head,
    l2Node = l2.head;
  while (l1Node || l2Node) {
    if (l1Node.element > l2Node.element || l1Node.next && !l2Node.next) {
      return 1;
    }
    if (l1Node.element < l2Node.element || !l1Node.next && l2Node.next) {
      return -1;
    }
    l1Node = l1Node.next;
    l2Node = l2Node.next;
  }
  return 0;
}
console.log('#######################################################');
console.log('###', 'Compare two strings represented as linked lists', '###');
console.log('#######################################################');
var l1 = new LList('g');
l1.insert('e', 'g');
l1.insert('e', 'e');
l1.insert('k', 'e');
l1.insert('s', 'k');
l1.insert('a', 's');
var l2 = new LList('g');
l2.insert('e', 'g');
l2.insert('e', 'e');
l2.insert('k', 'e');
l2.insert('s', 'k');
l2.insert('b', 's');
console.log('Should be -1', compare(l1, l2))

var l1 = new LList('g');
l1.insert('e', 'g');
l1.insert('e', 'e');
l1.insert('k', 'e');
l1.insert('s', 'k');
l1.insert('a', 's');
var l2 = new LList('g');
l2.insert('e', 'g');
l2.insert('e', 'e');
l2.insert('k', 'e');
l2.insert('s', 'k');
console.log('Should be 1', compare(l1, l2))

var l1 = new LList('g');
l1.insert('e', 'g');
l1.insert('e', 'e');
l1.insert('k', 'e');
l1.insert('s', 'k');
var l2 = new LList('g');
l2.insert('e', 'g');
l2.insert('e', 'e');
l2.insert('k', 'e');
l2.insert('s', 'k');
console.log('Should be 0', compare(l1, l2))

/*
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
*/

function summLists(l1,l2) {
  var currNode = null,
    prevNode = null,
    sumListHead = null;
  while (l1 && l2) {
    var sum = l1.element + l2.element;
    if (sum >= 10) {
      var lost = Math.floor( sum / 10 ); // 14 -> 1
      sum = sum % 10; // 14 -> 4
    }
    currNode = new Node(sum);
    console.log(lost, sum)
    if (lost > 0) {
      if (!prevNode) {
        prevNode = new Node(lost);
        prevNode.next = currNode;
        if (!sumListHead) { sumListHead = prevNode; }
      } else {
        prevNode.element = lost + prevNode.element;
      }
    } else {
      if (!sumListHead) { sumListHead = currNode; }
    }
    prevNode = currNode;
    l1 = l1.next;
    l2 = l2.next;
  }
  return sumListHead;
}

console.log('####################################################################################################');
console.log('###', 'Given two numbers represented by two linked lists, write a function that returns sum list.', '###');
console.log('####################################################################################################');

var l1 = new LList(5);
l1.insert(6, 5);
l1.insert(3, 6);
var l2 = new LList(8);
l2.insert(4, 8);
l2.insert(2, 4);
console.log('Should be 1->4->0>5', summLists(l1.head, l2.head))


/*
  Reverse a Linked List in groups of given size
Given a linked list, write a function to reverse every k nodes (where k is an input to the function).

Example:
Inputs:  1->2->3->4->5->6->7->8->NULL and k = 3
Output:  3->2->1->6->5->4->8->7->NULL.

Inputs:   1->2->3->4->5->6->7->8->NULL and k = 5
Output:  5->4->3->2->1->8->7->6->NULL.
*/

function simpleReverse() {
  var prev = null,
    current = this.head,
    next = null;
  while (current !== null) {
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  this.head = prev;
}

function reverse(head, size) {
  var count = 0,
    curr = head,
    prev = null,
    next = null;

  while (curr && count < size) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count++;
  }

  /* next is now a pointer to (k+1)th node
    Recursively call for the list starting from current.
    And make rest of the list as next of first node */
  if (next != null) {
    head.next = reverse(next, size);
  }

  return prev;
}

console.log('########################################################');
console.log('###', 'Reverse a Linked List in groups of given size', '###');
console.log('#########################################################');

var l = new LList(8);
l.push(7);l.push(6);l.push(5);l.push(4);l.push(3);l.push(2);l.push(1);
l.display()
console.log('Result:')
// var reversedL = l.simpleReverse();
var reversedL = l.reverse(l.head, 3);
// l.simpleReverse()
// l.display();
// console.log( l )
while (reversedL) {
  console.log( reversedL.element, ' ' );
  reversedL = reversedL.next;
}


/*
  You have two singly linked lists that are already sorted,
  you have to merge them and return a the head of the new list
  without creating any new extra nodes.
  The returned list should be sorted as well
*/

function mergeSort(l1,l2) {
  if (l1 === null) { return l2; }
  if (l2 === null) { return l1; }

  if (l1.element < l2.element) {
    l1.next = mergeSort(l1.next,l2);
    return l1;
  } else {
    l2.next = mergeSort(l1, l2.next);
    return l2;
  }
}

console.log('###############################');
console.log('###', 'Merge two sorted list', '###');
console.log('################################');


var l1 = new LList(10);
l1.push(6);l1.push(4);

var l2 = new LList(11);
l2.push(7);l2.push(5);l2.push(3);

display( mergeSort(l1.head,l2.head) );


/*
  Merge a linked list into another linked list at alternate positions
Given two linked lists, insert nodes of second list into first list
at alternate positions of first list.
For example, if first list is 5->7->17->13->11 and second is 12->10->2->4->6,
the first list should become 5->12->7->10->17->2->13->4->11->6
and second list should become empty. The nodes of second list should only be inserted
when there are positions available. For example, if the first list is 1->2->3
and second list is 4->5->6->7->8, then first list should become 1->4->2->5->3->6
and second list to 7->8.

Use of extra space is not allowed (Not allowed to create additional nodes), i.e.,
insertion must be done in-place. Expected time complexity is O(n)
where n is number of nodes in first list.

The idea is to run a loop while there are available positions in first loop
and insert nodes of second list by changing pointers.
*/

console.log('##############################################################################');
console.log('###', 'Merge a linked list into another linked list at alternate positions', '###');
console.log('##############################################################################');


function alternateMerge(l1,l2) {
  var l1CurrNode = l1.head,
    l2CurrNode = l2.head;

  while (l1CurrNode && l2CurrNode) {
    var l1NextNode = l1CurrNode.next,
      l2NextNode = l2CurrNode.next;

    l1CurrNode.next = l2CurrNode;
    l2CurrNode.next = l1NextNode;

    l1CurrNode = l1NextNode;
    l2CurrNode = l2NextNode;
  }
  l2.head = l2NextNode;
}

var l1 = new LList(10);
l1.push(6);l1.push(4);

var l2 = new LList(11);
l2.push(7);l2.push(8);l2.push(5);l2.push(3);

alternateMerge(l1,l2);

l1.display();
console.log();
l2.display();


/*
  Detect and Remove Loop in a Linked List
*/

console.log('################################################');
console.log('###', 'Detect and Remove Loop in a Linked List', '###');
console.log('################################################');

function detectAndRemoveLoop(list) {
  var head = list.head,
    slow = head,
    fast = head.next;

  while (fast && fast.next) {
    // ? fast === slow
    if (fast === slow) {
      break;
    }
    slow = slow.next;
    fast = fast.next.next;
  }

  if (fast === slow) {
    // fast - it's an element that stay before

    slow = head;
    while (slow !== fast.next) {
      fast = fast.next;
      slow = slow.next;
    }

    fast.next = null;
  }
}
var lWithLoop = new LList(11);
lWithLoop.push(7);lWithLoop.push(8);lWithLoop.push(5);lWithLoop.push(3);
// Creating a loop
lWithLoop.head.next.next.next.next.next = lWithLoop.head.next;
detectAndRemoveLoop(lWithLoop);
lWithLoop.display();




