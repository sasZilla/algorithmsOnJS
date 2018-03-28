import {
  reverseString,
  countCouplesOnLogN, countTriplesOn2,
  zigZagFunction,
  pythagoreanTripletOn2
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
