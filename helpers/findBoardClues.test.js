const findBoardClues = require('./findBoardClues');
const Slot = require('../models/Slot');

describe('Find Board Clues Function', () => {
  const starterBoard = Array(9).fill([]).map(() => Array(9).fill(undefined));
  starterBoard[0][0] = 1;

  const clues = findBoardClues.bind({ vals: starterBoard })();

  it('returns a board of slots', () => {
    expect(clues.length).toBe(9);
    expect(clues[0].length).toBe(9);
    expect(clues[0][0] instanceof Slot).toBe(true);
  });

  it('finds values', () => {
    expect(clues[0][0].hasValue).toBe(true);
    expect(clues[0][0].value).toBe(1);

    expect(clues[1][1].hasValue).toBe(false);
    expect(clues[1][1].value).toBe(undefined);
  });

  it('finds only possible clues', () => {
    expect(clues[5][5].options[2]).toBe(true);
    expect(clues[0][5].options[1]).toBe(false);
    expect(clues[2][2].options[1]).toBe(false);
    expect(clues[5][0].options[1]).toBe(false);
  });
});
