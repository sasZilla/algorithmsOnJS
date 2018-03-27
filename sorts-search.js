//npm install colors
var colors = require('colors/safe');

var colorsDictionary = {
  true: colors.green,
  false: colors.red
}

console.log('################################################');
console.log('###', 'Quick Sort', '###');
console.log('################################################');

/*
  Step-1: You have to pick a pivot.
    This could be randomly selected or the middle one.
    Here we select the last element of the array.

  Step-2: Put all the items smaller than the pivot value to the left
    and larger than the pivot value to the right.

  Step-3:Repeat the step-2 for both left
  and right side of the pivot (pick a pivot, put all item smaller
  than the pivot to the left and larger on the right)
*/

function quickSort(arr, left, right) {
  var pivot = right,
    partitionIndex=0;
  if (left < right) {
    pivot = right;
    partitionIndex = partition(arr, pivot, left, right)

    quickSort(arr, left, partitionIndex - 1);
    quickSort(arr, partitionIndex + 1, right)
  }
  return arr;
}

function partition(arr, pivot, left, right) {
  var partitionIndex = left,
    pivotValue = arr[pivot];
  // pivot - index
  for (var i = left; i < right; i++) {
    if (arr[i] < pivotValue) {
      swap(arr, i, partitionIndex);
      partitionIndex++;
    }
  }
  swap(arr,right, partitionIndex);
  return partitionIndex;
}

function swap(arr,i,j) {
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


console.log('################################################');
console.log('###', 'Merge Sort', '###');
console.log('################################################');

/*
  MergeSort is a Divide and Conquer algorithm.
  It divides input array in two halves,
  calls itself for the two halves and then merges the two sorted halves.
  The merge() function is used for merging two halves.
  The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r]
  are sorted and merges the two sorted sub-arrays into one.
  See following C implementation for details.
  MergeSort(arr[], l,  r)
  If r > l
     1. Find the middle point to divide the array into two halves:
             middle m = (l+r)/2
     2. Call mergeSort for first half:
             Call mergeSort(arr, l, m)
     3. Call mergeSort for second half:
             Call mergeSort(arr, m+1, r)
     4. Merge the two halves sorted in step 2 and 3:
             Call merge(arr, l, m, r)
*/

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var middle = Math.floor(arr.length / 2),
    left = arr.slice(0,middle),
    right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(arr1, arr2) {
  var i = 0,
    j = 0,
    sortedPart = [];
  while (i < arr1.length || j < arr2.length) {
    if (arr1[i] > arr2[j] || i >= arr1.length) {
      sortedPart.push(arr2[j]);
      j++;
    } else if (arr1[i] < arr2[j] || j >= arr2.length) {
      sortedPart.push(arr1[i]);
      i++;
    }
  }
  return sortedPart;
}


arr1 = [11,8,14,3,6,2,7] // 0,7
arr2 = [11,8,14,3,6,2,1, 7] // 0,8
arr3 = [16,11,9,7,6,5,3, 2] //0,8

console.log(colorsDictionary[mergeSort(arr1).toString() === [2, 3, 6, 7, 8, 11, 14].toString()](mergeSort(arr1).toString() + ' was sorded fine'));
console.log(colorsDictionary[mergeSort(arr2).toString() === [1, 2, 3, 6, 7, 8, 11, 14].toString()](mergeSort(arr2).toString() + ' was sorded fine'));
console.log(colorsDictionary[mergeSort(arr3).toString() === [2, 3, 5, 6, 7, 9, 11, 16].toString()](mergeSort(arr3).toString() + ' was sorded fine'));

console.log('################################################');
console.log('###', 'Binary Search', '###');
console.log('################################################');

/*
  Given a sorted array arr[] of n elements, write a function to search a given element x in arr[].
  A simple approach is to do linear search.
  The time complexity of above algorithm is O(n).
  Another approach to perform the same task is using Binary Search.
  Binary Search: Search a sorted array by repeatedly dividing the search interval in half.
  Begin with an interval covering the whole array.
  If the value of the search key is less than the item in the middle of the interval,
  narrow the interval to the lower half. Otherwise narrow it to the upper half.
  Repeatedly check until the value is found or the interval is empty.

  The idea of binary search is to use the information that the array is sorted
  and reduce the time complexity to O(Logn).

Compare x with the middle element.
If x matches with middle element, we return the mid index.
Else If x is greater than the mid element, then x can only lie in right half subarray
after the mid element. So we recur for right half.
Else (x is smaller) recur for the left half.
*/

function binarySearchRecursive(arr, num, l, r) {
  if (l<=r) {
    var mid = Math.floor(l + (r-l)/ 2);
    var midVal = arr[mid];

    if (midVal === num) {
      return mid;
    }
    if (midVal > num) {
      return binarySearchRecursive(arr, num, l, mid-1);
    }
    if (midVal < num) {
      return binarySearchRecursive(arr, num, mid+1, r);
    }
  }

  return -1;
}

function binarySearchIterative(arr, num) {
  var left = 0,
    right = arr.length-1,
    mid;

  while (left <= right) {
    mid = Math.floor(left + (right - left)/2);

    if (arr[mid] === num) {
      return mid;
    }

    // check a[left..mid-1]
    if (arr[mid] > num) {
      right = mid-1;
    }

    // check a[mid+1..right-1]
    if (arr[mid] < num) {
      left = mid+1;
    }
  }

  return -1;
}


arr1 = [1, 2, 3, 6, 7, 8, 11, 14]

console.log(colorsDictionary[binarySearchRecursive(arr1, 6, 0, arr1.length-1) === 3]('6 was found in time logN at 3th position'), binarySearchRecursive(arr1,6, 0, arr1.length-1));
console.log(colorsDictionary[binarySearchRecursive(arr1, 14, 0, arr1.length-1) === 7]('14 was found in time logN at 7th position'), binarySearchRecursive(arr1,14, 0, arr1.length-1));
console.log(colorsDictionary[binarySearchRecursive(arr1, 1, 0, arr1.length-1) === 0]('1 was found in time logN at 0th position'), binarySearchRecursive(arr1,1, 0, arr1.length-1));
console.log(colorsDictionary[binarySearchRecursive(arr1, 11, 0, arr1.length-1) === 6]('11 was found in time logN at 6th position'), binarySearchRecursive(arr1,11, 0, arr1.length-1));
console.log(colorsDictionary[binarySearchRecursive(arr1, 111, 0, arr1.length-1) === -1]('111 wasn\'t found'), binarySearchRecursive(arr1,111));

console.log(colorsDictionary[binarySearchIterative(arr1, 6) === 3]('6 was found in time logN at 3th position'), binarySearchIterative(arr1,6));
console.log(colorsDictionary[binarySearchIterative(arr1, 14) === 7]('14 was found in time logN at 7th position'), binarySearchIterative(arr1,14));
console.log(colorsDictionary[binarySearchIterative(arr1, 1) === 0]('1 was found in time logN at 0th position'), binarySearchIterative(arr1,1));
console.log(colorsDictionary[binarySearchIterative(arr1, 11) === 6]('11 was found in time logN at 6th position'), binarySearchIterative(arr1,11));
console.log(colorsDictionary[binarySearchIterative(arr1, 111) === -1]('111 wasn\'t found'), binarySearchIterative(arr1,111));


console.log('################################################');
console.log('###', 'Given a sorted array and a number x, find the pair in array whose sum is closest to x', '###');
console.log('################################################');

/*
  Given a sorted array and a number x, find a pair in array whose sum is closest to x.
Examples:
Input: arr[] = {10, 22, 28, 29, 30, 40}, x = 54
Output: 22 and 30

Input: arr[] = {1, 3, 4, 7, 10}, x = 15
Output: 4 and 10
A simple solution is to consider every pair and keep track of closest pair
(absolute difference between pair sum and x is minimum).
Finally print the closest pair. Time complexity of this solution is O(n2)
An efficient solution can find the pair in O(n) time.

1) Initialize a variable diff as infinite (Diff is used to store the
   difference between pair and x).  We need to find the minimum diff.
2) Initialize two index variables l and r in the given sorted array.
       (a) Initialize first to the leftmost index:  l = 0
       (b) Initialize second  the rightmost index:  r = n-1
3) Loop while l < r.
       (a) If  abs(arr[l] + arr[r] - sum) < diff  then
           update diff and result
       (b) Else if(arr[l] + arr[r] <  sum )  then l++
       (c) Else r--
*/

function findPairWithClosestSum(arr, num) {
  // focus that array is sorted;

  var diff = Number.POSITIVE_INFINITY,
    l = 0, r = arr.length - 1,
    res = [];

  while (l<r) {
    var currSumm = arr[l] + arr[r];
    if (Math.abs(currSumm - num) < diff) {
      diff = Math.abs(currSumm - num);
      res = [arr[l], arr[r]];
    } if (currSumm < num) {
      l++;
    } else {
      r--;
    }
  }

  return res;
}


var arr1 = [1, 3, 4, 7, 10], x1 = 15
var arr2 = [10, 22, 28, 29, 30, 40], x2= 54

console.log(colorsDictionary[findPairWithClosestSum(arr1, x1).toString() === "4,10"]('Found the pair in array whose sum is closest to 15'), findPairWithClosestSum(arr1, x1));
console.log(colorsDictionary[findPairWithClosestSum(arr2, x2).toString() === "22,30"]('Found the pair in array whose sum is closest to 54'), findPairWithClosestSum(arr2, x2));

