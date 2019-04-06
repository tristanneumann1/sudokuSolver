const logger = require('./logger');

describe('logger', () => {
  const starterBoard = Array(9).fill([]).map(() => Array(9).fill(undefined));
  const log = logger.bind({ vals: starterBoard })();
  it('logs board', () => {
    expect(typeof log).toBe('string');
  });
});
