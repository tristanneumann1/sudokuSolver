function rowColToSquare(i, j) {
  return (i - (i % 3)) + Math.floor(j / 3);
}

function squareToRowCol(i) {
  let row = 0;
  let col = 0;
  row += (i >= 3) ? 3 : 0;
  row += (i >= 6) ? 3 : 0;
  col += 3 * (i % 3);
  return [row, col];
}

function findSquareOrigin(i, j) {
  return [i - (i % 3), j - (j % 3)];
}

const squareConverters = { rowColToSquare, squareToRowCol, findSquareOrigin };

module.exports = squareConverters;
