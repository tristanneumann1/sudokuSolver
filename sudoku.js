const Square = require('./models/Square.js');
const Column = require('./models/Column.js');
const Row = require('./models/Row.js');
const { checkClues, unitToUnit, uniqueCandidate } = require('./solvers');
const { squareConverters, findBoardClues, logger } = require('./helpers');

const { rowColToSquare } = squareConverters;

class Board {
  constructor(initialVals) {
    this.initialVals = initialVals;
    this.vals = initialVals;
    this.solved = false;
    this.clues = findBoardClues.bind(this)();
    this.columns = [];
    this.rows = [];
    this.squares = [];
    for (let i = 0; i < 9; i += 1) {
      this.rows.push(new Row(i, this.clues, this));
      this.columns.push(new Column(i, this.clues, this));
      this.squares.push(new Square(i, this.clues, this));
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
    this.checkSolved();
    while (!this.solved && counter < 100 && progress) {
      // check soleCandidate
      counter += 1;
      progress = checkClues.bind(this)();
      if (progress) {
        this.checkSolved();
      }
    }
    if (!this.solved && !progress) {
      // check uniqueCandidate
      counter += 1;
      progress = uniqueCandidate.bind(this)();
      if (progress) {
        counter += this.solve();
      }
    }
    if (!this.solved && !progress) {
      counter += 1;
      progress = unitToUnit.bind(this)();
      if (progress) {
        counter += this.solve();
      }
    }
    return counter;
  }

  checkSolved() {
    for (let i = 0; i < this.clues.length; i += 1) {
      for (let j = 0; j < this.clues[i].length; j += 1) {
        if (!this.clues[i][j].hasValue) {
          this.solved = false;
          return false;
        }
      }
    }
    this.solved = true;
    return true;
  }

  log() {
    return logger.bind(this)();
  }
}

module.exports = Board;
