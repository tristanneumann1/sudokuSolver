const checkClues = require('./checkClues');
const unitToUnit = require('./unitToUnit');
const uniqueCandidate = require('./uniqueCandidate');

module.exports = {
  checkClues,
  unitToUnit,
  uniqueCandidate,
  solvers: [checkClues, uniqueCandidate, unitToUnit],
};
