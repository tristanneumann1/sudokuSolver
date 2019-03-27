class Column {
  constructor(j, clues) {
    this.column = j;
    this.clues = [];
    for (let i = 0; i < 9; i += 1) {
      this.clues.push(clues[i][j]);
    }
  }

  updateColumn(val) {
    this.clues.forEach((clue) => {
      clue.options[val] = false;
    });
  }
}

module.exports = Column;
