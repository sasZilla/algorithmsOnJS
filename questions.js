console.log('################################################');
console.log('###', 'Interview Questions', '###');
console.log('################################################');

console.log('################################################');
console.log('###', '1.1 flatten array recursive', '###');
console.log('################################################');

/*
flatten array
1. types of elements
2. size of array
3. it should be a function or object method(via Array.prototype.flatten)
4. should it change array inplace or return new one
5. the result of not valid arguments
=====
Example: [1, 23, 's', null, [undefined, 1, 0], [], 3, '', [[[44]]], [{a:[1,2]}]]
Recursive, return new array:
  if not valid array(not array) return null

  set result as empty array
  go througth array:
    if not array: push element to results
    if array: call flatten function and concat with result(can use splice with apply method)
  return result
=====
Time complexity: Depends on internal arrays O(N) - best result, O(N^N) - worst case
Memory complexity:


Recursive, return same array:
  if argument not valid array(not array) return argument

  iterate array as element index:
    if element not array: do nothing
    if element is array:

  return current array
=====
*/

function flattenRec(arr) {
  var flattenArray = [],
    deepFlattenArray;

  if (!Array.isArray(arr)) {
    return arr;
  }

  arr.forEach(function(el) {
    if (Array.isArray(el)) {
      deepFlattenArray = flattenRec(el);
      deepFlattenArray.forEach(function(internalEl) {
        flattenArray.push(internalEl);
      });
    } else {
      flattenArray.push(el);
    }
  });

  return flattenArray;
}

function flattenRecInplace(arr) {
  var internalResult;

  if (!Array.isArray(arr)) {
    return arr;
  }

  for (var i=0; i<arr.length; i++) {
    if (Array.isArray(arr[i])) {
      internalResult = flattenRecInplace(arr[i]);
      internalResult.forEach(function(internalEl) {
        arr.splice(i, 1, internalEl);
      });
    }
  }

  return arr;
}

var testArrayForFlatten = [1, 23, 's', null, [undefined, 1, 0], [], 3, '', [[[44]]], [{a:[1,2]}]]
var testArrayForFlatten2 = [1, 23, 's', null, [undefined, 1, 0], [], 3, '', [[[44]]], [{a:[1,2]}]]

console.log( flattenRec(testArrayForFlatten), [1,23,'s',null,undefined,1,0,3,'',44,{a:[1,2]}]);
console.log( "TODO: fix it with inplace method",  flattenRecInplace(testArrayForFlatten2), [1,23,'s',null,undefined,1,0,3,'',44,{a:[1,2]}]);

console.log('################################################');
console.log('###', '1.2 flatten array iterative', '###');
console.log('################################################');

/*
  flatten with iterations
===
Example: [1, 23, 's', null, [undefined, [[1], 0]], [], 3, '', [[[44]]], [{a:[1,2]}]]

flatten with iterations
  if argument is not array return argument

  currentElement = array
  stopIndexStack = []
  parentContextStack = []
  index = 0
  while index < currentElement.length:
    set element as currentElement[ index ]

    if element isn't Array:
      push to results
      index++

    if element is Array:
      // save current index and put it to stack
      // but check if it's not last index
      if index < currentElement.length - 1
        stopIndexStack.push index

      // set index as 0 for internal Loop
      index = 0

      // before change currentElement save as a parent context
      // but also check if it's not last element
      if index < currentElement.length - 1
        parentContextStack.push currentElement

      // set currentElement as element
      currentElement = element

    // what happens if index became currentElement.length ?
    // we need to pop index from stopIndexStack
    // and change currentElement with parentContext
    if index is currentElement.length and parentContextStack.length > 0
      currentElement = parentContextStack.pop() - but what if there is no elements here?
      index = stopIndexStack.pop() + 1 - because we saved stop index, but need next,
                                        and what if this is last index in parent context?
                                        in case of it was last index we don't need to keep parent

  return result
===
*/
function flattenIter(array) {
  var result = [],
    stopIndexStack = [],
    parentContextStack = [],
    currentElement, currentIndex,
    element;

  if (!Array.isArray(array)) {
    return array;
  }

  currentIndex = 0;
  currentElement = array;

  while ( currentIndex < currentElement.length ) {
    element = currentElement[ currentIndex ];

    if (!Array.isArray(element)) {
      result.push( element );
      currentIndex++;
    } else {
      if (currentIndex < currentElement.length - 1) {
        stopIndexStack.push( currentIndex );
        parentContextStack.push( currentElement );
      }

      currentIndex = 0;
      currentElement = element;
    }

    if (currentIndex === currentElement.length && parentContextStack.length > 0) {
      currentIndex = stopIndexStack.pop() + 1; // next index after stop
      currentElement = parentContextStack.pop();
    }
  }

  return result;
}

var testArrayForFlattenIter = [1, 23, 's', null, [undefined, 1, 0], [], 3, '', [[[44]]], [{a:[1,2]}]]
var testArrayForFlattenIter2 = [1, 23, 's', null, [undefined, [[1], 0]], [], 3, '', [[[44]]], [{a:[1,2]}]]

console.log( flattenIter(testArrayForFlattenIter), [1,23,'s',null,undefined,1,0,3,'',44,{a:[1,2]}]);
console.log( flattenIter(testArrayForFlattenIter2), [1,23,'s',null,undefined,1,0,3,'',44,{a:[1,2]}]);


console.log('################################################');
console.log('###', '2. Observer Pattern', '###');
console.log('################################################');

/*
  Observer pattern allow to subscribe/unsubscribe/emit events
  to communicate between different components in application

=====
  The idea of Observer pattern is allow components to communicate between each other
  without hard dependencies

  first we need to create storage to keep events

  Subject
  + observerCollection
  --------------------
  + registerObserver( subscribe )
  + unregisterObserver( unsubscribe )
  + notifyObservers( notifyAll )
  + notifyObserver( notifyOne )

  Observer
  + notify method
*/


function Subject() {
  this.observers = [];
}

Subject.prototype = {
  subscribe: function(observer) {
    this.observers.push(observer);
  },

  unsubscribe: function(observer) {
    var index = this.observers.indexOf(observer);

    if (index > -1) {
      this.observers.splice(index, 1);
    }
  },

  notifyAll(params) {
    this.observers.map(function(observer, i) {
      observer.notify(i, params);
    });
  },

  notifyOne(observer, params) {
    var index = this.observers.indexOf(observer);

    if (index > -1) {
      this.observers[index].notify(index, params);
    }
  }
};

function Observer() {
  return {
    notify: function(index, params) {
      console.log("Observer " + index + ' was notified!', params);
    }
  }
}


var subject = new Subject();

var observer1 = new Observer(),
  observer2 = new Observer(),
  observer3 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);

subject.notifyAll();
subject.notifyOne(observer1, {foo: 'bar'});


console.log('################################################');
console.log('###', '3. Find the corresponding node in tree', '###');
console.log('################################################');
/*
  Given two identical DOM tree structures,
  A and B, and a node from A,
  find the corresponding node in B.
======
    A          B
   / \        / \
  N1  N4     N1  N4
 / \        / \
N2 N3!     N2 N3!

given: N3! in A
find: N3! in B

is it binary tree? (Not) it's a DOM tree,
  so allowed parentNode, childNodes, etc...

1. find path to node
  create an store to save path

  start from element and move to the root pushing childIndex to stack
  stop if root


2. find node by path
  iterate through store and get childNodes with saved index


function getPath(rootNode, givenNode) {
  var path = [];

  while (givenNode !== rootNode) {
    path.push( [].indexOf.call(givenNode.parentNode.childNodes, givenNode) );
    givenNode = givenNode.parentNode;
  }

  return path;
}

function getNodeFromPath(rootNode, path) {
  var node = rootNode;

  for (var i=0; i<path.length; i++) {
    node = node.childNodes[i];
  }

  return node;
}

function getTwins(rootA, rootB, givenNode) {
  return getNodeFromPath(rootB, getPath(rootA, givenNode));
}

*/

console.log('################################################');
console.log('###', '4. Implement a simple store class with set(Node, value), get(Node) and has(Node) methods', '###');
console.log('################################################');

/*

  Implement a simple store class with
    set(Node, value), get(Node) and has(Node) methods,
    which store a given Nodes with corresponding values.

1. Implement class similar with Map
2. class should has elements
3. Element is Node(with value)
4. Can we store one node several times? yes
===

Node - can be any type

v1. TreeMap = new Map()
  set(Node, value)
  get(Node)
  has(Node)

v2. TreeMap = function: this.storeKey = [], this.storeValue;
  TreeMap.prototype = {
    set:
      if has Node: find in storeKey and change value by index in storeValue
      else: push to storeKey Node and to storeValue value
    get: find Node in storeKey and return by index in storeValue or return -1 || O(N)
    has: if findNode return true else false O(N)
  }
*/

(function(){

function TreeMap() {
  this.storeKey = [];
  this.storeValue = [];
}

TreeMap.prototype = {
  set: function(Node, value) {
    var index = this._indexOf(this.storeKey, Node);
    if (index > -1) {
      this.storeValue[index] = value;
    } else {
      this.storeKey.push(Node);
      this.storeValue.push(value);
    }
  },
  get: function(Node) {
    var index = this._indexOf(this.storeKey, Node);
    if (index > -1) {
      return this.storeValue[index];
    }
    // get undefined if has now Node in list
  },
  has: function(Node) {
    return this._indexOf(this.storeKey, Node) > -1;
  },
  _indexOf: function(store, value) {
    // the problem in NaN value,
    //    NaN === NaN // false  typeof NaN === 'number'
    // to avoid it just check if it's NaN and use findIndex method
    return (typeof value === 'number' && isNaN(value)) ? store.findIndex(function(v) {
      return typeof v === 'number' && isNaN(v);
    }) : store.indexOf(value);
  }
};

// Testing

function Node(value) {
  this.value = value;
}

var treeMap = new TreeMap();

var node1 = new Node('Hello'),
  node2 = {foo: 'bar'};
  node3 = [1,2,3],
  node4 = 'string',
  node5 = '',
  node6 = null,
  node7 = undefined,
  node8 = NaN,
  node9 = 0,
  node10 = {};

treeMap.set(node1, 1)
treeMap.set(node2, node2)
treeMap.set(node5, 1)
treeMap.set(node6, 1)
treeMap.set(node7, 1)
treeMap.set(node8, 1)
treeMap.set(node9, 1)
treeMap.set(node10, 1)

console.log(treeMap.has(node1), "should has(node1)")
console.log(treeMap.has(node2), "should has(node2)")
console.log(treeMap.has(node5), "should has(node5)")
console.log(treeMap.has(node6), "should has(node6)")
console.log(treeMap.has(node3), "shouldn't has(node3)")
console.log(treeMap.has(node4), "shouldn't has(node4)")

console.log(treeMap.get(node2), "should be", node2)
console.log(treeMap.get(node5), "should be 1")
console.log(treeMap.get(node6), "should be 1")
console.log(treeMap.get(node7), "should be 1")
console.log(treeMap.get(node8), "should be 1")
console.log(treeMap.get(node9), "should be 1")
console.log(treeMap.get(node10), "should be 1")
console.log(treeMap.get({foo: "bar"}), "should be undefined")

treeMap.set(node3, node3)
treeMap.set(node4, node4)
treeMap.set(node5, node5)
treeMap.set(node6, node6)
treeMap.set(node7, node7)
treeMap.set(node8, node8)
treeMap.set(node9, node9)
treeMap.set(node10, node10)

console.log(treeMap.get(node2), "should be", node2)
console.log(treeMap.get(node5), "should be", node5)
console.log(treeMap.get(node6), "should be", node6)
console.log(treeMap.get(node7), "should be", node7)
console.log(treeMap.get(node8), "should be", node8)
console.log(treeMap.get(node9), "should be", node9)
console.log(treeMap.get(node10), "should be", node10)
console.log(treeMap.get({foo: "bar"}), "should be undefined")
})();

console.log('################################################');
console.log('###', '5. find and return the FIRST bad revision', '###');
console.log('################################################');
/*
  If you have 500 revisions of a program,
  write a program that will find and return the FIRST bad revision
  given a isBad(revision i) function.  ( Binary Search algorithm.? )
====
1. given collection of revisions
2. length of collection is 500
3. given isBad(index) function
4. find and return FIRST bad revision
5. what we should return if no bad revisions? null
====
iterate collection by revision, index:
  if isBad(index): return revision
return null

time complexity: O(N)
memory complexity: O(N)
*/
(function() {
  function findBadRevision(collection) {
    return collection.find((v, i) => isBad(i));
  }

  function findBadRevision2(collection) {
    var badRevision;

    for (var i=0,l=collection.length; i<l; i++) {
      if (isBad(i)) {
        badRevision = collection[i];
      }
    }

    return badRevision;
  }
})();

console.log('################################################');
console.log('###', '6. Decode message from Matrix', '###');
console.log('################################################');
/*
Given a grid of characters output a decoded message.
The  message for the following would be IROCLED.
(diagonally down right and diagonally up right if you can't go further .. you continue doing this)
*I*  B   C   A  *L*  K   A
 D  *R*  F  *C*  A  *E*  A
 G   H  *O*  E   L   A  *D*
====
1. Matrix with letters
2. Implement ZigZag algorithm
====
set array as store
start from i=0 j=0
save rows length, save cols length

nextElement:
  if in top or in the middle down trend: down right
  if in bottom or in the middle up trend: up right
stop when cant go right

trend = 'down'
repeat i++ until cols length:
  if trend === 'down':
    j++
    push element M[i][j] to store
  else if trend === 'up':
    j--
    push element M[i][j] to store

  if last row: trend = 'up'
  else if first row: trend = 'down'

 time complexity O(N)
 memory complexity O(N*M)
*/

(function() {
  function decodeMatrix(M) {
    var i = 0, j = 0, colLen = M[0].length, rowLen = M.length,
      trend = 'down',
      store = [];

    for (i=0; i<colLen; i++) {
      store.push(M[j][i]);

      if (j === rowLen - 1) {
        trend = 'up';
      } else if (j === 0) {
        trend = 'down';
      }

      if (trend === 'up') {
        j--;
      } else {
        j++;
      }
    }

    return store.join('');
  }

var test = [
  ['*I*', 'B',   'C',   'A',  '*L*',  'K',   'A' ],
  ['D',  '*R*',  'F',  '*C*',  'A',  '*E*',  'A' ],
  ['G',   'H',  '*O*',  'E',   'L',   'A',  '*D*']
];

console.log(decodeMatrix(test), "IROCLED");

})();

console.log('################################################');
console.log('###', '7. Implement a square root function.', '###');
console.log('################################################');
/*
  given n:
  set error as low number like 0.00001
  if n === 1: return 1
  else: left = 0 right = n
    find middle between left and right
    if result^2 - n < error: return result
    else if result^2 > n: pick range between left and middle
    else if result^2 < n: pick range between  middle and right
*/

(function() {
function checkError(v1, v2) {
  var error = 0.00001;
  return v1 > v2 ? v1 - v2 < error : v2 - v1 < error;
}

function sqrt(n) {
  var left, right, middle;

  if (n < 0) {
    return NaN;
  } else if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  if (n > 1) {
    left = 1;
    right = n;
  } else {
    left = n;
    right = 1;
  }
  middle = (right + left) / 2;
  while (!checkError(n, Math.pow(middle,2))) {
    if (Math.pow(middle,2) < n) {
      left = middle;
    }
    if (Math.pow(middle,2) > n) {
      right = middle;
    }

    middle = (right + left) / 2;
  }

  return middle;
}

var test = [-1, 0,1,2,9,0.25,0.2];

console.log(
  test.map(sqrt), test.map(Math.sqrt)
);
})();

console.log('################################################');
console.log('###', '6. Decode message from Matrix', '###');
console.log('################################################');
/*
  Given an input array and another array that describes a new index for each element,
  mutate the input array so that each element ends up in their new index.
  Discuss the runtime of the algorithm and
  how you can be sure there won't be any infinite loops
===
1. given input array with elements
2. given array with new indexes
3. mutate input array change indexes for elements

var arr = ['A', 'B', 'C'],
  newIndexes = [2, 0, 1];

iterate by newIndexes element, index:
  we need to put in input arr[index] element from newIndexes.indexOf(index) position


*/


(function() {
function swapper(inputArr, newIndexes) {
  inputArr = newIndexes.map((newIndex, index) => inputArr[newIndexes.indexOf(index)]);
  return inputArr;
}


// O(N)
function swapperInplace(inputArr, newIndexes) {
  newIndexes.map(function(newIndex, currIndex) {
    inputArr[ newIndex ] = {
      old: inputArr[ newIndex ],
      new: inputArr[currIndex].old ? inputArr[currIndex].old : inputArr[currIndex]
    };
  });

  inputArr.map(function(el, i) {
    inputArr[i] = el.new;
  });

  return inputArr;
}

var testInputArr1 = ['A', 'B', 'C', 'D', 'E'],
  testInputArr2 = ['A', 'B', 'C', 'D', 'E']
  testNewIndexes = [3, 2, 0, 1, 4];

console.log('swapper       ', swapper(testInputArr1, testNewIndexes), ['C', 'D', 'B', 'A', 'E']);
console.log('swapperInplace', swapperInplace(testInputArr2, testNewIndexes), ['C', 'D', 'B', 'A', 'E']);

})();
