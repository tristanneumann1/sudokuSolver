const Options = require('./Options');

class Column {
  constructor(j, clues) {
    this.column = j;
    this.clues = [];
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
      clue.options[val] = false;
    });
  }
}

module.exports = Column;
