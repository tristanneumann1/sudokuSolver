module.exports = function printBoard(board) {
  let res = '';
  for (let i = 0; i < board.vals.length; i += 1) {
    if (i % 3 === 0) {
      res += '\n';
    }
    res += '[';
    for (let j = 0; j < board.vals[i].length; j += 1) {
      if (j % 3 === 0) {
        res += ' ||';
      }
      res += board.vals[i][j] ? ` ${board.vals[i][j]},` : '  ,';
    }
    res += ']\n';
  }
  return res;
};
