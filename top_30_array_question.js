//npm install colors
var colors = require('colors/safe');

var colorsDictionary = {
  true: colors.green,
  false: colors.red
}

console.log('#########################################################################################################');
console.log('###', '1. How to find the missing number in integer array of 1 to 100?', '###')
console.log('#########################################################################################################');
/*
  This is one of the most simple array problems you will see,
  mostly asked in a telephonic round of Interview.
  You have given an integer array which contains numbers from 1 to 100 but one number is missing,
  you need to write a Java program to find that missing number in an array.
  You cannot use any open source library or Java API method which solves this problem.
  One trick to solve this problem is to calculate sum of all numbers in the array and
  compare with expected sum, the difference would be the missing number.
*/

function findMissingNumber(arr) {
  var len = arr.length,
    ariphmeticSumm = (1 + 100) * 100 / 2,
    realSum = 0;

  for (var i = 0; i < arr.length; i++) {
    realSum = realSum + arr[i];
  }

  return ariphmeticSumm - realSum;
}

var arr = [];
var i = 0;
while (arr.length <= 100) {
  arr.push(i);
  i++;
}

arr.splice(49,1);
console.log( findMissingNumber(arr) === 49,  '49');



console.log('#########################################################################################################');
console.log('###', '2. How to find duplicate number on Integer array in Java?', '###')
console.log('#########################################################################################################');
/*
  An array contains n numbers ranging from 0 to n-2.
  There is exactly one number is repeated in the array.
  You need to write a program to find that duplicate number.
  For example, if an array with length 6 contains numbers {0, 3, 1, 2, 3},
  then duplicated number is 3.
  Actually this problem is very similar to previous one and you can apply the same trick
  of comparing actual sum of array to expected sum of series to find out that duplicate.
  This is generally asked as follow-up question of previous problem.
*/

function findDuplicateNumber(arr) {
  var len = arr.length,
    dictionary = {};
  for (var i = 0; i < arr.length; i++) {
    if (dictionary[ arr[i] ]) {
      return arr[ dictionary[ arr[i] ] ];
    } else {
      dictionary[ arr[i] ] = i;
    }
  }
  return 'Not Found';
}

var arr1 = [0, 3, 1, 2, 3];
var arr2 = [0, 3, 1, 2];
console.log(findDuplicateNumber(arr1) === 3,  '[0, 3, 1, 2, 3] duplicated number is 3');
console.log(findDuplicateNumber(arr2) === 'Not Found',  '[0, 3, 1, 2] duplicated number Not Found');


console.log('#########################################################################################################');
console.log('###', '4. How to find largest and smallest number in unsorted array?', '###')
console.log('#########################################################################################################');
/*
  This is a rather simple array interview question.
  You have given an unsorted integer array and you need to find the largest and
  smallest element in the array.
  Of course you can sort the array and then pick the top and bottom element
  but that would cost you O(NLogN) because of sorting,
  getting element in array with index is O(1) operation.
*/

function findMinMax(arr) {
  var max = Number.NEGATIVE_INFINITY,
    min = Number.POSITIVE_INFINITY;
  for (var i = 0; i < arr.length; i++) {
    var el = arr[i];
    if (max < el) {
      max = el;
    }
    if (min > el) {
      min = el;
    }
  }
  return [min,max];
}

var arr1 = [0, 3, 1, 2, 30];
console.log(findMinMax(arr1).join() === '0,30',  '[0, 3, 1, 2, 30] has 0 as min, 30 as max', findMinMax(arr2) );


console.log('#########################################################################################################');
console.log('###', '5. How to find all pairs on integer array whose sum is equal to given number?', '###')
console.log('#########################################################################################################');
/*
  This is an intermediate level of array coding question,
  its neither too easy nor too difficult.
  You have given an integer array and a number,
   you need to write a program to find all elements in array whose sum is equal to the given number.
   Remember, array may contain both positive and negative numbers,
   so your solution should consider that.
   Don't forget to write unit test though, even if interviewer is not asked for it,
   that would separate you from lot of developers.
   Unit testing is always expected from a professional developer.

  Questions:
    * Does array contains only positive or negative numbers?
    * What if same pair repeats twice, should we print it every time?
    * Is reverse of pair is acceptable e.g. can we print both (4,1) and (1,4) if given sum is 5.
    * Do we need to print only distinct pair? does (3, 3) is a valid pair for given sum of 6?
    * How big the array is?
*/

function findPairsEqualToNumber(arr, num) {
  var len = arr.length,
    res = [];

  // time complexity O(N*N)
  for (var i = 0; i < len-1; i++) {
    for (var j = i+1; j < len; j++) {
      if ( arr[i] + arr[j] === num ) {
        res.push([arr[i], arr[j]]);
      }
    }
  }
  return res;
}

/*
  Complexity O(N*logN)
  but array should has dublicats
*/
function findPairsEqualToNumberV2(arr, num) {
  var len = arr.length,
    first = 0, second = len - 1,
    res = [];

  // time complexity: O(N*log(N))
  arr.sort(function(a,b) { return a>b; });

  // time complexity: O(N*log(N))
  while (first < second) {
    var firstEl = arr[first],
      secondEl = arr[second],
      currSum = firstEl + secondEl;
    if (currSum === num) {
      res.push( [first, firstEl, second, secondEl] );
      first++;
      second--;
    } else if (currSum > num) {
      second--;
    } else if (currSum < num) {
      first++;
    }
  }
  return res;
}

var arr1 = [2, 4, 3, 5, 6, -2, 4, 7, 8, 9]
var arr2 = [0, 14, 4, 7, 8, 3, 5, -3]
console.log(colorsDictionary[findPairsEqualToNumber(arr1, 7).length === 4](arr1.toString() + ' pairs on integer array whose sum is 7'), findPairsEqualToNumber(arr1, 7));
console.log(colorsDictionary[findPairsEqualToNumberV2(arr1, 7).length === 4](arr1.toString() + ' pairs on integer array whose sum is 11'), findPairsEqualToNumberV2(arr1, 7));
console.log(colorsDictionary[findPairsEqualToNumberV2(arr2, 11).length === 3](arr2.toString() + ' pairs on integer array whose sum is 11'), findPairsEqualToNumberV2(arr2, 11));


console.log('#########################################################################################################');
console.log('###', '6.  How to find repeated numbers in an array if it contains multiple duplicate?', '###')
console.log('#########################################################################################################');
/*
  This is actually the follow-up question of problem 2,
  how to find duplicate number on integer array.
  In that case, array contains only one duplicate but what
  if it contains multiple duplicates?
  Suppose, an array contains n numbers ranging from 0 to n-1 and there are 5 duplicates on it,
  how do you find it? You can use the approach,
  we have learned in similar String based problem of finding repeated characters in given String.
*/

function findRepeatedNumbers(arr) {
  var repeatedNums = {},
    nonRepeatedNums = {};

  for (var i = 0; i < arr.length; i++) {
    var currElement = arr[i];
    // second time we get a number in dictionary
    if (nonRepeatedNums[ currElement ]) {
      repeatedNums[ currElement ] = true;
    } else {
      nonRepeatedNums[ currElement ] = true;
    }
  }
  return repeatedNums;
}

var arr1 = [2, 4, 3, 5, 6, 2, 4, 7, 8, 9,6,6,1,1]
console.log(colorsDictionary[Object.keys(findRepeatedNumbers(arr1)).length === 4](arr1.toString() + ' has 4 dublicat numbers'), findRepeatedNumbers(arr1));


console.log('#########################################################################################################');
console.log('###', '7. Write a program to remove duplicates from array?', '###')
console.log('#########################################################################################################');
/*
  This is another follow-up question from problem 2 and 6.
  You have given an array which contains duplicates, could be one or more.
  You need to write a program to remove all duplicates from array in Java.
  For example if given array is {1, 2, 1, 2, 3, 4, 5} then
  your program should return an array which contains just {1, 2, 3, 4, 5}.
  This array question is also comes at intermediate category
  because there is no way to delete an element from array.
  If substituting with another value is not an option
  then you need to create another array to mimic deletion.
*/

function removeDuplicates(arr) {
  var duplicates = {},
    i = 0;

  while (i < arr.length) {
    var currElement = arr[i];
    // we get a duplicate
    // remove duplicate - get array cut duplicate and concat arrays
    if (duplicates[ currElement ]) {
      // may be we need more effective
      arr.splice(i,1);
    } else {
      duplicates[ currElement ] = true;
      i++;
    }
  }
  return arr;
}

function removeDuplicatesV2(arr) {
  var duplicates = {},
    res = [],
    i = 0;

  while (i < arr.length) {
    var currElement = arr[i];
    // we get a duplicate
    // remove duplicate - get array cut duplicate and concat arrays
    if (!duplicates[ currElement ]) {
      duplicates[ currElement ] = true;
      res.push(currElement);
    }
    i++;
  }
  return res;
}

var arr1 = [2, 4, 3, 5, 6, 2, 4, 7, 8, 9,6,6,1,1]
var arr2 = [2, 4, 3, 5, 6, 2, 4, 7, 8, 9,6,6,1,1]
console.log(colorsDictionary[removeDuplicates(arr1).length === 9](arr1.toString() + ' had 4 dublicat numbers'), removeDuplicates(arr1));
console.log(colorsDictionary[removeDuplicatesV2(arr2).length === 9](arr2.toString() + ' had 4 dublicat numbers'), removeDuplicatesV2(arr2));


console.log('#########################################################################################################');
console.log('###', '8. How to sort an array in place using QuickSort algorithm?', '###')
console.log('#########################################################################################################');
/*
  You will often see sorting problems on array related questions,
  because sorting mostly happen on array data structure.
  You need to write a program to implement in place quick sort algorithm.
  You can implement either recursive or iterative quick sort,
  its your choice but you cannot use additional buffer,
  array or list, you must sort array in place.
*/

function quickSort(arr, left, right) {
  if (left < right) {
    var pivot = right;
    var partionIndex = partion(arr, pivot, left, right);

    quickSort(arr, left, partionIndex - 1);
    quickSort(arr, partionIndex + 1, right);
  }
  return arr;
}

function partion(arr, pivot, left, right) {
  var partionIndex = left,
    pivotValue = arr[pivot];

  for (var i = left; i < right; i++) {
    if (pivotValue > arr[i]) {
      swap(arr, i, partionIndex);
      partionIndex ++;
    }
  }
  swap(arr, partionIndex, right);
  return partionIndex;
}

function swap(arr, i, j) {
  var copy = arr[i];
  arr[i] = arr[j];
  arr[j] = copy;
}

arr1 = [11,8,14,3,6,2,7] // 0,6
arr2 = [11,8,14,3,6,2,1, 7] // 0,7
arr3 = [16,11,9,7,6,5,3, 2] //0,7

console.log(colorsDictionary[quickSort(arr1, 0, 6).toString() === [2, 3, 6, 7, 8, 11, 14].toString()](arr1.toString() + ' was sorded fine'));
console.log(colorsDictionary[quickSort(arr2, 0, 7).toString() === [1, 2, 3, 6, 7, 8, 11, 14].toString()](arr1.toString() + ' was sorded fine'));
console.log(colorsDictionary[quickSort(arr3, 0, 7).toString() === [2, 3, 5, 6, 7, 9, 11, 16].toString()](arr3.toString() + ' was sorded fine'));

console.log('#########################################################################################################');
console.log('###', '9.  Write a program to find intersection of two sorted array', '###')
console.log('#########################################################################################################');
/*
  Another interesting array interview question,
  where you need to treat array as Set.
  Your task is to write a function in your favorite language
  e.g. Java, Python, C or C++ to return intersection of two sorted array.
  For example, if the two sorted arrays as input are {21, 34, 41, 22, 35}
  and {61, 34, 45, 21, 11}, it should return an intersection array
  with numbers {34, 21}, For the sake of this problem you can assume
  that numbers in each integer array are unique.
*/

function findIntersectionV1(arr1, arr2) {
  var storage = [];
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        storage.push(arr1[i]);
      }
    }
  }
  return storage
}

function findIntersectionV2(arr1, arr2) {
  var intersection = [],
    dictionary = {};

  for (var i = 0; i < arr1.length; i++) {
    dictionary[ arr1[i] ] = true;
  }

  for (var i = 0; i < arr2.length; i++) {
    if (dictionary[ arr2[i] ]) {
      intersection.push( arr2[i] );
    }
  }
  return intersection;
}


arr1 = [11,8,14,3,6,2,7] // 0,6
arr2 = [11,8,14,3,6,2,1, 7] // 0,7
arr3 = [16,11,9,7,6,5,3, 2] //0,7

console.log(colorsDictionary[findIntersectionV1(arr1, arr2).length === 7]('has 7 intersection'), findIntersectionV1(arr1, arr2).length);
console.log(colorsDictionary[findIntersectionV1(arr3, arr2).length === 5]('has 5 intersection'), findIntersectionV1(arr3, arr2).length);

console.log(colorsDictionary[findIntersectionV2(arr1, arr2).length === 7]('has 7 intersection'), findIntersectionV2(arr1, arr2).length);
console.log(colorsDictionary[findIntersectionV2(arr3, arr2).length === 5]('has 5 intersection'), findIntersectionV2(arr3, arr2).length);


console.log('#########################################################################################################');
console.log('###', '10. There is an array with every element repeated twice except one. Find that element?', '###')
console.log('#########################################################################################################');
/*
  This is an interesting array coding problem,
  just opposite of question related to finding duplicates in array.
  Here you need to find the unique number which is not repeated twice.
  For example if given array is {1, 1, 2, 2, 3, 4, 4, 5, 5} then your program should return 3.
  Also, don't forget to write couple of unit test for your solution.
*/

function findNotRepeatedElement(arr) {
  var repeated = {},
    notRepeated = {};
  for (var i = 0; i < arr.length; i++) {
    if ( repeated[ arr[i] ] || notRepeated[ arr[i] ] ) {
      repeated[ arr[i] ] = true;
      delete notRepeated[ arr[i] ];
    } else {
      notRepeated[ arr[i] ] = true;
    }
  }
  return parseInt( Object.keys(notRepeated)[0], 10);
}

arr1 = [11,11,8,14,14,3,3,6,6,2,7,2,7] // 0,6
arr2 = [11,8,14,3,6,2,1, 7] // 0,7
arr3 = [16,11,9,7,6,5,3, 2] //0,7

console.log(colorsDictionary[findNotRepeatedElement(arr1) === 8]('found not repeated element'), findNotRepeatedElement(arr1));
console.log(colorsDictionary[findNotRepeatedElement(arr2) === 7]('found not repeated element'), findNotRepeatedElement(arr2));


console.log('#########################################################################################################');
console.log('###', '11. How to find kth smallest element in unsorted array?', '###')
console.log('#########################################################################################################');
/*
  You are given an unsorted array of numbers and k,
  you need to find the kth smallest number in the array.
  For example if given array is {1, 2, 3, 9, 4} and k=2
  then you need to find the 2nd smallest number in the array,
  which is 2. One way to solve this problem is to sort the array in ascending order
  then pick the k-1th element, that would be your kth smallest number in array
  because array index starts at zero, but can you do better?
  Once you are able to solve this array coding question,
  you can solve many similar questions easily e.g. our next question.
*/

function findKthMinElement(arr, k) {
  if (arr.length < k) {
    return 'Elements in array are not enought'
  }

  // 1,2,3,...,k
  var arrayOfMins = [];

  var i = 0;
  while (i<k) {
    arrayOfMins.push( Number.POSITIVE_INFINITY );
    i++;
  }

  for (var i = 0; i < arr.length; i++) {
    if (arrayOfMins[k-1] > arr[i] && k >= 2) {
      arrayOfMins[k-1] = arr[i];
      var minIndex = k-2;
      while (minIndex >= 0) {
        if (arrayOfMins[minIndex] > arrayOfMins[minIndex+1]) {
          var copy = arrayOfMins[minIndex];
          arrayOfMins[minIndex] = arrayOfMins[minIndex+1];
          arrayOfMins[minIndex+1] = copy;
        }
        minIndex--;
      }
    } else if (arrayOfMins[k-1] > arr[i]) {
      arrayOfMins[k-1] = arr[i];
    }
  }
  return arrayOfMins[k-1];
}

arr1 = [16,11,9,7,6,5,3,0,2]
arr2 = [16,11,9,7,6,-5,-7,5,3,0,2]
arr3 = [1,2]

console.log(colorsDictionary[findKthMinElement(arr1,1) === 0]('found 1th smallest number'), findKthMinElement(arr1,1));
console.log(colorsDictionary[findKthMinElement(arr1,3) === 3]('found 3th smallest number'), findKthMinElement(arr1,3));
console.log(colorsDictionary[findKthMinElement(arr2,5) === 3]('found 3th smallest number'), findKthMinElement(arr2,5));
console.log(colorsDictionary[findKthMinElement(arr3,5) === 'Elements in array are not enought']('Elements in array are not enought'), findKthMinElement(arr3,5));


console.log('#########################################################################################################');
console.log('###', 'How to find kth largest element in unsorted array?', '###')
console.log('#########################################################################################################');
/*
  This problem is exactly same as previous question
  with only difference being finding kth largest element instead of kth smallest number.
  For example if given array is {10, 20, 30, 50, 40} and k = 3
  then your program should return 30 because 30 is the 3rd largest number in array.
  You can also solve this problem by sorting the array in decreasing order and picking k-1th element.
*/

function findKthMaxElement(arr, k) {
  if (arr.length < k) {
    return 'Elements in array are not enought'
  }

  // 1,2,3,...,k
  var arrayOfMaxs = [];

  var i = 0;
  while (i<k) {
    arrayOfMaxs.push( Number.NEGATIVE_INFINITY );
    i++;
  }

  for (var i = 0; i < arr.length; i++) {
    if (arrayOfMaxs[k-1] < arr[i] && k>=2) {
      arrayOfMaxs[k-1] = arr[i];
      maxsIndex = k-2;
      while (maxsIndex >= 0) {
        if (arrayOfMaxs[maxsIndex] < arrayOfMaxs[maxsIndex+1]) {
          var copy = arrayOfMaxs[maxsIndex];
          arrayOfMaxs[maxsIndex] = arrayOfMaxs[maxsIndex+1];
          arrayOfMaxs[maxsIndex+1] = copy;
        }
        maxsIndex--;
      }
    } else if (arrayOfMaxs[k-1] < arr[i]) {
      arrayOfMaxs[k-1] = arr[i];
    }
  }
  return arrayOfMaxs[k-1];
}

arr1 = [16,11,9,7,6,5,3,0,2]
arr2 = [16,11,9,7,6,-5,-7,5,3,0,2]
arr3 = [1,2]

console.log(colorsDictionary[findKthMaxElement(arr1,1) === 16]('found 1th largest number'), findKthMaxElement(arr1,1));
console.log(colorsDictionary[findKthMaxElement(arr1,3) === 9]('found 3th largest number'), findKthMaxElement(arr1,3));
console.log(colorsDictionary[findKthMaxElement(arr2,5) === 6]('found 3th largest number'), findKthMaxElement(arr2,5));
console.log(colorsDictionary[findKthMaxElement(arr3,5) === 'Elements in array are not enought']('Elements in array are not enought'), findKthMaxElement(arr3,5));


console.log('#########################################################################################################');
console.log('###', '13. How to find common elements in three sorted array?', '###')
console.log('#########################################################################################################');
/*
  Now we are coming on territory of tough array questions.
  Given three arrays sorted in non-decreasing order, print all common elements in these arrays.

Examples:

input1 = {1, 5, 10, 20, 40, 80}
input2 = {6, 7, 20, 80, 100}
input3 = {3, 4, 15, 20, 30, 70, 80, 120}
Output: 20, 80
*/

function findCommonElements(arr1, arr2, arr3) {
  var dictionary = {},
    res = [];

  for (var i = 0; i < arr1.length; i++) {
    dictionary[ arr1[i] ] = 1;
  }

  for (var i = 0; i < arr2.length; i++) {
    if (dictionary[arr2[i]]) {
      dictionary[arr2[i]]++;
    }
  }

  for (var i = 0; i < arr3.length; i++) {
    if (dictionary[arr3[i]]>=2) {
      res.push( arr3[i] );
    }
  }

  return res;
}

function findCommonElementsV2(arr1,arr2,arr3) {
  // focus that arrays are sorted in non-decreasing order
  var arr1Index = 0;
    arr2Index = 0,
    arr3Index = 0,
    res =[];

  while (arr1Index < arr1.length && arr2Index < arr2.length && arr3Index < arr3.length) {
    // find Max
    var max = Math.max( arr1[arr1Index], arr2[arr2Index], arr3[arr3Index] );

    if (arr1[ arr1Index ] < max) {
      arr1Index++;
    }

    if (arr2[ arr2Index ] < max) {
      arr2Index++;
    }

    if (arr3[ arr3Index ] < max) {
      arr3Index++;
    }

    if (arr1[arr1Index] === arr2[arr2Index] && arr1[arr1Index] === arr3[arr3Index]) {
      res.push( arr1[arr1Index] );
      arr1Index++;
      arr2Index++;
      arr3Index++;
    }
  }

  return res;
}

var arr1 = [1, 5, 10, 20, 40, 80];
var arr2 = [6, 7, 20, 80, 100];
var arr3 = [3, 4, 15, 20, 30, 70, 80, 120];

console.log(colorsDictionary[findCommonElements(arr1,arr2,arr3).toString() === "20,80"]('found common elements'), findCommonElements(arr1,arr2,arr3));
console.log(colorsDictionary[findCommonElementsV2(arr1,arr2,arr3).toString() === "20,80"]('found common elements'), findCommonElementsV2(arr1,arr2,arr3));


console.log('#########################################################################################################');
console.log('###', '14. How find the first repeating element in an array of integers?', '###')
console.log('#########################################################################################################');
/*
  Given an array of integers, find the first repeating element in it.
  We need to find the element that occurs more than once and
  whose index of the first occurrence is smallest.

Examples:

Input:  input [] = {10, 5, 3, 4, 3, 5, 6}
Output: 5 [5 is the first element that repeats]
*/

function findFirstRepeatingElement(arr) {
  var nonRepeatedNums = {},
    repeatingNums = {};

  for (var i = 0; i < arr.length; i++) {
    var currElement = arr[i];
    if (nonRepeatedNums[currElement] >= 0) {
      repeatingNums[currElement] = nonRepeatedNums[currElement];
    } else {
      nonRepeatedNums[currElement] = i;
    }
  }

  var min = Number.POSITIVE_INFINITY;
  Object.keys(repeatingNums).forEach(function(el) {
    if (min > repeatingNums[el]) {
      min = repeatingNums[el];
    }
  })

  return arr[min];
}

var arr1 = [10, 5, 3, 4, 3, 5, 6];

console.log(colorsDictionary[findFirstRepeatingElement(arr1) === 5]('found the first repeating element'), findFirstRepeatingElement(arr1));


console.log('#########################################################################################################');
console.log('###', '15. How to find first non-repeating element in array of integers?', '###')
console.log('#########################################################################################################');
/*
  This array interview question is exactly opposite of previous problem,
  In that you need to find first repeating element
  while in this you need to find first non-repeating element.
  I am sure you can use similar approach to solve this problem,
  just need to consider non repeating element though.
*/

function findFirstNonRepeatingElement(arr) {
  var nonRepeatedNums = {},
    repeatingNums = {};

  for (var i = 0; i < arr.length; i++) {
    var currElement = arr[i];
    if (nonRepeatedNums[currElement] >= 0 || repeatingNums[currElement]) {
      repeatingNums[currElement] = true;
      delete( nonRepeatedNums[currElement] )
    } else {
      nonRepeatedNums[currElement] = i;
    }
  }

  var min = Number.POSITIVE_INFINITY;
  Object.keys(nonRepeatedNums).forEach(function(el) {
    if (min > nonRepeatedNums[el]) {
      min = nonRepeatedNums[el];
    }
  })

  return arr[min];
}

var arr1 = [10, 5, 3, 4, 3, 5, 6];

console.log(colorsDictionary[findFirstNonRepeatingElement(arr1) === 10]('found the first non-repeating element'), findFirstNonRepeatingElement(arr1));


console.log('#########################################################################################################');
console.log('###', '17. How to find the smallest positive integer value that cannot be represented as sum of any subset of a given array?', '###')
console.log('#########################################################################################################');
/*
  This is another tough array question you will see on Amazon, Microsoft or Google.
  You have given a sorted array (sorted in non-decreasing order) of positive numbers,
  find the smallest positive integer value
  that cannot be represented as sum of elements of any subset of given set.
  What makes it more challenging is expected time complexity of O(n).

Examples:

Input: {1, 3, 6, 10, 11, 15};
Output: 2
*/

// You have given a sorted array (sorted in non-decreasing order) of positive numbers
// find the smallest positive integer value
// that cannot be represented as sum of elements of any subset of given set.
function findTheSmallestPositiveNumber(arr) {
  var smallestNum = 1;

  // focus that array is sorted

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= smallestNum) {
      smallestNum = smallestNum + arr[i];
    } else {
      break;
    }
  }

  return smallestNum;
}

var arr1 = [1, 3, 6, 10, 11, 15];
var arr2 = [1,2, 3,4,5, 6, 10, 11, 15];

console.log(colorsDictionary[findTheSmallestPositiveNumber(arr1) === 2]('the smallest positive integer value'), findTheSmallestPositiveNumber(arr1));
console.log(colorsDictionary[findTheSmallestPositiveNumber(arr2) === 58]('the smallest positive integer value'), findTheSmallestPositiveNumber(arr2));


console.log('#########################################################################################################');
console.log('###', '18. How to rearrange array in alternating positive and negative number?', '###')
console.log('#########################################################################################################');
/*
  Given an array of positive and negative numbers,
  arrange them in an alternate fashion such
  that every positive number is followed by negative
  and vice-versa maintaining the order of appearance.

  Number of positive and negative numbers need not be equal.
  If there are more positive numbers they appear at the end of the array.
  If there are more negative numbers, they too appear in the end of the array.
  This is also a difficult array problem to solve
  and you need lot of practice to solve this kind of problems in real interviews,
  especially when you see it first time.
  If you have time constraint then always attempt these kind of questions
  once you are done with easier ones.

Example:

Input: {1, 2, 3, -4, -1, 4}
Output: {-4, 1, -1, 2, 3, 4}

Input: {-5, -2, 5, 2, 4, 7, 1, 8, 0, -8}
output: {-5, 5, -2, 2, -8, 4, 7, 1, 8, 0}
*/

/*
  Time Complexity: O(N)
  Space Complexity: 3*N
*/
function rearrageArray(arr) {
  var posStack = [],
    negStack = [],
    curr = null, prev =null,
    res = [];

  for (var i = arr.length - 1; i >= 0; i--) {
    var el = arr[i];

    if (el < 0) {
      negStack.push(el);
    } else {
      posStack.push(el);
    }
  }

  var prev = negStack.pop();
  res.push(prev);
  while (posStack.length > 0 || negStack.length > 0) {
    if (prev < 0 || negStack.length === 0) {
      curr = posStack.pop()
    } else if (prev >= 0 || posStack.length === 0) {
      curr = negStack.pop();
    }
    res.push( curr );
    prev = curr;
  }

  return res;
}

var arr1 = [1, 2, 3, -4, -1, 4];
var arr2 = [-5, -2, 5, 2, 4, 7, 1, 8, 0, -8];

var rearragedArr1 = rearrageArray(arr1).toString();
var rearragedArr2 = rearrageArray(arr2).toString();

console.log(colorsDictionary[rearragedArr1 === [-4, 1, -1, 2, 3, 4].toString()]('the array hase rearranged'), rearragedArr1);
console.log(colorsDictionary[rearragedArr2 === [-5, 5, -2, 2, -8, 4, 7, 1, 8, 0].toString()]('the array hase rearranged'), rearragedArr2);


console.log('#########################################################################################################');
console.log('###', '19. How to find if there is a sub array with sum equal to zero?', '###')
console.log('#########################################################################################################');
/*
  There is whole set of array related questions
  which are based upon sub-array or only selective elements of array e.g.
  from some range, this is one of such problem.
  Here you are given an array of positive and negative numbers,
  find if there is a sub-array with 0 sum.

Examples:

Input: {4, 2, -3, 1, 6}
Output: true
There is a sub-array with zero sum from index 1 to 3.
*/

/*
  Time Complexity: effective O(n*logN) between O(N*N)
  Space Complexity: N+1
*/
function findAnySubArrayWithZeroSum(arr) {
  arr.sort(function(a,b) { return a>b; });

  for (var i = 0; i < arr.length; i++) {
    var currSum = arr[i];

    var j = i+1;
    while (currSum < 0) {
      currSum = currSum + arr[j];
      j++;
    }

    if (currSum === 0) {
      return true;
    }
  }

  return false;
}

var arr1 = [4, 2, -3, 1, 6];
var arr2 = [4, 2, -3, 2, 6];

console.log(colorsDictionary[findAnySubArrayWithZeroSum(arr1) === true]('Found sub array with sum equal to zero'));
console.log(colorsDictionary[findAnySubArrayWithZeroSum(arr2) === false]('Not found sub array with sum equal to zero'));


console.log('#########################################################################################################');
console.log('###', '22. How to merge sorted array?', '###')
console.log('#########################################################################################################');
/*
  Given two sorted integer arrays A and B, merge B into A as one sorted array.
  You may assume that A has enough space (size that is greater or equal to m + n)
  to hold additional elements from B.
  The number of elements initialized in A and B are m and n respectively.
  This is another intermediate array coding question,
  its not as simple as previous one but neither very difficult.
*/

/*
  Time Complexity: effective O(n*logN) between O(N*N)
  Space Complexity: N+1
*/
function mergeSortedArray(arr1,arr2) {
  var res = [],
    arr1Index=0,
    arr2Index=0;

  while (arr1Index < arr1.length || arr2Index < arr2.length) {
    var arr1CurrElement = arr1[arr1Index],
      arr2CurrElement = arr2[arr2Index];
    if (arr1CurrElement < arr2CurrElement || arr2Index >= arr2.length) {
      res.push( arr1CurrElement );
      arr1Index++;
    } else if (arr1CurrElement >= arr2CurrElement || arr1Index >= arr1.length) {
      res.push( arr2CurrElement );
      arr2Index++;
    }
  }
  return res;
}

var arr1 = [-1,2,5,7,19];
var arr2 = [-3,-2,0,6,17,22,45];

console.log(colorsDictionary[mergeSortedArray(arr1, arr2).toString() === [-3,-2,-1,0,2,5,6,7,17,19,22,45].toString()]('Merged Two sorted arrays'));


console.log('#########################################################################################################');
console.log('###', '23. How to find sub array with maximum sum in an array of positive and negative number? ', '###')
console.log('#########################################################################################################');
/*
  Another array coding question based upon sub-array.
  Here you have to find the contiguous sub-array within an array (containing at least one number)
  which has the largest sum.

For example, given the array [−2,1,−3,4,−1,2,1,−5,4],
the contiguous subarray [4,−1,2,1] has the largest sum = 6.
*/

/*
  Time Complexity: effective O(N*N) between O(N*N)
  Space Complexity: N+1
*/
function findContiguousSubArrayWithMaxSum(arr) {
  var globalStore = [], //[startIndex, endIndexWithMaxSum]
    max = Number.NEGATIVE_INFINITY,
    currSum = 0;

  for (var i = 0; i < arr.length; i++) {
    currSum = arr[i];
    if (max < currSum) {
      max = currSum;
      globalStore = [i,i];
    }

    var j = i + 1;
    while (j<arr.length) {
      currSum = currSum + arr[j];
      if (max < currSum) {
        max = currSum;
        globalStore = [i,j]; //need to imclude j element in result call j+1
      }
      j++;
    }
  }
  return arr.slice(globalStore[0], globalStore[1]+1);
}

var arr1 = [-2,1,-3,4,-1,2,1,-5,4];

console.log(colorsDictionary[findContiguousSubArrayWithMaxSum(arr1).toString() === [[4,-1,2,1]].toString()]('Found sub array with maximum sum'));


console.log('#########################################################################################################');
console.log('###', '25. Write a program to find length of longest consecutive sequence in array of integers?', '###')
console.log('#########################################################################################################');
/*
  Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

For example,
Given [100, 4, 200, 1, 3, 2],
The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.

Challenging part of this question is that your algorithm should run in O(n) complexity.
*/

/*
  Time Complexity: O(N)
  Space Complexity: 3*N
*/
function findLongestConsecutiveSequence(arr) {
  var dictionary = {},
    localMax = 0,
    max = 0;

  for (var i = 0; i < arr.length; i++) {
    dictionary[arr[i]] = true;
  }

  var sequences = Object.keys(dictionary);
  var prev = sequences[0];

  for (var i = 1; i < sequences.length; i++) {
    var curr = sequences[i];

    if (parseInt(curr,10) === parseInt(prev,10) + 1) {
      localMax++;
      if (max < localMax) {
        max = localMax;
      }
    } else {
      localMax = 0;
    }
    prev = curr;
  }

  return max + 1; // because we start from 0
}

var arr1 = [100, 4, 200, 1, 3, 2];
console.log(colorsDictionary[findLongestConsecutiveSequence(arr1) === 4]('Found length of longest consecutive sequence'), findLongestConsecutiveSequence(arr1));

