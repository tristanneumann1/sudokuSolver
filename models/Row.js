const Options = require('./Options');

class Row {
  constructor(i, clues, board) {
    this.row = i;
    this.clues = clues[i];
    this.board = board;
    this.values = new Options();
    this.clues.forEach((clue) => {
      if (clue.hasValue) {
        this.values[clue.value] = true;
      }
    });
  }

  updateRow(val) {
    this.values[val] = true;
    this.clues.forEach((clue) => {
      clue.removeClue(val);
    });
  }

  removeSoftClues(exception, number) {
    let change = false;
    for (let i = 0; i < this.clues.length; i += 1) {
      const { column } = this.clues[i];
      if (column - (column % 3) !== exception) {
        this.clues[i].removeClue(number);
        change = true;
      }
    }
    return change;
  }
}

module.exports = Row;
