module.exports = function checkClues() {
  let progress = false;
  for (let i = 0; i < this.clues.length; i += 1) {
    for (let j = 0; j < this.clues[i].length; j += 1) {
      if (!this.clues[i][j].hasValue) {
        const numberWasFound = this.clues[i][j].validateUniqueClue((val) => {
          return this.updateClue(i, j, val);
        });
        progress = progress || numberWasFound;
      }
    }
  }
  return progress;
};
