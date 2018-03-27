import { fibMemorization, fibTabulation } from '../dynamic';

const fibTestCases = [[0,0], [1,1], [2,1], [3,2], [4,3], [5,5], [6,8], [7,13], [8,21], [9,34], [10,55]];

fibTestCases.map((testCase) => {
  test(`Memorization fib(${testCase[0]}) is ${testCase[1]} [Top Down]`, () => {
    expect(fibMemorization(testCase[0])).toBe(testCase[1]);
  });

  test(`Tabulation fib(${testCase[0]}) is ${testCase[1]} [Bottom Up]`, () => {
    expect(fibTabulation(testCase[0])).toBe(testCase[1]);
  });
});
