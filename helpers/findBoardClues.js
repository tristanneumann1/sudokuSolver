const Slot = require('../models/Slot');
const { findSquareOrigin } = require('./squareConverters');

function rowContains(i, option, vals) {
  return vals[i].indexOf(option) !== -1;
}

function columnContains(j, option, vals) {
  return vals.reduce((contains, val) => contains || (val[j] === option), false);
}

function squareContains(i, j, option, vals) {
  const [row, col] = findSquareOrigin(i, j);
  for (let x = row; x < row + 3; x += 1) {
    for (let y = col; y < col + 3; y += 1) {
      if (vals[x][y] === option) {
        return true;
      }
    }
  }
  return false;
}


function findClueSlot(i, j) {
  if (this.vals[i][j]) {
    return new Slot([this.vals[i][j]], this.vals[i][j], i, j);
  }
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const optionClues = options.filter(option => !(
    rowContains(i, option, this.vals)
      || columnContains(j, option, this.vals)
      || squareContains(i, j, option, this.vals)
  ));
  return new Slot(optionClues, undefined, i, j);
}

function findBoardClues() {
  const clues = [];
  for (let i = 0; i < 9; i += 1) {
    clues.push([]);
    for (let j = 0; j < 9; j += 1) {
      clues[i][j] = findClueSlot.bind(this)(i, j);
    }
  }
  return clues;
}

module.exports = findBoardClues;
