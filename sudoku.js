const Square = require('./models/Square.js');
const Column = require('./models/Column.js');
const Row = require('./models/Row.js');
const { checkClues, unitToUnit } = require('./solvers');
const { squareConverters, findBoardClues } = require('./helpers');

const { rowColToSquare } = squareConverters;

class Board {
  constructor(initialVals) {
    this.initialVals = initialVals;
    this.vals = initialVals;
    this.clues = findBoardClues.bind(this)();
    this.columns = [];
    this.rows = [];
    this.squares = [];
    for (let i = 0; i < 9; i += 1) {
      this.rows.push(new Row(i, this.clues));
      this.columns.push(new Column(i, this.clues));
      this.squares.push(new Square(i, this.clues));
    }
  }

  updateClue(i, j, val) {
    this.vals[i][j] = val;
    this.updateRow(i, val);
    this.updateColumn(j, val);
    this.updateSquare(i, j, val);
    return true;
  }

  updateRow(i, val) {
    this.rows[i].updateRow(val);
  }

  updateColumn(j, val) {
    this.columns[j].updateColumn(val);
  }

  updateSquare(i, j, val) {
    this.squares[rowColToSquare(i, j)].updateSquare(val);
  }

  solve() {
    let counter = 0;
    let progress = true;
    while (!this.isSolved() && counter < 100 && progress) {
      counter += 1;
      progress = checkClues.bind(this)();
    }
    // if (!this.isSolved) {
    //   progress = unitToUnit.bind(this)();
    //   counter += this.solve();
    // }
    return counter;
  }

  isSolved() {
    for (let i = 0; i < this.clues.length; i += 1) {
      for (let j = 0; j < this.clues[i].length; j += 1) {
        if (!this.clues[i][j].hasValue) {
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = Board;
