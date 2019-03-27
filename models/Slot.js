const optionsObj = () => ({
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
});

class Slot {
  constructor(options, val) {
    this.value = val;
    this.hasValue = !!val;
    this.options = optionsObj();
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
    this.value = singleVal;
    this.hasValue = true;
    cb(singleVal);
    return true;
  }
}

module.exports = Slot;
