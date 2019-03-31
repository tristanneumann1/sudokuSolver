const { rowColToSquare } = require('../helpers/squareConverters');

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
      } if (i - (i % 3) !== alternateIndex) {
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
  console.log('this exception should never occur');
  return false;
}

module.exports = function unitToUnit() {
  let progress = false;
  for (let unitIndex = 0; unitIndex < 9; unitIndex += 1) {
    for (let number = 0; number < 9; number += 1) {
      progress = progress
      || lineToSq.bind(this)(unitIndex, number, 'column')
      || lineToSq.bind(this)(unitIndex, number, 'row');
      // || sqToRowCol.bind(this)(unitIndex, number);
    }
    if (progress) return progress;
  }
  return progress;
};
