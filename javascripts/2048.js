var Game = function() {
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  // this.board = [[23, 24, 25, 26],
  //               [27, 28, 29, 30],
  //               [31, 32, 33, 34],
  //               [35, 36, 37, 34]];
  this.addTile();
  this.addTile();
  this.win = false;
  this.lose = false;
};

var mergeLeftUp = function(array){
  var squished_array = [];
  while (array.length > 0) {
    if (array.length === 1) {
      squished_array.push(array[0]);
      array.splice(0, 1);
    } else if (array[0] === array[1]) {
      squished_array.push(array[0] * 2);
      array.splice(0, 2);
    } else {
      squished_array.push(array[0]);
      array.splice(0, 1);
    }
  }
  return squished_array;
};

var mergeRightDown = function(array){
  var squished_array = [];
  while (array.length > 0) {
    if (array.length === 1) {
      squished_array.unshift(array[0]);
      array.splice(0, 1);
    } else if (array[array.length-1] === array[array.length-2]) {
      squished_array.unshift(array[array.length-1] * 2);
      array.splice(array.length-2, 2);
    } else {
      squished_array.unshift(array[array.length-1]);
      array.splice(array.length-1, 1);
    }
  }
  return squished_array;
};

var leftShifter = function(board) {
    for (var row = 0; row < board.length; row++) {
      var nonzeros = [];
      for (var col = 0; col < board.length; col++) {
        if (board[row][col] !== 0) {
          nonzeros.push(board[row][col]);
        }
      }
      if (nonzeros.length !== 0) {
        nonzeros = mergeLeftUp(nonzeros);
      }

      var numZeros = (board.length - nonzeros.length);
      var zeros = new Array(numZeros + 1).join('0').split('').map(parseFloat);
      var new_row = nonzeros.concat(zeros);
      board[row] = new_row;
    }
};

var rightShifter = function(board) {
  for (var row = 0; row < board.length; row++) {
    var nonzeros = [];
    for (var col = 0; col < board.length; col++) {
      if (board[row][col] !== 0) {
        nonzeros.push(board[row][col]);
      }
    }
    if (nonzeros.length !== 0) {
      nonzeros = mergeRightDown(nonzeros);
    }

    var numZeros = (board.length - nonzeros.length);
    var zeros = new Array(numZeros + 1).join('0').split('').map(parseFloat);
    var new_row = zeros.concat(nonzeros);
    board[row] = new_row;
  }
};

var downShifter = function(board) {
  for (var col = 0; col < board.length; col++) {
    var nonzeros = [];
    for (var row = 0; row < board.length; row++) {
      if (board[row][col] !== 0) {
        nonzeros.push(board[row][col]);
      }
    }
    if (nonzeros.length !== 0) {
      nonzeros = mergeRightDown(nonzeros);
    }
    var numZeros = (board.length - nonzeros.length);
    var zeros = new Array(numZeros + 1).join('0').split('').map(parseFloat);
      var new_col = zeros.concat(nonzeros);
        for (var i = 0; i < board.length; i++){
        board[i][col] = new_col[i];
    }
  }
};

var upShifter = function(board) {
  for (var col = 0; col < board.length; col++) {
    var nonzeros = [];
    for (var row = 0; row < board.length; row++) {
      if (board[row][col] !== 0) {
        nonzeros.push(board[row][col]);
      }
    }

    if (nonzeros.length !== 0) {
      nonzeros = mergeLeftUp(nonzeros);
    }
    var numZeros = (board.length - nonzeros.length);
    var zeros = new Array(numZeros + 1).join('0').split('').map(parseFloat);
      var new_col = nonzeros.concat(zeros);
        for (var i = 0; i < board.length; i++){
        board[i][col] = new_col[i];
    }

  }
};

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

Game.prototype.checkLoser = function() {
  var fakeBoard = this.board.slice(0);
  upShifter(fakeBoard);
  leftShifter(fakeBoard);
  rightShifter(fakeBoard);
  downShifter(fakeBoard);
  if (arraysEqual(fakeBoard, this.board)) {
    this.lose = true;
  }
};


Game.prototype.checkWinner = function() {
  var flattenedBoard = [].concat.apply([],this.board);
  if (flattenedBoard.indexOf(2048) !== -1) {
    this.win = true;
  }
};

Game.prototype.addTile = function() {
  var flattenedBoard = [].concat.apply([],this.board);
  if (flattenedBoard.indexOf(0) === -1) {
    this.checkLoser();
    return;
  }

  var row = Math.floor(Math.random() * 4);
  var column = Math.floor(Math.random() * 4);
  while (this.board[row][column] !== 0) {
    row = Math.floor(Math.random() * 4);
    column = Math.floor(Math.random() * 4);
  }
  var options = [2,2,2,2,2,2,2,2,2,4];
  var value = options[Math.floor(Math.random() * options.length)];
  this.board[row][column] = value;
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      // console.log('up');
      upShifter(this.board);
      break;
    case 40: //down
      downShifter(this.board);
      // console.log('down');
      break;
    case 37: //left
      // console.log('left');
      leftShifter(this.board);
      break;
    case 39: //right
      // console.log('right');
      rightShifter(this.board);
      break;
  }
};

Game.prototype.drawBoard = function(){
  for(var row = 0; row < this.board.length; row++) {
    for(var col = 0; col < this.board.length; col++) {
      var value = this.board[row][col];
      if (value !== 0) {
        $("#gameboard").append($("<div class=\"tile\" data-row=\"r" + row + "\", data-col=\"c" + col + "\" data-val=\"" + value + "\">" + value + "</div>"));
      }
    }
  }
};

Game.prototype.clearBoard = function(){
  $(".tile").remove();
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  game.drawBoard();


  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
      game.addTile();
      game.clearBoard();
      game.drawBoard();
      game.checkWinner();
      if (game.win || game.lose) {
        console.log("Game Over, lost: " + game.lose + ", win: " + game.win);
      }
    }
  });
});
