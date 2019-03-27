const { squareToRowCol } = require('../helpers/squareConverters');

class Square {
  constructor(square, clues) {
    this.square = squareToRowCol(square);
    this.clues = [];
    this.squareClues = [];
    for (let x = this.square[0]; x < this.square[0] + 3; x += 1) {
      this.squareClues.push([]);
      for (let y = this.square[1]; y < this.square[1] + 3; y += 1) {
        this.clues.push(clues[x][y]);
        this.squareClues[x - this.square[0]][y - this.square[1]] = clues[x][y];
      }
    }
  }

  updateSquare(val) {
    this.clues.forEach((clue) => {
      clue.options[val] = false;
    });
  }
}

module.exports = Square;
