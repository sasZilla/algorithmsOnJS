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


let Mocha = require('mocha');
let assert = require('assert');
let mocha = new Mocha();

// coderpad hack
mocha.suite.emit('pre-require', this, 'solution', mocha);

// could be potentially more than 3 keys in the object above
let items = [
  {color: 'red', type: 'tv', age: 18},
  {color: 'silver', type: 'phone', age: 20}
]

let excludes = [
  {k: 'color', v: 'silver'},
  {k: 'type', v: 'tv'}
]

/*
  Exclude some items from list
  @param {Object[]} items
  @param {Object[]} excludes
  @returns {Object[]} excluded items
*/
function excludeItems(items, excludes) {
   excludes.forEach(pair => {
      // item[pair.k] === item[pair.v] - always false
      // so filter will return []
      // and items will be [] always
      items = items.filter(item => item[pair.k] === item[pair.v]);
   });
   return items;
}

function excludeItemsOptimized(items, excludes) {
  // First change excludes a little bit
  // Let's think what we want from excluded Object
  // 1. we want to use it for fast checking if we need to exclude item from list
  // 2. for this goals usually good to use js objects
  // 3. we can join elements by types and set key as color, type, age, ...
  //    and values as Arrays of excluded values
  let excludesNormalized = excludes.reduce((normalized, pair) => {
    // create element in object or do nothing if exist
    normalized[ pair.k ] = normalized[ pair.k ] || [];

    // put value to array if not exists
    if (!normalized[ pair.k ].contains(pair.v)) {
      normalized[ pair.k ].push(pair.v)
    }

    return normalized;
  }, { /* as decided before it's an object - initial value */ });


  // Now lets filter items elements
  // and compare with excluded values
  // if found any return true in filter

  return items.filter((item) => {
    return !!Object.keys( excludesNormalized ).find(excludeKey => {
      let foundToCompare = item[ excludeKey ];

      if (foundToCompare && excludesNormalized[excludeKey].contains(foundToCompare)) {
        return true;
      }

      return false;
    });
  });
}

/*
1. Describe what this function is doing...
2. What is wrong with that function ?
3. How would you optimize it ?
*/

// 2 Write an emitter class:
// https://gist.github.com/kutyel/7d8f204a347840a6ee7220743957e504
/*
emitter = new Emitter();

// 1. Support subscribing to events.
sub = emitter.subscribe('event_name', callback);
sub2 = emitter.subscribe('event_name', callback2);

// 2. Support emitting events.
// This particular example should lead to the `callback` above being invoked with `foo` and `bar` as parameters.
emitter.emit('event_name', foo, bar);

// 3. Support unsubscribing existing subscriptions by releasing them.
sub.release(); // `sub` is the reference returned by `subscribe` above
*/

/*
Emitter class has 3 methods:
1. sub = emitter.subscribe(eventName, callback)
2. sub.release() - unsubscribe from emitter
3. emitter.emit(eventName, ...args)


can we subscribe with one event several times or only one? can several
*/


function Emitter() {
  this._subscriptions = [];
};

Emitter.prototype.subscribe = function(eventName, callback) {
  let event = Object.create({
    event: eventName,
    callback: callback,
    release: () => {
      this._subscriptions = this._subscriptions.filter((sub) => {
        return sub.event !== eventName;
      });
    },
    toString: () => {
      return `${this.event} - ${this.callback}`;
    }
  });


  this._subscriptions.push(event);

  return event;
};

Emitter.prototype.emit = function(eventName, ...args) {
  this._subscriptions.filter((sub) => {
    return sub.event === eventName;
  }).map(sub => sub.callback.apply(this, args));
};

let emitter = new Emitter();
function callback() {console.log('callback', arguments)}
function callback2() {console.log('callback2', arguments)}

let sub = emitter.subscribe('event_name', callback);
let sub2 = emitter.subscribe('event_name2', callback2);

emitter.emit('event_name', 'foo', 'bar');

console.log('sub', sub)

sub.release();

emitter.emit('event_name', 'foo', 'bar');

// 3. flatten
// recursive and iterative
// 1. recursive

function flatten1(arr) {
  // iterate by element if isArray, call flattenRec func
  // if el push element to store

  let store = [];

  function recFlatten(arr, store) {
    if (Array.isArray(arr)) {
      arr.map(el => recFlatten(el, store));
    } else {
      store.push(arr);
    }
  }


  recFlatten(arr, store);

  return store;
}


let test1 = [1, 2, 3, 4, [NaN, undefined, 1, 3], null, 44, '', [[[[55]]]]];
console.log( flatten1(test1) );

function flatten2(arr) {
  let result = [];

  // return if we have not valid or empty values
  if (Array.isArray(arr) === false || arr.length && arr.length === 0) {
    return arr; // clarify what we should return in this case?
  }

  // create stack to keep stopIndex and arrays on each levels
  let store = [];

  // push first values in stack to pop in on iteration
  store.push({
    stopIndex: 0,
    current: arr
  });

  let STOP_INDEX = 0;
  let MAX_ITERATIONS = 100;

  while (store.length > 0 && STOP_INDEX < MAX_ITERATIONS) {

    // get top values from store to keep order from deep to top
    let { stopIndex, current } = store.pop();

    while (stopIndex < current.length && STOP_INDEX < MAX_ITERATIONS) {
      // simle push to result if not array
      if (!Array.isArray(current[stopIndex])) {
        result.push(current[stopIndex]);
        stopIndex++;
      } else {

        // if we are not at last element index !== el.length - 1
        // push to stack stopIdex+1 - we'll start from next element
        //                            when come here in future
        if (stopIndex < current.length - 1) {
          store.push({
            stopIndex: stopIndex + 1,
            current: current
          });
        }
        // change current as child level
        // reset stopIndex to 0
        current = current[stopIndex];
        stopIndex = 0;
      }

      STOP_INDEX++;
    }
  }

  console.log(STOP_INDEX)

  return result;
}


//
console.log('################################################');
console.log('###', 'You have a singly-linked list and want to check if it contains a cycle.', '###');
console.log('################################################');
/*
You have a singly-linked list ↴ and want to check if it contains a cycle.
Write a function containsCycle() that takes the first node in a singly-linked list and returns a boolean indicating whether the list contains a cycle.

1. singly-linked list
2. check if it contains a cycle
3. write function containsCycle() that will return boolean
===

create a set of values and check if it's already exists in set while iterting the list
*/

function containsCycle(head) {
  // create a set to check if we already has node in set
  let store = new Set();

  while (head) {
    // if not found any element in Set, continue move via list
    // also put to Set node on this step

    if (!store.has(head)) {
      store.add(head);
      head = head.next;
    } else {
      return true;
    }
  }

  // if we comes to the end node.next === null
  // it means we didn't find any cycles
  return false;
}

function containsCycle2(head) {
  if (!head || !head.next) {
    return false;
  }

  if (head === head.next) {
    return true;
  }

  let slow = head;
  let fast = head;

  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
}


Mocha = require('mocha');
assert = require('assert');
mocha = new Mocha();

mocha.suite.emit('pre-require', this, 'solution', mocha);

describe('Find if list has cycle', function() {
  it('Shouldn\'t contains cycle', function() {

    let listTest1 = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: null
        }
      }
    };

    assert.equal(containsCycle(listTest1), false);
    assert.equal(containsCycle2(listTest1), false);

  });

  it('Should contains cycle', function() {
    let listNode = {
      value: 1,
      next: {
        value: 22,
        next: null
      }
    };
    let listTest22 = {
      value: 11,
      next: listNode
    };

    listNode.next = {
      value: 2,
      next: {
        value: 22,
        next: listNode
      }
    };

    assert.equal(containsCycle(listTest22), true);
    assert.equal(containsCycle2(listTest22), true);
  });
});



console.log("\n", '################################################');
console.log('###', 'Write a function fib() that takes an integer nn and returns the nnth Fibonacci ↴ number.', '###');
console.log('################################################');

/*
1. write fibonacci function
2. start from 0 f(0) = 0, f(1) = 1, f(2) = 1
3. fib formula f(n) = f(n-1) + f(n-2)
===
1. recursive: 2^N
  function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fib(n-1) + fib(n-2);
  }

2. iterative, store prev result in array O(N)
  function fib(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    let store = [0, 1];
    for (let i=2;i<n;i++) {
      store[i] = store[i - 1] + store[i - 2];
    }

    return store[n - 1] + store[n - 2];
  }


*/


function fib(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let store = [0, 1];
  for (let i=2;i<n;i++) {
    store[i] = store[i - 1] + store[i - 2];
  }

  return store[n - 1] + store[n - 2];
}

console.log(fib(0), 0);
console.log(fib(1), 1);
console.log(fib(2), 1);
console.log(fib(3), 2);
console.log(fib(5), 5);
console.log(fib(10), 55);

console.log("\n", '################################################');
console.log('###', 'Write a function to check that a binary tree is a valid binary search tree.', '###');
console.log('################################################');
/*
  binary tree - tree each element has 0,1 or 2 children
  funciton Node(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  binary search tree -
    all left descendatds less then curr node value and
    all right descendants greate then curr node value
 ===
 to check if binary thee is binary search tree we need to check if:
  left node < curr value
  right node > curr value

do it reqursive:
  function isBinarySearchTree(node, min, max) {
    if node === null:
      return true

    if node.value > min &&
      node.value < max &&
      isBinarySearchTree(node.left, min, node.value) &&
      isBinarySearchTree(node.right, node.value, max) {
        return true;
    }

    return false;
  }


*/

function isBinarySearchTree(node, min, max) {
  if (node === null) return true;

  if (
    node.value > min &&
    node.value < max &&
    isBinarySearchTree(node.left, min, node.value) &&
    isBinarySearchTree(node.right, node.value, max)
  ) {
    return true;
  }

  return false;
}


function BinaryTreeNode(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
};

BinaryTreeNode.prototype.insertRight = function(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
};

describe('is Binary Search Tree', function() {
  it('Should be binary tree', function() {
    let node = new BinaryTreeNode(3);
    node.insertLeft(1);
    node.insertRight(5);

    assert.equal( isBinarySearchTree(node, -Infinity, Infinity), true );
  });

  it('Shouldn\'t be binary search tree', function() {
    let node = new BinaryTreeNode(3);
    node.insertLeft(7);
    node.insertRight(5);

    assert.equal( isBinarySearchTree(node, -Infinity, Infinity), false );
  });
});

console.log("\n", '################################################');
console.log('###', 'Write an efficient function that checks whether any permutation of an input string is a palindrome.', '###');
console.log('################################################');
/*
Write an efficient function that checks whether any permutation of an input string is a palindrome.
Function should check if there is some permutation of string that can be a palindome

1. given string
2. find if any permutation of string is palindrome
3. function should be efficien
4. what is a given string value - only strings
5. what should be the result - true/false
====
Algorithm:
- iterate through the string by each char and save it to hash with values(0-even, 1-odd)
- look through the hash if we have more then one odd element(% 2 === 1)
- if has more then one even element return false, else return true
Time complexity: O(N)
Space complexity: O(N)
*/

function isAnyPermutationPalindrome(str) {
  let store = Array.from(str).reduce((store, el) => {
    // if found in hash element, mark it as 0(even)
    if (store[el]) {
      store[el] = 0;

    // otherwise if not found or store[el] === 0, mark as 1(odd)
    } else {
      store[el] = 1;
    }

    return store;
  }, {});

  // Now we need to check if store contains more than one odd element
  return Object.values(store).filter(v => v % 2 === 1).length <= 1;
}


describe('Is Any permutation palindrome', function() {
  it('Empty string', function() {
    assert.equal(isAnyPermutationPalindrome(''), true);
  });
  it('civic', function() {
    assert.equal(isAnyPermutationPalindrome('civic'), true);
  });
  it('ivicc', () => assert.equal(isAnyPermutationPalindrome('ivicc'), true));
  it('livci', () => assert.equal(isAnyPermutationPalindrome('livci'), false));
  it('civil', () => assert.equal(isAnyPermutationPalindrome('civil'), false));
})


console.log("\n", '################################################');
console.log('###', 'Implement a queue with 2 stacks', '###');
console.log('################################################');
/*
Implement a queue ↴ with 2 stacks. ↴ Your queue should have an enqueue and a dequeue method and it should be "first in first out" (FIFO).

Optimize for the time cost of mm calls on your queue. These can be any mix of enqueue and dequeue calls.

Assume you already have a stack implementation and it gives O(1)O(1) time push and pop.

1. implement queue (FIFO)
2. has 2 stacks
3. Queue class should have enqueue and dequeue methods
4. Optimise time should be m
5. stack implementation has O(1) time push/pop
===
put element in one stack,
if we need to get element(dequeue) - use filled stack:
  pop all elements each by each and push to empty stack - this action will change the order
  pop from filled stack - this will be the first(needed element) and do action to pop->push elements

always enqueue to filled stack
on dequeue pop all elements from filled and push to empty, then pop first(dequeued), and pop->push back

time complexity: O(N)
space complexity: O(N)
*/


class Queue {
  constructor() {
    this._stack1 = [];
    this._stack2 = [];
  }

  dequeue() {
    if (this._stack1.length === 0) {
      throw new Error('Queue is empty!');
      return;
    }

    while (this._stack1.length > 1) {
      this._stack2.push( this._stack1.pop() );
    }

    let result = this._stack1.pop();

    while (this._stack2.length > 0) {
      this._stack1.push( this._stack2.pop() );
    }

    return result;
  }

  enqueue(el) {
    this._stack1.push(el);
  }
}

describe('Queue implementation', function() {
  it('Should enqueue element 1', function() {
    let queue = new Queue();
    queue.enqueue(1);

    assert.equal(queue._stack1.length, 1);
  });
  it('Should dequeue element 1', function() {
    let queue = new Queue();
    queue.enqueue(1);
    assert.equal(queue.dequeue(), 1);
    assert.equal(queue._stack1.length, 0);
    assert.equal(queue._stack2.length, 0);
  })
});


console.log("\n", '################################################');
console.log('###', 'finding the index of the "rotation point"', '###');
console.log('################################################');
/*
/*
I want to learn some big words so people think I'm smart.

I opened up a dictionary to a page in the middle and started flipping through, looking for words I didn't know. I put each word I didn't know at increasing indices in a huge array I created in memory. When I reached the end of the dictionary, I started from the beginning and did the same thing until I reached the page I started at.

Now I have an array of words that are mostly alphabetical, except they start somewhere in the middle of the alphabet, reach the end, and then start from the beginning of the alphabet. In other words, this is an alphabetically ordered array that has been "rotated." For example:

  var words = [
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
    'asymptote',  // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
];

Write a function for finding the index of the "rotation point," which is where I started working from the beginning of the dictionary. This array is huge (there are lots of words I don't know) so we want to be efficient here.


1. array of words that can be not from A letter
2. need to find index of rotates(A letter first found)
3. the array is huge and need more effective algorithm that O(N)
4. function should get array(or empty array) and return index of rotation element
===

to implement this we can use binary search and compare words
if we found index it sould be words[index-1] > words[index]

let's use two variables left, right to store borders values
get mid as (left + right)/2

compare rigth with mid:
  if mid > rigth: left = mid + 1
  else: right = mid

*/


function findIndexRotationPoint(words) {
  let left = 0;
  let right = words.length - 1;

  while (words[left] > words[right]) {
    let mid = Math.ceil( (left + right) / 2 );

    if (words[mid] > words[right]) {
      left = mid + 1; // because we need to get index of rotation element, not previous
    } else {
      right = mid;
    }
  }

  return left;
}


describe('Find Index of Rotation Element', function() {
  it('Should return index 4', function() {
    let test = ['b', 'ba', 'bb', 'bc', 'a', 'aa', 'ab'];

    assert.equal(findIndexRotationPoint(test), 4);
  });
  it('Should return undex 0', function() {
    let test = ['a', 'b', 'c'];

    assert.equal(findIndexRotationPoint(test), 0);
  });
});



console.log("\n", '################################################');
console.log('###', 'Merge two sorted arrays', '###');
console.log('################################################');

/*

In order to win the prize for most cookies sold, my friend Alice and I are going to merge our Girl Scout Cookies orders and enter as one unit.

Each order is represented by an "order id" (an integer).

We have our lists of orders sorted numerically already, in arrays. Write a function to merge our arrays of orders into one sorted array.

For example:

  var myArray     = [3, 4, 6, 10, 11, 15];
var alicesArray = [1, 5, 8, 12, 14, 19];

console.log(mergeArrays(myArray, alicesArray));
// logs [1, 3, 4, 5, 6, 8, 10, 11, 12, 14, 15, 19]

1. given two sorted arrays
2. merge this to one sorted
3. elements in array are one type, integer
===
Algorithm:
  Create resultArray to push element from first and from secon arrays
  keep 2 currentIndexes to understand where we are currently
    we need it put element from on and compare currElement with anotherArr[currAnotherArrIndex]

set indexes to 0
iterate while index1 < array1.length && index2 < array2.length
  if array1[index1] < array2[index2]: push array1[index1] to result, index1++
  else: push array2[index2] to result, index2++

Time Complexity: O(arra1.length + array2.length)
Space Complexity: O(array1.length + array2.length)
*/

function mergeArrays(arrayFirst, arraySecond) {
  let merged = [];
  let indexFirst = 0;
  let indexSecond = 0;

  while (indexFirst < arrayFirst.length && indexSecond < arraySecond.length) {
    if (arrayFirst[indexFirst] < arraySecond[indexSecond]) {
      merged.push(arrayFirst[indexFirst]);
      indexFirst++;
    } else {
      merged.push(arraySecond[indexSecond]);
      indexSecond++;
    }
  }

  if (indexFirst < arrayFirst.length) {
    while (indexFirst < arrayFirst.length) {
      merged.push(arrayFirst[indexFirst]);
      indexFirst++;
    }
  }

  if (indexSecond < arraySecond.length) {
    while (indexSecond < arraySecond.length) {
      merged.push(arraySecond[indexSecond]);
      indexSecond++;
    }
  }

  return merged;
}


Mocha = require('mocha');
assert = require('assert');
mocha = new Mocha();

mocha.suite.emit('pre-require', this, 'solution', mocha);


describe('Merge two sorted arrays', function() {
  it('Should be [1,3,4,5,6,8,10,11,12,15]', function() {
    let myArray     = [3, 4, 6, 10, 11, 15];
    let alicesArray = [1, 5, 8, 12];

    assert.equal(mergeArrays(myArray, alicesArray).toString(), '1,3,4,5,6,8,10,11,12,15');
  })
});


function trottle(callback, limit) {
  let wait = false;
  return function() {
    if (!wait) {
      wait = true;
      callback.call(null, arguments);
      setTimeout(function() {
        wait = false;
      }, limit)
    }
  };
}


// run specs
mocha.run()
