const { rowColToSquare, squareToRowCol, findSquareOrigin } = require('./squareConverters');

describe('Square Converters', () => {
  it('converts row, column to square position', () => {
    expect(rowColToSquare(0, 0)).toBe(0);
    expect(rowColToSquare(3, 3)).toBe(4);
    expect(rowColToSquare(7, 4)).toBe(7);
  });

  it('converts square position to origin of it\'s row column', () => {
    expect(squareToRowCol(0).join('')).toBe([0, 0].join(''));
    expect(squareToRowCol(4).join('')).toBe([3, 3].join(''));
    expect(squareToRowCol(7).join('')).toBe([6, 3].join(''));
  });

  it('finds square origin', () => {
    expect(findSquareOrigin(0, 0).join('')).toBe([0, 0].join(''));
    expect(findSquareOrigin(4, 4).join('')).toBe([3, 3].join(''));
    expect(findSquareOrigin(5, 8).join('')).toBe([3, 6].join(''));
  })
});
