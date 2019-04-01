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
      clue.options[val] = false;
    });
  }
}

module.exports = Row;
