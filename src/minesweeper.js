const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  var board = [];
  for (let i = 0; i < numberOfRows; i++){
    var row = [];
    for (let j = 0; j < numberOfColumns; j++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

let generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  var board = [];
  for (let i = 0; i < numberOfRows; i++){
    var row = [];
    for (let j = 0; j < numberOfColumns; j++){
      row.push(null);
    }
    board.push(row);
  }
  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced !== numberOfBombs){
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColIndex = Math.floor(Math.random() * numberOfColumns);
    //need control flow to check if bomb is already in that location.
    board[randomRowIndex][randomColIndex] = 'B';
    numberOfBombsPlaced += 1;
  }

  return board;
}

const printBoard = (board) => {
  let done = board.map( row => (
    row.join(' | ')
  )).join('\n')
  console.log(done);
}


 let playerBoard = generatePlayerBoard(3, 4);
 let bombBoard = generateBombBoard(3, 4, 5);
 console.log('Player Board:')
 printBoard(playerBoard);

 console.log('Bomb Board');
 printBoard(bombBoard);
