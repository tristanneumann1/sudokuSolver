const axios = require('axios');
const Board = require('../sudoku.js');
const fs = require('fs');

const solve = (initObj) => {
  const sudoku = new Board(initObj);
  console.log(sudoku.log());
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

axios.get('http://www.cs.utep.edu/cheon/ws/sudoku/new/?size=9&level=1')
  .then((initObjData) => {
    fs.writeFile('./initBoard.json', JSON.stringify(initObjData.data.squares), 'utf8', (err) => {
      if (err) {
        console.error(err)
      }
      console.log('file written');
    });
    solve(initObjData.data.squares);
  }).catch((err) => {
    console.error(err);
  });
