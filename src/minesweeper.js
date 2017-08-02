class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex)
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log("Game Over!")
      this._board.print()
    } else if (this._board.hasSafeTiles()){
      console.log("You won!")
    } else {
      console.log("Current Board:");
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex){
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log("This tile has already been flipped!")
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles -= 1;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
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
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach( offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if (neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns && neighborRowIndex >= 0 && neighborRowIndex < numberOfRows){
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
          numberOfBombs++
        }
      }
    })
    return numberOfBombs;
  }
  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    let done = this._playerBoard.map( row => (
      row.join(' | ')
    )).join('\n')
    console.log(done);
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
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

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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
}

const g = new Game(3, 3, 3);
g.playMove(0, 0);



//  let playerBoard = generatePlayerBoard(3, 4);
//  let bombBoard = generateBombBoard(3, 4, 5);
//  console.log('Player Board:')
//  printBoard(playerBoard);
//
//  console.log('Bomb Board');
//  printBoard(bombBoard);
//
// flipTile(playerBoard, bombBoard, 0, 0)
// console.log('Updated Player Board:')
//
// printBoard(playerBoard);
