const _ = require('lodash');
const Sudoku = require('./sudoku.js');

const u = undefined;
describe('Sudoku Board', () => {
  describe('initialisation', () => {
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
      expect(board.clues[0][3].value).toBe(1);
    });

    it('defaults clue options to all 9', () => {
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

  describe('clue updating', () => {
    let board;
    beforeEach(() => {
      const initBoard = [];
      for (let i = 0; i < 9; i += 1) {
        initBoard.push(new Array(9).fill(undefined));
      }
      board = new Sudoku(initBoard);
      board.updateClue(4, 4, 1);
    });
    it('updates values', () => {
      expect(board.vals[4][4]).toBe(1);
    });
    it('updates clues', () => {
      expect(board.clues[4][8].options[1]).toBe(false);
      expect(board.clues[8][4].options[1]).toBe(false);
      expect(board.clues[5][5].options[1]).toBe(false);
    });
  });

  it('checks if board is solved', () => {
    /* eslint-disable no-multi-spaces */
    const initBoard = [
      [1, 2, 3,    4, 5, 6,    7, 8, 9],
      [4, 5, 6,    7, 8, 9,    1, 2, 3],
      [7, 8, 9,    1, 2, 3,    4, 5, 6],

      [2, 3, 4,    5, 6, 7,    8, 9, 1],
      [5, 6, 7,    8, 9, 1,    2, 3, 4],
      [8, 9, 1,    2, 3, 4,    5, 6, 7],
      
      [3, 4, 5,    6, 7, 8,    9, 1, 2],
      [6, 7, 8,    9, 1, 2,    3, 4, 5],
      [9, 1, 2,    3, 4, 5,    6, 7, u],

    ]
    /* eslint-enable no-multi-spaces */
    const board = new Sudoku(initBoard);

    expect(board.checkSolved()).toBe(false);
    board.clues[8][8].inputValue(8);
    expect(board.checkSolved()).toBe(true);
  });

  xit('tests for my own sanity', () => {
    const initBoard = [
      [u,u,u,    u,u,u,    u,u,1],
      [u,u,u,    u,u,u,    u,u,2],
      [u,u,u,    u,u,u,    u,u,3],
    
      [u,u,u,    u,u,u,    u,u,u],
      [u,u,u,    u,u,u,    4,u,u],
      [u,u,u,    u,u,u,    u,u,u],
    
      [u,u,u,    u,u,u,    u,u,u],
      [u,u,u,    u,u,u,    u,u,u],
      [u,u,u,    u,u,u,    u,u,u],
    ];
    const board = new Sudoku(initBoard);
    board.solve();
  });

  describe('solvers', () => {
    let initBoard;
    beforeEach(() => {
      /* eslint-disable no-multi-spaces */
      initBoard = [
        [u, u, u,    7, u, u,    u, u, u],
        [1, u, u,    u, u, u,    u, u, u],
        [u, u, u,    4, 3, u,    2, u, u],

        [u, u, u,    u, u, u,    u, u, 6],
        [u, u, u,    5, u, 9,    u, u, u],
        [u, u, u,    u, u, u,    4, 1, 8],

        [u, u, u,    u, 8, 1,    u, u, u],
        [u, u, 2,    u, u, u,    u, 5, u],
        [u, 4, u,    u, u, u,    3, u, u],
      ];
      /* eslint-enable no-multi-spaces */
    });
    it('solves the sudoku', () => {
      const board = new Sudoku(initBoard);
      const steps = board.solve();
      expect(board.solved).toBe(true);
    });
  });
});
