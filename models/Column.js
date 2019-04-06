const Options = require('./Options');

class Column {
  constructor(j, clues, board) {
    this.column = j;
    this.clues = [];
    this.board = board;
    this.values = new Options();
    for (let i = 0; i < 9; i += 1) {
      this.clues.push(clues[i][j]);
      if (clues[i][j].hasValue) {
        this.values[clues[i][j].value] = true;
      }
    }
  }

  updateColumn(val) {
    this.values[val] = true;
    this.clues.forEach((clue) => {
      clue.removeClue(val);
    });
  }

  removeSoftClues(exception, number) {
    let change = false;
    for (let i = 0; i < this.clues.length; i += 1) {
      const { row } = this.clues[i];
      if (row - (row % 3) !== exception && this.clues[i].removeClue(number)) {
        change = true;
      }
    }
    return change;
  }
}

module.exports = Column;
