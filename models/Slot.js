const Options = require('./Options');

class Slot {
  constructor(options, val, row, column) {
    this.row = row;
    this.column = column;
    this.value = val;
    this.hasValue = !!val;
    this.options = new Options();
    for (let i = 0; i < options.length; i += 1) {
      this.options[options[i]] = true;
    }
  }

  validateUniqueClue(cb) {
    let singleVal;
    for (let i = 1; i < 10; i += 1) {
      if (this.options[i] && singleVal) {
        return false;
      } if (this.options[i]) {
        singleVal = i;
      }
    }
    this.inputValue(singleVal);
    return cb(singleVal);
  }

  inputValue(val) {
    this.value = val;
    this.hasValue = true;
  }

  removeClue(number) {
    this.options[number] = false;
  }
}

module.exports = Slot;
