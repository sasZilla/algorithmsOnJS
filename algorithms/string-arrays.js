/*
  Reverse an array without affecting special characters
  Given a string, that contains special character together with alphabets (‘a’ to ‘z’ and ‘A’ to ‘Z’), reverse the string in a way that special characters are not affected.

  Examples:

  Input:   str = "a,b$c"
  Output:  str = "c,b$a"
  Note that $ and , are not moved anywhere.
  Only subsequence "abc" is reversed

  Input:   str = "Ab,c,de!$"
  Output:  str = "ed,c,bA!$"
*/

/*
  1. translate string to array
  2. set left=0, right=str.length - 1
  3. while left < right:
      if str[left] is not a char => left++;
      else if str[right] is not a char => right--;
      else swap( str[left], str[right] );
  4. return str array join('')

  it takes O(N), N - str.length time complexity
*/
export function reverseString(str) {
  let strList = Array.from(str);
  let left = 0;
  let right = strList.length - 1;

  function swap(arr, i, j) {
    let store = arr[i];
    arr[i] = arr[j];
    arr[j] = store;
  }

  function isAlphabet(sym) {
    return sym && sym.match && sym.match(/^[A-Za-z]{1,1}$/ig);
  }

  while (left < right) {
    if (!isAlphabet(strList[left])) {
      left++;
    } else if (!isAlphabet(strList[right])) {
      right--;
    } else {
      swap(strList, left, right);
      left++;
      right--;
    }
  }

  return strList.join('');
}

export function reverseStringWithoutArray(str) {
  const l = str.length;
  for (let i=0;i<l;i++) {
      let copy = str[i];
      str[i] = str[l - i - 1];
      str[l - i - 1] = copy;
  }
  return str;
}

export function isPalindrom(str) {
  return str === reverseString(str);
}

/*
Given a string, print all possible palindromic partitions
Given a string, find all possible palindromic partitions of given string.

Example: nitin

Output :n i t i n
        n iti n
        nitin
================================================================================
The idea:
  1. iterate over str 1..str.length
  2. check if str[i-1] == str[i] => push to container && compare maxLength
  3. check if str[i-1] == str[i+1] => push to container && compare maxLength
Time Complexity O(N^2)
Memory Complexity O(N)
*/
function printAllPalindrom(str) {
  let maxLength = 0;
  let allPalindroms = [];
  const l = str.length;

  for (let i=1;i<l;i++) {
    let low = i - 1;
    let high = i;
    while (low > 0 && high < l && str.charAt(low) === str.charAt(high)) {
      maxLength = Math.max(high - low, maxLength);
      allPlindroms.push( str.slice(low, high + 1) );
      low--;
      high++;
    }

    low = i - 1;
    high = i + 1;
    while (low > 0 && high < l && str.charAt(low) === str.charAt(high)) {
      maxLength = Math.max(high - low, maxLength);
      allPalindoms.push(str.slice(low, high + 1));
      low--;
      high++;
    }
  }

  // to print all palindoms just uncomment this
  // allPalindoms.map(console.log);
  return maxLength;
}


/*
  Count triplets with sum smaller than a given value
  Given an array of distinct integers and a sum value.
  Find count of triplets with sum smaller than given sum value.
  Expected Time Complexity is O(n2).

  Examples:

  Input : arr[] = {-2, 0, 1, 3}
          sum = 2.
  Output : 2
  Explanation :  Below are triplets with sum less than 2
                 (-2, 0, 1) and (-2, 0, 3)

  Input : arr[] = {5, 1, 3, 4, 7}
          sum = 12.
  Output : 4
  Explanation :  Below are triplets with sum less than 4
                 (1, 3, 4), (1, 3, 5), (1, 3, 7) and
                 (1, 4, 5)
================================================================================
1. Bruteforce solution:
  Use 3 cicles and check if arr[i] + arr[j] + arr[k] < sum:
    count++
Time Complexity: O(N^3)

2. Efficient solution:
  1) Sort Array
  2) Initialize result as 0
  3) Run a loop from i=0 to N-3
    a) Initialize two other elements as corner
      arr[left] and arr[right] as left=i+1 and right=n-1
    b) Move left and right toward to each other until they meet while (left < right)
      I) if arr[left] + arr[right] > sum - arr[i]
        right--;
      II) For current i and left we have only right - left triplets
        else do result += right - left
          left++
Time Complexity O(N^2)
Memory Compexity O(1)
*/

function countTriplesOn3(arr, sum) {
  // countCouples(arr,sum)
  var count = 0;
  for (var i=0;i<arr.length-2;i++) {
    for (var j=i+1;j<arr.length-1;j++) {
      for (var k=j+1;k<arr.length;k++) {
        if (arr[i] + arr[j] + arr[k] < sum) {
          count++;
        }
      }
    }
  }
  return count;
}

export function countTriplesOn2(arr, sum) {
  const l = arr.length;

  // 1. Initialize result as 0
  let triplesCount = 0;

  // 2. sort array O(N*logN)
  arr.sort((a,b) => a-b);

  // 3. run loop from i=0 to N-3
  for (let i=0;i<l-2;i++) {
    // Initialize left=i+1 right=N-1
    let left = i + 1;
    let right = l - 1;
    // Move left and right toward until they meet
    while (left < right) {
      // Decrement right if sum of trible less than sum
      if (arr[left] + arr[right] + arr[i] >= sum) {
        right--;

      // for current i and left we have only right - left triples
      } else {
        triplesCount += (right - left);
        left++;
      }
    }
  }

  return triplesCount;
}

/*
 Count couples with sum smaller than a given value
=================
1. O(N*LogN)
  1) sort array
  2) Initialize i=0, j=N-1
  3) Move i,j toward until they meet (while i<j)
    I) if arr[i] + arr[j] >= sum
      j--;
    II) else
      for current i,j we have j - i couples
      result += j - i
      i++
*/
export function countCouplesOnLogN(a, sum) {
  let couplesCount = 0;
  let i = 0;
  let j = a.length - 1;

  a.sort((a,b) => a-b);

  while (i < j) {
    if (a[i] + a[j] >= sum) {
      j--;
    } else {
      couplesCount += j - i;
      i++;
    }
  }

  return couplesCount;
}

/*
  Convert array into Zig-Zag fashion
  Given an array of distinct elements, rearrange the elements of array in zig-zag fashion in O(n) time.
  The converted array should be in form a < b > c < d > e < f.

  Example:
  Input:  arr[] = {4, 3, 7, 8, 6, 2, 1}
  Output: arr[] = {3, 7, 4, 8, 2, 6, 1}

  Input:  arr[] =  {1, 4, 3, 2}
  Output: arr[] =  {1, 4, 2, 3}
================================================================================
1. O(N*LogN)
  1) sort Array
  2) keep A[0], switch A[1] and A[2]
  3) switch A[3] and A[4] ...

2. O(N)
  1) Initialize indicator to check ZigZag value was more/less
    start with < (indicator === false)
  2) Compare two item A[i] and A[i+1]
    !indicator => A[i] should be < then A[i+1]
    indicator => A[i] should be > then A[i+1]
  3) swap element regarding to condition
*/

export function zigZagFunction(arr) {
  if (!arr || !arr.length || arr.length <= 2) return arr;

  function swap(a, i, j) {
    let store = a[i];
    a[i] = a[j];
    a[j] = store;
  }

  let signIndicator = true;
  const l = arr.length;
  for (let i=0;i<l-1;i++) {
    if (signIndicator) {
      if (arr[i] > arr[i+1]) {
        swap(arr, i, i+1);
      }
    } else {
      if (arr[i] < arr[i+1]) {
        swap(arr, i, i+1);
      }
    }
    signIndicator = !signIndicator;
  }
  return arr;
}

/*
  Generate all possible sorted arrays from alternate elements of two given sorted arrays
  Given two sorted arrays A and B, generate all possible arrays such that
  first element is taken from A then from B then from A and so on
  in increasing order till the arrays exhausted.
  The generated arrays should end with an element from B.

  For Example
  A = {10, 15, 25}
  B = {1, 5, 20, 30}

  The resulting arrays are:
    10 20
    10 20 25 30
    10 30
    15 20
    15 20 25 30
    15 30
    25 30
================================================================================
*/

function generaUtil(a,b,c,k,j,m,n,len,flag) {
  // flag - means we stay on 'a' array
  if (flag) {
    if (len) {
      console.log('======Start========')
      console.log( c.slice(0,len+1).toString() );
      console.log('======End========')
    }

    for (var i = k; i < m; i++) {

      // for first case
      if (!len) {
        c[len] = a[i];

        // don't increment lem as B is included yet
        generaUtil(a,b,c,i+1,j,m,n,len,!flag);
      } else {
        if (a[i] > c[len]) {
          c[len+1] = a[i];
          generaUtil(a,b,c,i+1,j,m,n,len+1,!flag);
        }
      }
    }
  } else {
    for (var i = j; i < n; i++) {
      if (b[i] > c[len]) {
        c[len+1] = b[i];
        generaUtil(a,b,c,k,i+1,m,n,len+1,!flag);
      }
    }
  }
}

function generate(a, b) {
  var c = [],
    k=0,j=0,
    m=a.length,n=b.length,
    len = 0,
    flag = true;
  generaUtil(a,b,c,k,j,m,n,len,flag);
}
//
//
// arr1 = [10, 15, 25]
// arr2 = [1, 5, 20, 30]
//
// console.log( '[10, 15, 25], [1, 5, 20, 30]')
// generate(arr1, arr2);
// // throw new Error("Something went badly wrong!");

/*
  Pythagorean Triplet in an array
  Given an array of integers, write a function that returns true
  if there is a triplet (a, b, c) that satisfies a2 + b2 = c2.

  Example:

  Input: arr[] = {3, 1, 4, 6, 5}
  Output: True
  There is a Pythagorean triplet (3, 4, 5).

  Input: arr[] = {10, 4, 6, 12, 5}
  Output: False
  There is no Pythagorean triplet.
==================================
1. Bruteforce solution O(N^3)
  Run 3 loops and check if a[i]^2 + a[j]^2 === a[k]^2
2. Efficient solution O(N^2)
  1) Make each element in array as square element O(N)
  2) Sort array O(N*LogN)
  3) Now we need to find a,b,c as a + b = c
    I) Mark element c as a[n-1]
    II) find pair in subarray (a,b) as a + b === c O(N)
      - Use hash table with compliments as h[c - a] = a
      - Or a as first index, b as last index and move elements toward together
        until meet
    III) if not found reduce index of c as a[n-2]
    IV) repeat until c index > 1 a[2] - last index for c
*/

export function pythagoreanTripletOn2(arr) {
  if (!arr || !arr.length || arr.length < 3) return false;

  arr.map((el, i) => arr[i] = Math.pow(el, 2));
  arr.sort((a,b) => a-b);

  for (let i=arr.length-1;i>1;i--) {
    let c = arr[i];
    let j = 0;
    let k = i-1;
    while (j < k) {
      let sum = arr[j] + arr[k];
      if (sum > c) {
        k--;
      } else if (sum < c) {
        j++;
      } else {
        return true;
      }
    }
  }
  return false;
}

/*
  Length of the largest subarray with contiguous elements
  Given an array of distinct integers, find length of the longest subarray
  which contains numbers that can be arranged in a continuous sequence.

  Examples:

  Input:  arr[] = {10, 12, 11};
  Output: Length of the longest contiguous subarray is 3

  Input:  arr[] = {14, 12, 11, 20};
  Output: Length of the longest contiguous subarray is 2

  Input:  arr[] = {1, 56, 58, 57, 90, 92, 94, 93, 91, 45};
  Output: Length of the longest contiguous subarray is 5
======================================================================
1. BruteForce solution O(N^3)
  - init maxLength = 0
  - get first element
  - currLength = 0
  - while find element + 1
    element = element + 1
    currLength++;
    maxLength = Math.max(maxLength, )
  - repeat with next index until end of array
  - return maxLength

2. Efficient Using Sort O(N*LogN)
  - sort array
  - init maxLength = 0
  - init currLength = 1
  - run loop from i=1 to n
    if a[i] > a[i-1]: currLength++;
    else: currLength = 1;
    maxLength = Math.max(maxLength, currLength);
  - return maxLength

3. Get Max, Min and run through the range O(N^2)
*/

export function findLongestSubarrayLength(arr) {
  if (!arr || !arr.length) return 0;
  if (arr.length === 1) return 1;

  arr.sort((a,b) => a-b);

  const len = arr.length;
  let maxLength = 0;
  let currLength = 1;
  for (let i=1;i<len;i++) {
    if (arr[i] - arr[i-1] === 1) {
      currLength++;
    } else {
      currLength = 1;
    }
    maxLength = Math.max(maxLength, currLength);
  }
  return maxLength;
}

/*
  Find the smallest positive integer value that cannot be represented
  as sum of any subset of a given array
  Given a sorted array (sorted in non-decreasing order) of positive numbers,
  find the smallest positive integer value that cannot be represented
  as sum of elements of any subset of given set.
  Expected time complexity is O(n).

  Examples:

  Input:  arr[] = {1, 3, 6, 10, 11, 15};
  Output: 2

  Input:  arr[] = {1, 1, 1, 1};
  Output: 5

  Input:  arr[] = {1, 1, 3, 4};
  Output: 10

  Input:  arr[] = {1, 2, 5, 10, 20, 40};
  Output: 4

  Input:  arr[] = {1, 2, 3, 4, 5, 6};
  Output: 22
===================================
1. O(N)
  - Initialize result = 1
  - Run loop from i=0 to N
    I) if a[i] <= result: result += a[i]
      here we try to find gap between presented sum and next big element
  - return result (Why we can do this?)
    the idea after we calculate all items or find a gap
    we just add 1 and it will be min
*/

export function findSmallestInteger(arr) {
  if (!arr || !arr.length) return 0;

  let sum = 1;
  for (let i=0;i<arr.length;i++) {
    if (arr[i] <= sum) {
      sum += arr[i];
    }
  }

  return sum;
}

/*
  Smallest subarray with sum greater than a given value
  Given an array of integers and a number x, find the smallest subarray with sum greater than the given value.

  Examples:
  arr[] = {1, 4, 45, 6, 0, 19}
     x  =  51
  Output: 3
  Minimum length subarray is {4, 45, 6}

  arr[] = {1, 10, 5, 2, 7}
     x  = 9
  Output: 1
  Minimum length subarray is {10}

  arr[] = {1, 11, 100, 1, 0, 200, 3, 2, 1, 250}
      x = 280
  Output: 4
  Minimum length subarray is {100, 1, 0, 200}
==========
Given:
  - array of integers (-Infinity ... +Infinity)
  - number x (-Infinity ... +Infinity)
  - find smallest subarray with sum > x
  - what should return? min length
  - is array sorted? No
  - Min elements? 1
  - What will return if not found? []
  - Subarray shouldn't be a subset it should be sublist
  - cant sort
==========
1. BruteForce solution O(N^2)
  - Initialize maxLength = 0
  - initialize currLength = 0
  - Run loop from i=0 to N-2
    - currSum = a[i]
    - curLength = 1
    - check if currSum > x: return 1 // we don't need to wait it's the minimum possible
    - Run loop from j=i+1 to N-1
      currSum += a[j]
      curLength++
      - if currSum > x: break;
    - maxLength = Math.max(maxLength, currLength)

2. Use tricky neseted loops O(N)
  - Initialize start=end=0, minLen = n
  - Create first loop while (end < n)
    - Create initial sum that we'll reduce in future:
      sum = 0
      while (sum <= x && end < n):
        sum += a[end]
        end++

    - now reduce sum, cutting elements from begining
      while (sum > x && start < n):
        if end - start < minLen: minLen = end - start
        sum -= a[start]
        start++
  - return minLen
*/

export function findSmallestSubarray(arr, target) {
  if (!arr || !arr.length) return 0;

  let start = 0;
  let end = 0;
  let len = arr.length
  let minLen = len;

  while (end < len) {
    let sum = 0;
    while (sum <= target && end < len) {
      sum += arr[end];
      end++;
    }

    while (start < end && sum > target) {
      if (minLen > end - start) {
        minLen = end - start;
      }
      sum -= arr[start];
      start++;
    }
  }

  return minLen;
}

function findSmallestSubarrayOn2(arr, num) {
  var sum = 0,
    j,
    storage = [];

  for (var i = 0; i < arr.length; i++) {
    j = i + 1;
    sum = arr[i];
    while (j < arr.length && sum <= num) {
      sum += arr[j];
      j++;
    }
    if (sum > num) {
      storage.push(j - i); // start element
    }
  }
  return Math.min.apply(null, storage);
}

function findSmallestSubarrayOn2V2(arr, num) {
  var sum = 0,
    minLen = arr.length+1;

  for (var start = 0; start < arr.length; start++) {
    sum = arr[start];

    if (sum > num) {
      return 1;
    }

    for (var end = start+1; end < arr.length; end++) {
      sum += arr[end];

      // If sum becomes more than x and length of
      // this subarray is smaller than current smallest
      // length, update the smallest length (or result)
      //  + 1 we need to get real length of subarray
      if (sum > num && ((end - start + 1) < minLen)) {
        minLen = end - start + 1;
      }
    }
  }
  return minLen;
}

/*
  Find subarray with given sum | Set 1 (Nonnegative Numbers)
  Given an unsorted array of nonnegative integers, find a continous subarray which adds to a given number.

  Examples:

  Input: arr[] = {1, 4, 20, 3, 10, 5}, sum = 33
  Ouptut: Sum found between indexes 2 and 4

  Input: arr[] = {1, 4, 0, 0, 3, 10, 5}, sum = 7
  Ouptut: Sum found between indexes 1 and 4

  Input: arr[] = {1, 4}, sum = 0
  Output: No subarray found
==========
Given:
  - Target SUM
  - UNSORTED array
  - Array contains ONLY nonnegative integers
  - find ANY continous subarray that's add to given sum
  - Output should be "Sum found between indexes 1 and 4" or "No subarray found"
===========
1.
*/
//
// function findSubarryWithGivenSumV1(arr, sum) {
//   var currSum = 0;
//   for (var start = 0; start < arr.length; start++) {
//     currSum = arr[start];
//     if (currSum === sum) {
//       return 'Sum found between indexes %s and %s'.replace(/%s/ig, start);
//     }
//     for (var end = start+1; end < arr.length; end++) {
//       currSum += arr[end];
//       if (currSum === sum) {
//         return 'Sum found between indexes %s and %s'.replace(/%s/, start).replace(/%s/, end);
//       }
//     }
//   }
//   return 'No subarray found';
// }
//
// function findSubarryWithGivenSumV2(arr, sum) {
//   var len = arr.length,
//     currSum = arr[0],
//     start = 0;
//
//   // why we use end <= len ?
//   // to use last arr element as start index
//   for (var end = 1; end <= len; end++) {
//
//     // why we use start < end-1 ?
//     // max end = arr.length -> max start arr.length-1(last arr element)
//     while (start < end-1 && currSum > sum) {
//       currSum = currSum - arr[start];
//       start++;
//     }
//
//     if (currSum === sum) {
//       //  why we use end-1
//       // because end - its next added index
//       // elem with end index hasn't added to currSum yet
//       return 'Sum found between indexes %s and %s'.replace(/%s/, start).replace(/%s/, end-1);
//     }
//
//     if (end < len) {
//       currSum = currSum + arr[end];
//     }
//   }
//
//   return 'No subarray found';
// }
//
// arr1 = [1, 4, 20, 3, 10, 5];
// arr2 = [1, 4, 0, 0, 3, 10, 57];
// arr3 = [1, 4];
//
// console.log( arr1.join(', '), ' sum = 33 : ', findSubarryWithGivenSumV1(arr1, 33) === 'Sum found between indexes 2 and 4')
// console.log( arr2.join(', '), ' sum = 7 : ', findSubarryWithGivenSumV1(arr2, 7) === 'Sum found between indexes 1 and 4')
// console.log( arr3.join(', '), ' sum = 0 : ', findSubarryWithGivenSumV1(arr3, 0) === 'No subarray found')
//
// console.log( arr1.join(', '), ' sum = 33 : ', findSubarryWithGivenSumV2(arr1, 33) === 'Sum found between indexes 2 and 4')
// console.log( arr2.join(', '), ' sum = 7 : ', findSubarryWithGivenSumV2(arr2, 7) === 'Sum found between indexes 1 and 4')
// console.log( arr3.join(', '), ' sum = 0 : ', findSubarryWithGivenSumV2(arr3, 0) === 'No subarray found')
