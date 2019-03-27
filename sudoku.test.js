const _ = require('lodash');
const Sudoku = require('./sudoku.js');

const u = undefined;
describe('Sudoku Board', () => {
  describe('clue initialisation', () => {
    let board;

    beforeEach(() => {
      /* eslint-disable no-multi-spaces, no-trailing-spaces */
      const initBoard = [
        [u, u, u,    1, 2, u,    u, u, u],
        [3, u, u,    u, u, u,    u, u, u],
        [u, 4, u,    u, u, u,    u, u, u],
        
        [u, u, 5,    u, u, u,    u, u, u],
        [u, u, 6,    u, u, u,    u, u, u],
        [u, u, u,    u, u, u,    u, u, u],
        
        [u, u, u,    u, u, u,    u, u, u],
        [u, u, u,    u, u, u,    u, u, u],
        [u, u, u,    u, u, u,    u, u, u],
      ];
      /* eslint-enable no-multi-spaces, no-trailing-spaces */
      board = new Sudoku(initBoard);
    });

    it('initialises values', () => {
      expect(board.clues[0][3].hasValue).toBe(true);
      // expect(board.clues[0][2]).toEqual(expect.arrayContaining([7, 8, 9]));
    });

    it('defaults options to all 9', () => {
      const allOptions = _.reduce(
        board.clues[8][8].options,
        (clueValidation, clue) => clueValidation && clue,
        true,
      );
      expect(allOptions).toBe(true);
    });

    it('doesn\'t present invalid values', () => {
      expect(board.clues[0][2].options[1]).toBe(false);
      expect(board.clues[0][2].options[3]).toBe(false);
      expect(board.clues[0][2].options[6]).toBe(false);
      expect(board.clues[0][2].options[9]).toBe(true);
    });
  });
  describe('solvers', () => {
    let initBoard;
    beforeEach(() => {
      /* eslint-disable no-multi-spaces */
      initBoard = [
        [u, 4, u,    2, u, 1,    u, 6, u],
        [u, u, u,    u, u, u,    u, u, u],
        [9, u, 5,    u, u, u,    3, u, 7],

        [u, u, u,    u, u, u,    u, u, u],
        [5, u, 7,    u, 8, u,    1, u, 4],
        [u, 1, u,    u, u, u,    u, 9, u],

        [u, u, 1,    u, u, u,    6, u, u],
        [u, u, u,    7, u, 5,    u, u, u],
        [6, u, 8,    9, u, 4,    5, u, 3],
      ];
      /* eslint-enable no-multi-spaces */
    });
    it('solves the sudoku', () => {
      const board = new Sudoku(initBoard);
      const steps = board.solve();
      console.log(steps, board.vals);
      expect(board.isSolved()).toBe(true);
    });
  });
});
