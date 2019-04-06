module.exports = function printBoard() {
  let res = '';
  this.vals.forEach((row, i) => {
    res += (i === 3 || i === 6) ? '\n\n' : '\n';
    row.forEach((val, j) => {
      res += (j === 3 || j === 6) ? '   ' : ' ';
      res += (val === undefined) ? 'u' : val;
    });
  });
  return res;
};
