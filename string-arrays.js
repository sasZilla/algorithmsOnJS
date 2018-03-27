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

function reverseString(str) {
  var strToArr = str.split(''),
    leftIndex=0,
    rightIndex = strToArr.length-1;

  while (leftIndex < rightIndex) {
    if (!strToArr[ leftIndex ].match(/[a-zA-Z]/)) {
      leftIndex++;
    } else if (!strToArr[ rightIndex ].match(/[a-zA-Z]/)) {
      rightIndex--;
    } else {
      var copy = strToArr[leftIndex]
      strToArr[leftIndex] = strToArr[rightIndex];
      strToArr[rightIndex] = copy;

      leftIndex++;
      rightIndex--;
    }
  }
  return strToArr.join('');
}

var str = "a,b$c"
console.log('should be "c,b$a" - ', reverseString(str));

var str = "Ab,c,de!$"
console.log('should be "ed,c,bA!$" - ', reverseString(str));

var str = "A!b,c,de!$"
console.log('should be "e!d,c,bA!$" - ', reverseString(str));

/*
Given a string, print all possible palindromic partitions
Given a string, find all possible palindromic partitions of given string.

Example: nitin

Output :n i t i n
        n iti n
        nitin
*/

function reverse(str) {
  var len = str.length;
  for (var i=0;i<len;i++) {
    var copy = str[i];
    str[i] = str[len-i-1];
    str[len-i-1] = copy;
  }
  return str;
}

console.log('################################################');
console.log('###', 'Given a string, print all possible palindromic partitions', '###');
console.log('################################################');

function isPalindrom(str) {
  return str === reverse(str);
}

function printAllPalindrom(str) {

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
*/

console.log('################################################');
console.log('###', 'Count triplets with sum smaller than a given value', '###');
console.log('################################################');


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

/*
  An Efficient Solution can count triplets in O(n2) by sorting the array first, and then using method 1 of this post in a loop.

  1) Sort the input array in increasing order.
  2) Initialize result as 0.
  3) Run a loop from i = 0 to n-2.  An iteration of this loop finds all
     triplets with arr[i] as first element.
       a) Initialize other two elements as corner elements of subarray
          arr[i+1..n-1], i.e., j = i+1 and k = n-1
       b) Move j and k toward each other until they meet, i.e., while (j < k)
              (i) if (arr[i] + arr[j] + arr[k] >= sum), then do k--

              // Else for current i and j, there can (k-j) possible third elements
              // that satisfy the constraint.
              (ii) Else Do ans += (k - j) followed by j++
*/

function countTriplesOn2(arr, sum) {
  // countCouples(arr,sum)
  // O(n*n) worst, O(n*log(n)) - best
  arr.sort(function(a,b) {return a>b;});

  var count = 0,
    len = arr.length;
  for (var i=0;i<len-2;i++) {
    j = i + 1;
    k = len - 1;

    while (j < k) {
      if (arr[i] + arr[j] + arr[k] >= sum) {
        k--;
      } else {
        count += k - j;
        j++;
      }
    }
  }
  return count;
}


function countCouples(a, sum) {
  a.sort();

  var i = 0,
    j = a.length - 1,
    res = 0;

  while (i < j) {
    if (a[i] + a[j] >= sum) {
      j--;
    } else {
      res += j - i;
      i++;
    }
  }
  return res;
}

arr1 = [-2, 0, 1, 3]
arr2 = [5, 1, 3, 4, 7]

console.log( '[-2, 0, 1, 3] couples less then 2: ', countCouples(arr1, 2) === 4, countCouples(arr1, 2) )
console.log( '[5, 1, 3, 4, 7] couples less then 12: ', countCouples(arr2, 12) === 9, countCouples(arr2, 12) )

console.log( '[-2, 0, 1, 3] triples less then 2: ', countTriplesOn3(arr1, 2) === 2 )
console.log( '[5, 1, 3, 4, 7] triples less then 12: ', countTriplesOn3(arr2, 12) === 4 )

console.log( '[-2, 0, 1, 3] triples less then 2: ', countTriplesOn2(arr1, 2) === 2 )
console.log( '[5, 1, 3, 4, 7] triples less then 12: ', countTriplesOn2(arr2, 12) === 4 )



/*
  Convert array into Zig-Zag fashion
  Given an array of distinct elements, rearrange the elements of array in zig-zag fashion in O(n) time.
  The converted array should be in form a < b > c < d > e < f.

  Example:
  Input:  arr[] = {4, 3, 7, 8, 6, 2, 1}
  Output: arr[] = {3, 7, 4, 8, 2, 6, 1}

  Input:  arr[] =  {1, 4, 3, 2}
  Output: arr[] =  {1, 4, 2, 3}
*/

function zigZagFashion(arr) {
  // < arr[i] > arr[i+1] < arr[i+2] >
  var indicator = false; //< == 0, > == 1
  for (var i=0;i<arr.length-1;i++) {
    if ((arr[i] > arr[i+1] && indicator === false) || (arr[i] < arr[i+1] && indicator === true)) {
      var copy = arr[i];
      arr[i] = arr[i+1];
      arr[i+1] = copy; // do not forget, that this is "COPY", because arr[i] has already rewrited
    }
    indicator = !indicator;
  }
  return arr;
}


arr1 = [4, 3, 7, 8, 6, 2, 1]
arr2 = [1, 4, 3, 2]

console.log( '[4, 3, 7, 8, 6, 2, 1] -> [3, 7, 4, 8, 2, 6, 1]', zigZagFashion(arr1).toString() === [3, 7, 4, 8, 2, 6, 1].toString(), zigZagFashion(arr1))
console.log( '[1, 4, 3, 2] -> [1, 4, 2, 3]', zigZagFashion(arr2).toString() === [1, 4, 2, 3].toString(), zigZagFashion(arr2) )

console.log('#########################################################################################################');
console.log('###', 'Generate all possible sorted arrays from alternate elements of two given sorted arrays', '###');
console.log('#########################################################################################################');

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


arr1 = [10, 15, 25]
arr2 = [1, 5, 20, 30]

console.log( '[10, 15, 25], [1, 5, 20, 30]')
generate(arr1, arr2);
// throw new Error("Something went badly wrong!");


console.log('################################################');
console.log('###', 'Pythagorean Triplet in an array', '###');
console.log('################################################');

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
*/

function pythagoreanTripletOn3(a) {
  for (var i = 0; i < a.length-2; i++) {
    for (var j = i+1; j < a.length-1; j++) {
      for (var k = j+1; k < a.length; k++) {
        var a2 = a[i]*a[i],
          b2 = a[j]*a[j],
          c2 = a[k]*a[k];
        if (a2 + b2 === c2) {
          return true;
        }
      }
    }
  }
  return false;
}

/*
  We can solve this in O(n2) time by sorting the array first.

  1) Do square of every element in input array. This step takes O(n) time.
  2) Sort the squared array in increasing order. This step takes O(nLogn) time.
  3) To find a triplet (a, b, c) such that a = b + c, do following.
    * Fix ‘a’ as last element of sorted array.
    * Now search for pair (b, c) in subarray between first element and ‘a’.
      A pair (b, c) with given sum can be found in O(n)
    * If no pair found for current ‘a’, then move ‘a’ one position back and repeat step 3.2.
*/
function pythagoreanTripletOn2(a) {
  for (var i = 0; i < a.length; i++) {
    a[i] = a[i]*a[i];
  }
  a.sort(function(a,b){return a>b;});
  // now check a + b = c
  // c - last element
  // O(n2) - cicle in cicle

  var len = a.length;
  for (var i = len - 1; i > 1; i--) {
    var c = a[i];

    var j = 0,
      k = i - 1;
    while (j < k) {
      var a1 = a[j],
        b = a[k];

      if (a1 + b === c) {
        return true;
      }

      if (a1 + b > c) {
        k--;
      } else {
        j++;
      }
    }
  }
  return false;
}


arr1 = [3, 1, 4, 6, 5]
arr2 = [10, 4, 6, 12, 5]

console.log( '[3, 1, 4, 6, 5]', pythagoreanTripletOn3(arr1) === true)
console.log( '[10, 4, 6, 12, 5]', pythagoreanTripletOn3(arr2) === false)

console.log( '[3, 1, 4, 6, 5]', pythagoreanTripletOn2(arr1) === true)
console.log( '[10, 4, 6, 12, 5]', pythagoreanTripletOn2(arr2) === false)


console.log('################################################');
console.log('###', 'Length of the largest subarray with contiguous elements', '###');
console.log('################################################');

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
*/

function findLongestSubarrayLength(arr) {
  if (arr.length < 2) {
    return arr.length;
  }

  arr.sort(function(a,b) {return a>b;});

  var max = 1,
    currMax = 1,
    prev = arr[0];
  for (var i = 1; i < arr.length; i++) {
    var curr = arr[i];
    if (curr - prev === 1) {
      currMax++;
    } else {
      currMax = 1;
    }

    prev = curr;

    if (max < currMax) {
      max = currMax;
    }
  }

  return max;
}


arr1 = [10, 12, 11];
arr2 = [14, 12, 11, 20];
arr3 = [1, 56, 58, 57, 90, 92, 94, 93, 91, 45];

console.log( '[10, 12, 11]', findLongestSubarrayLength(arr1) === 3)
console.log( '[14, 12, 11, 20]', findLongestSubarrayLength(arr2) === 2)
console.log( '[1, 56, 58, 57, 90, 92, 94, 93, 91, 45]', findLongestSubarrayLength(arr3) === 5)



console.log('########################################################################################################################');
console.log('###', 'Find the smallest positive integer value that cannot be represented as sum of any subset of a given array', '###');
console.log('########################################################################################################################');

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
*/

/*
  We can solve this problem in O(n) time using a simple loop. Let the input array be arr[0..n-1].
  We initialize the result as 1 (smallest possible outcome) and traverse the given array.
  Let the smallest element that cannot be represented by elements at indexes from 0 to (i-1) be ‘res’,
  there are following two possibilities when we consider element at index i:

  1) We decide that ‘res’ is the final result: If arr[i] is greater than ‘res’,
  then we found the gap which is ‘res’ because the elements after arr[i] are also going to be greater than ‘res’.

  2) The value of ‘res’ is incremented after considering arr[i]: The value of ‘res’ is incremented by arr[i]
  (why? If elements from 0 to (i-1) can represent 1 to ‘res-1’,
  then elements from 0 to i can represent from 1 to ‘res + arr[i] – 1’
  be adding ‘arr[i]’ to all subsets that represent 1 to ‘res’)
*/
function findSmallestInteger(arr) {
  var sum = 1;
  // sum should be greate then arr[i]
  // when arr[i] > sum - it means we have a gap
  for (var i = 0; i < arr.length && sum >= arr[i]; i++) {
    sum += arr[i];
  }
  return sum;
}

arr1 = [1, 3, 6, 10, 11, 15];
arr2 = [1, 1, 1, 1];
arr3 = [1, 2, 5, 10, 20, 40];
arr4 = [1, 2, 3, 4, 5, 6];
arr5 = [1, 1, 3, 4];

console.log( '[1, 3, 6, 10, 11, 15]', findSmallestInteger(arr1) === 2, findSmallestInteger(arr1))
console.log( '[1, 1, 1, 1]', findSmallestInteger(arr2) === 5, findSmallestInteger(arr2))
console.log( '[1, 2, 5, 10, 20, 40]', findSmallestInteger(arr3) === 4, findSmallestInteger(arr3))
console.log( '[1, 2, 3, 4, 5,46]', findSmallestInteger(arr4) === 22, findSmallestInteger(arr4))
console.log( '[1, 1, 3, 4]', findSmallestInteger(arr5) === 10, findSmallestInteger(arr5))



console.log('########################################################################################################################');
console.log('###', 'Find the smallest subarray with sum greater than the given value.', '###');
console.log('########################################################################################################################');

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
*/

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

function findSmallestSubarrayOn1(arr, sum) {
  var len = arr.length,
    currSum = 0,
    start = 0, end = 0,
    minLen = len+1; // when search for min, before set min as max;

  while (end < len) {

    // first we set currSum as sum
    while (currSum <= sum && end < len) {
      currSum = currSum + arr[end];
      end++;
    }

    // then we check if we can cut leng of subarray
    // checking first elements if we can remove it
    while (currSum > sum && start < len) {
      if (minLen > end - start) {
        minLen = end - start;
      }

      currSum = currSum - arr[start];
      start++;
    }
  }
  return minLen;
}

arr1 = [1, 4, 45, 6, 0, 19];
arr2 = [1, 10, 5, 2, 7];
arr3 = [1, 11, 100, 1, 0, 200, 3, 2, 1, 250];
arr4 = [1, 2, 3, 4, 5, 6];
arr5 = [1, 1, 3, 4];

console.log( arr1.join(', '), ': ', findSmallestSubarrayOn2(arr1, 51) === 3)
console.log( arr2.join(', '), ': ', findSmallestSubarrayOn2(arr2, 9) === 1)
console.log( arr3.join(', '), ': ', findSmallestSubarrayOn2(arr3, 280) === 4)

console.log( arr1.join(', '), ': ', findSmallestSubarrayOn2V2(arr1, 51) === 3)
console.log( arr2.join(', '), ': ', findSmallestSubarrayOn2V2(arr2, 9) === 1)
console.log( arr3.join(', '), ': ', findSmallestSubarrayOn2V2(arr3, 280) === 4)


console.log( arr1.join(', '), ': ', findSmallestSubarrayOn1(arr1, 51) === 3, findSmallestSubarrayOn1(arr1, 51))
console.log( arr2.join(', '), ': ', findSmallestSubarrayOn1(arr2, 9) === 1, findSmallestSubarrayOn1(arr2, 9))
console.log( arr3.join(', '), ': ', findSmallestSubarrayOn1(arr3, 280) === 4)


console.log('#########################################');
console.log('###', 'Find subarray with given sum', '###');
console.log('#########################################');

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
*/

function findSubarryWithGivenSumV1(arr, sum) {
  var currSum = 0;
  for (var start = 0; start < arr.length; start++) {
    currSum = arr[start];
    if (currSum === sum) {
      return 'Sum found between indexes %s and %s'.replace(/%s/ig, start);
    }
    for (var end = start+1; end < arr.length; end++) {
      currSum += arr[end];
      if (currSum === sum) {
        return 'Sum found between indexes %s and %s'.replace(/%s/, start).replace(/%s/, end);
      }
    }
  }
  return 'No subarray found';
}

function findSubarryWithGivenSumV2(arr, sum) {
  var len = arr.length,
    currSum = arr[0],
    start = 0;

  // why we use end <= len ?
  // to use last arr element as start index
  for (var end = 1; end <= len; end++) {

    // why we use start < end-1 ?
    // max end = arr.length -> max start arr.length-1(last arr element)
    while (start < end-1 && currSum > sum) {
      currSum = currSum - arr[start];
      start++;
    }

    if (currSum === sum) {
      //  why we use end-1
      // because end - its next added index
      // elem with end index hasn't added to currSum yet
      return 'Sum found between indexes %s and %s'.replace(/%s/, start).replace(/%s/, end-1);
    }

    if (end < len) {
      currSum = currSum + arr[end];
    }
  }

  return 'No subarray found';
}

arr1 = [1, 4, 20, 3, 10, 5];
arr2 = [1, 4, 0, 0, 3, 10, 57];
arr3 = [1, 4];

console.log( arr1.join(', '), ' sum = 33 : ', findSubarryWithGivenSumV1(arr1, 33) === 'Sum found between indexes 2 and 4')
console.log( arr2.join(', '), ' sum = 7 : ', findSubarryWithGivenSumV1(arr2, 7) === 'Sum found between indexes 1 and 4')
console.log( arr3.join(', '), ' sum = 0 : ', findSubarryWithGivenSumV1(arr3, 0) === 'No subarray found')

console.log( arr1.join(', '), ' sum = 33 : ', findSubarryWithGivenSumV2(arr1, 33) === 'Sum found between indexes 2 and 4')
console.log( arr2.join(', '), ' sum = 7 : ', findSubarryWithGivenSumV2(arr2, 7) === 'Sum found between indexes 1 and 4')
console.log( arr3.join(', '), ' sum = 0 : ', findSubarryWithGivenSumV2(arr3, 0) === 'No subarray found')
