// UNIQUE CANDIDATE

function unitCandidate(number) {
  if (this.values[number]) {
    return false;
  }
  let soleCandidate;
  for (let i = 0; i < this.clues.length; i += 1) {
    if (soleCandidate === undefined && this.clues[i].options[number]) {
      soleCandidate = i;
    } else if (this.clues[i].options[number]) {
      return false;
    }
  }
  if (this.clues[soleCandidate] === undefined) {
    debugger
  }
  const [i, j] = [this.clues[soleCandidate].row, this.clues[soleCandidate].column];
  this.clues[soleCandidate].inputValue(number);
  this.board.updateClue(i, j, number);
  return true;
}

module.exports = function uniqueCandidate() {
  let progress = false;
  for (let unit = 0; unit < 9; unit += 1) {
    for (let number = 1; number < 10; number += 1) {
      progress = unitCandidate.bind(this.rows[unit])(number) || progress;
      progress = unitCandidate.bind(this.columns[unit])(number) || progress;
      progress = unitCandidate.bind(this.squares[unit])(number) || progress;
    }
  }
  return progress;
};
