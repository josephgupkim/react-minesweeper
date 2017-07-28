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
    if (board[randomRowIndex][randomColIndex] !== 'B'){
      board[randomRowIndex][randomColIndex] = 'B';
      numberOfBombsPlaced += 1;
    }
  }

  return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [rowIndex - 1, columnIndex - 1],
    [rowIndex - 1, columnIndex],
    [rowIndex - 1, columnIndex + 1],
    [rowIndex, columnIndex - 1],
    [rowIndex, columnIndex + 1],
    [rowIndex + 1, columnIndex - 1],
    [rowIndex + 1, columnIndex],
    [rowIndex + 1, columnIndex + 1]
  ];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach(function(offset){
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns && neighborRowIndex >= 0 && neighborRowIndex < numberOfRows){
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
        numberOfBombs++
      }
    }
  })
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' '){
    console.log("This tile has already been flipped!")
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B'){
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
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

flipTile(playerBoard, bombBoard, 0, 0)
console.log('Updated Player Board:')

printBoard(playerBoard);
