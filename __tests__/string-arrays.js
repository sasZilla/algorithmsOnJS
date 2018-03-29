import {
  reverseString,
  countCouplesOnLogN, countTriplesOn2,
  zigZagFunction,
  pythagoreanTripletOn2,
  findLongestSubarrayLength,
  findSmallestInteger,
  findSmallestSubarray,
  findSubarryWithGivenSum
} from '../string-arrays';

test('Should be "c,b$a"', () => {
  const testStr = "a,b$c";
  expect(reverseString(testStr)).toBe("c,b$a");
  // TypeError: Cannot assign to read only property '0' of string 'a,b$c'
  // expect(reverseStringWithoutArray(testStr)).toBe("c,b$a");
});

test('"Ab,c,de!$" should be "ed,c,bA!$"', () => {
  expect(reverseString("Ab,c,de!$")).toBe("ed,c,bA!$");
  // TypeError: Cannot assign to read only property '0' of string 'a,b$c'
  // expect(reverseStringWithoutArray("Ab,c,de!$")).toBe("ed,c,bA!$");
});

test('"A!b,c,de!$" should be "e!d,c,bA!$"', () => {
  expect(reverseString("A!b,c,de!$")).toBe("e!d,c,bA!$");
  // TypeError: Cannot assign to read only property '0' of string 'a,b$c'
  // expect(reverseStringWithoutArray("A!b,c,de!$")).toBe("e!d,c,bA!$");
});



test('[-2, 0, 1, 3] couples less then 2', () => {
  let testArr = [-2, 0, 1, 3];
  expect(countCouplesOnLogN(testArr, 2)).toBe(4);
});

test('[5, 1, 3, 4, 7] couples less then 12: ', () => {
  let testArr = [5, 1, 3, 4, 7];
  expect(countCouplesOnLogN(testArr, 12)).toBe(9);
});

test('[-2, 0, 1, 3] triples less then 2', () => {
  let testArr = [-2, 0, 1, 3];
  expect(countTriplesOn2(testArr, 2)).toBe(2);
});

test('[5, 1, 3, 4, 7] couples less then 12: ', () => {
  let testArr = [5, 1, 3, 4, 7];
  expect(countTriplesOn2(testArr, 12)).toBe(4);
});


/* Convert array into Zig-Zag fashion */
test('[4, 3, 7, 8, 6, 2, 1] should be [3, 7, 4, 8, 2, 6, 1]', () => {
  expect(zigZagFunction([4, 3, 7, 8, 6, 2, 1]).toString()).toBe([3, 7, 4, 8, 2, 6, 1].toString())
})
test('[1, 4, 3, 2] should be [1, 4, 2, 3]', () => {
  expect(zigZagFunction([1, 4, 3, 2]).toString()).toBe([1, 4, 2, 3].toString())
})

/* Pythagorean Triplet in an array */
test('[3, 1, 4, 6, 5] should has pythagorean triplet', () => {
  const testArr = [3, 1, 4, 6, 5];
  expect(pythagoreanTripletOn2(testArr)).toBe(true);
});
test('[10, 4, 6, 12, 5] should has pythagorean triplet', () => {
  const testArr = [10, 4, 6, 12, 5];
  expect(pythagoreanTripletOn2(testArr)).toBe(false);
});

/* Length of the largest subarray with contiguous elements */
test('The lorgest subarray length of [10, 12, 11] should be 3', () => {
  const testArr = [10, 12, 11];
  expect(findLongestSubarrayLength(testArr)).toBe(3);
});

test('The lorgest subarray length of [14, 12, 11, 20] should be 2', () => {
  const testArr = [14, 12, 11, 20];
  expect(findLongestSubarrayLength(testArr)).toBe(2);
});

test('The lorgest subarray length of [1, 56, 58, 57, 90, 92, 94, 93, 91, 45] should be 5', () => {
  const testArr = [1, 56, 58, 57, 90, 92, 94, 93, 91, 45];
  expect(findLongestSubarrayLength(testArr)).toBe(5);
});

/* Find the smallest positive integer value that cannot be represented */
test('Smallest value that cannot be represented of sum from any elements [1, 3, 6, 10, 11, 15] should be 2', () => {
  const testArr = [1, 3, 6, 10, 11, 15];
  expect(findSmallestInteger(testArr)).toBe(2);
});
test('Smallest value that cannot be represented of sum from any elements [1, 1, 1, 1] should be 5', () => {
  const testArr = [1, 1, 1, 1];
  expect(findSmallestInteger(testArr)).toBe(5);
});
test('Smallest value that cannot be represented of sum from any elements [1, 1, 3, 4] should be 10', () => {
  const testArr = [1, 1, 3, 4];
  expect(findSmallestInteger(testArr)).toBe(10);
});
test('Smallest value that cannot be represented of sum from any elements [1, 2, 5, 10, 20, 40] should be 4', () => {
  const testArr = [1, 2, 5, 10, 20, 40];
  expect(findSmallestInteger(testArr)).toBe(4);
});
test('Smallest value that cannot be represented of sum from any elements [1, 2, 3, 4, 5, 6] should be 22', () => {
  const testArr = [1, 2, 3, 4, 5, 6];
  expect(findSmallestInteger(testArr)).toBe(22);
});

/* Smallest subarray with sum greater than a given value */
test('Smallest subarray of [1, 4, 45, 6, 0, 19] with sum greater than 51 should be 3', () => {
  const testArr = [1, 4, 45, 6, 0, 19];
  expect(findSmallestSubarray(testArr, 51)).toBe(3)
});

test('Smallest subarray of [1, 10, 5, 2, 7] with sum greater than 9 should be 1', () => {
  const testArr = [1, 10, 5, 2, 7];
  expect(findSmallestSubarray(testArr, 9)).toBe(1)
});

test('Smallest subarray of [1, 11, 100, 1, 0, 200, 3, 2, 1, 250] with sum greater than 280 should be 4', () => {
  const testArr = [1, 11, 100, 1, 0, 200, 3, 2, 1, 250];
  expect(findSmallestSubarray(testArr, 280)).toBe(4)
});

/* Find subarray with given sum */
// TODO: uncomment first
// test('Subarray of [1, 4, 45, 6, 0, 19] with given sum 33 should be found between indexes 2 and 4', () => {
//   const testArr = [1, 4, 20, 3, 10, 5];
//   expect(findSubarryWithGivenSum(testArr, 33)).toBe('Sum found between indexes 2 and 4');
// });
//
// test('Subarray of [1, 4, 0, 0, 3, 10, 57] with given sum 7 should be found between indexes 1 and 4', () => {
//   const testArr = [1, 4, 0, 0, 3, 10, 57];
//   expect(findSubarryWithGivenSum(testArr, 7)).toBe('Sum found between indexes 1 and 4');
// });
//
// test('Subarray of [1, 4] with given sum 7 shouldn\'t be found', () => {
//   const testArr = [1, 4];
//   expect(findSubarryWithGivenSum(testArr, 0)).toBe('No subarray found');
// });
