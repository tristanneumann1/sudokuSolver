class Row {
  constructor(i, clues) {
    this.row = i;
    this.clues = clues[i];
  }

  updateRow(val) {
    this.clues.forEach((clue) => {
      clue.options[val] = false;
    });
  }
}

module.exports = Row;
