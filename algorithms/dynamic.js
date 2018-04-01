//npm install colors
// var colors = require('colors/safe');
//
// var colorsDictionary = {
//   true: colors.green,
//   false: colors.red
// }


// 1) Overlapping Subproblems:
/*
1.1 Fibonachi with memory - Up to Down
*/

// Memorization (Top Down)
export function fibMemorization(n) {
  let memo = []
  return _fibM(n, memo);
}

function _fibM(i, memo) {
  if (i === 0 || i === 1) {
    return i;
  }

  if (!memo[i]) {
    memo[i] = _fibM(i-1, memo) + _fibM(i-2, memo);
  }

  return memo[i];
}

/*
1.2 Fibonachi with bottom to up
*/
// Tabulation(Bottom Up)
export function fibTabulation(n) {
  var memo = [0, 1];

  if (n === 0) { return 0; }
  if (n === 1) { return 1; }

  for (var i=2;i<=n;i++) {
    memo[i] = memo[i-1] + memo[i-2];
  }

  return memo[n];
}

// 2) Optimal Substructure:
  // A given problems has Optimal Substructure Property
  // if optimal solution of the given problem can be obtained
  // by using optimal solutions of its subproblems.
