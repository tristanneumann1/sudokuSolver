const axios = require('axios');
const Board = require('../sudoku.js');
const fs = require('fs');

let starterBoard = Array(9).fill([]);
starterBoard = starterBoard.map(() => Array(9).fill(undefined));

const solve = (initObj) => {
  initObj.forEach((square) => {
    starterBoard[square.x][square.y] = square.value;
  });
  const sudoku = new Board(starterBoard);
  debugger;
  const counter = sudoku.solve();
  debugger;
  console.log('the sudoku took steps:  ', counter);
  console.log(sudoku.log());
};

// fs.readFile('./initBoard.json', 'utf8', (err, json) => {
//   if (err) {
//     console.error(err)
//   }
//   solve(JSON.parse(json));
// });

axios.get('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=2')
  .then((initObjData) => {
    fs.writeFile('./initBoard.json', JSON.stringify(initObjData.data.squares), 'utf8', (err) => {
      if (err) {
        console.error(err)
      }
      console.log('file written');
    });
    solve(initObjData.data.squares);
  });
