const { squareToRowCol, rowColToSquare } = require('../helpers/squareConverters');

function sqToRowCol(unitIndex, number) {
  const unit = this.squares[unitIndex];
  if (unit.values[number]) {
    return false;
  }
  let row;
  let column;
  for (let i = 0; i < unit.clues.length; i += 1) {
    if (!unit.clues[i].hasValue && unit.clues[i].options[number]) {
      if (row === undefined || column === undefined) {
        ({ row, column } = unit.clues[i]);
      } else if (row === unit.clues[i].row) {
        column = -1;
      } else if (column === unit.clues[i].column) {
        row = -1;
      }
    }

    if (row === -1 && column === -1) {
      return false;
    }
  }

  if (row >= 0) {
    return this.rows[row].removeSoftClues(squareToRowCol(unitIndex)[1], number);
  } if (column >= 0) {
    return this.columns[column].removeSoftClues(squareToRowCol(unitIndex)[0], number);
  }
  throw new Error('no options found for a number in a unit');
}

function lineToSq(unitIndex, number, type) {
  const unit = (type === 'column') ? this.columns[unitIndex] : this.rows[unitIndex];
  let alternateIndex;
  if (unit.values[number]) {
    return false;
  }
  for (let i = 0; i < 9; i += 1) {
    if (!unit.clues[i].hasValue && unit.clues[i].options[number]) {
      // If slot has number option

      if (alternateIndex === undefined) {
        // set alternateIndex including number option

        alternateIndex = i - (i % 3);
      } else if (i - (i % 3) !== alternateIndex) {
        // If slot is in a new alternateIndex return false

        return false;
      }
    }
  }
  if (alternateIndex !== undefined) {
    // remove soft vals

    return (type === 'column')
      ? this.squares[rowColToSquare(alternateIndex, unitIndex)]
        .removeSoftClues((unitIndex % 3), number, type)
      : this.squares[rowColToSquare(unitIndex, alternateIndex)]
        .removeSoftClues((unitIndex % 3), number, type);
  }
  throw new Error('no options found for a number in a unit');
}

module.exports = function unitToUnit() {
  let progress = false;
  for (let unitIndex = 0; unitIndex < 9; unitIndex += 1) {
    for (let number = 1; number < 10; number += 1) {
      progress = lineToSq.bind(this)(unitIndex, number, 'column') || progress;
      progress = lineToSq.bind(this)(unitIndex, number, 'row') || progress;
      progress = sqToRowCol.bind(this)(unitIndex, number) || progress;
    }
    if (progress) return progress;
  }
  return progress;
};
