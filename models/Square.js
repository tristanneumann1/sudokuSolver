const { squareToRowCol } = require('../helpers/squareConverters');
const Options = require('./Options');

class Square {
  constructor(square, clues, board) {
    this.square = squareToRowCol(square);
    this.clues = [];
    this.board = board;
    this.squareClues = [];
    this.values = new Options();
    for (let x = this.square[0]; x < this.square[0] + 3; x += 1) {
      this.squareClues.push([]);
      for (let y = this.square[1]; y < this.square[1] + 3; y += 1) {
        this.clues.push(clues[x][y]);
        this.squareClues[x - this.square[0]][y - this.square[1]] = clues[x][y];
        if (clues[x][y].hasValue) {
          this.values[clues[x][y].value] = true;
        }
      }
    }
  }

  updateSquare(val) {
    this.values[val] = true;
    this.clues.forEach((clue) => {
      clue.options[val] = false;
    });
  }

  removeSoftClues(exception, number, type) {
    let col;
    let row;
    const exceptCase = () => ((type === 'column') ? exception === col : exception === row);
    let change = false;
    for (row = 0; row < 3; row += 1) {
      for (col = 0; col < 3; col += 1) {
        // double loop through clues

        if (!exceptCase() && this.squareClues[row][col].options[number]) {
          // soft clue exists

          this.squareClues[row][col].removeClue(number);
          change = true;
        }
      }
    }
    return change;
  }
}

module.exports = Square;
