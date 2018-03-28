import {
  reverseString, reverseStringWithoutArray,
  countCouplesOnLogN, countTriplesOn2
} from '../string-arrays';

test('Should be "c,b$a"', () => {
  const testStr = "a,b$c";
  expect(reverseString(testStr)).toBe("c,b$a");
  expect(reverseStringWithoutArray(testStr)).toBe("c,b$a");
});

test('"Ab,c,de!$" should be "ed,c,bA!$"', () => {
  expect(reverseString("Ab,c,de!$")).toBe("ed,c,bA!$");
  expect(reverseStringWithoutArray("Ab,c,de!$")).toBe("ed,c,bA!$");
});

test('"A!b,c,de!$" should be "e!d,c,bA!$"', () => {
  expect(reverseString("A!b,c,de!$")).toBe("e!d,c,bA!$");
  expect(reverseStringWithoutArray("A!b,c,de!$")).toBe("e!d,c,bA!$");
});



test('[-2, 0, 1, 3] couples less then 2', () => {
  let testArr = [-2, 0, 1, 3];
  expect(countCouplesOnLogN(testArr)).tobe(4);
});

test('[5, 1, 3, 4, 7] couples less then 12: ', () => {
  let testArr = [5, 1, 3, 4, 7];
  expect(countCouplesOnLogN(testArr)).toBe(9);
});

test('[-2, 0, 1, 3] triples less then 2', () => {
  let testArr = [-2, 0, 1, 3];
  expect(countTriplesOn2(testArr)).tobe(2);
});

test('[5, 1, 3, 4, 7] triples less then 12: ', () => {
  let testArr = [5, 1, 3, 4, 7];
  expect(countTriplesOn2(testArr)).toBe(4);
});
