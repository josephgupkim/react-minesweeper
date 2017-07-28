'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced !== numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColIndex = Math.floor(Math.random() * numberOfColumns);
    //need control flow to check if bomb is already in that location.
    board[randomRowIndex][randomColIndex] = 'B';
    numberOfBombsPlaced += 1;
  }

  return board;
};

var printBoard = function printBoard(board) {
  var done = board.map(function (row) {
    return row.join(' | ');
  }).join('\n');
  console.log(done);
};

var playerBoard = generatePlayerBoard(3, 4);
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board:');
printBoard(playerBoard);

console.log('Bomb Board');
printBoard(bombBoard);