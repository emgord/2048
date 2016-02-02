var Game = function() {
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  this.addTile();
  this.addTile();
};

//check if board is full before calling this method (otherwise infinite loop)
Game.prototype.addTile = function() {
  var row = Math.floor(Math.random() * 4);
  var column = Math.floor(Math.random() * 4);
  while (this.board[row][column] !== 0) {
    row = Math.floor(Math.random() * 4);
    column = Math.floor(Math.random() * 4);
  }
  var options = [2,2,4];
  var value = options[Math.floor(Math.random() * options.length)];
  this.board[row][column] = value;
};

var merge = function(array){
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
  // for(var i = 0; i < array.length; i++){
  //   if (array[i] == array[i+1]){
  //     var val = array[i];
  //     array[i] = 0;
  //     array[i+1] = val * 2;
  //   }
  // }

};

Game.prototype.leftShifter = function() {
    for (var row = 0; row < this.board.length; row++) {
      var zeros = [];
      var nonzeros = [];
      for (var col = 0; col < this.board.length; col++) {
        if (this.board[row][col] === 0) {
          zeros.push(this.board[row][col]);
        } else {
          nonzeros.push(this.board[row][col]);
        }
      }
      var new_row = nonzeros.concat(zeros);
      this.board[row] = new_row;
    }
};

Game.prototype.rightShifter = function() {
  for (var row = 0; row < this.board.length; row++) {
    // var zeros = [];
    var nonzeros = [];
    for (var col = 0; col < this.board.length; col++) {
      if (this.board[row][col] !== 0) {
        nonzeros.push(this.board[row][col]);
      }
    }
    if (nonzeros.length !== 0) {
      nonzeros = merge(nonzeros);
    }

    var numZeros = (this.board[row].length - nonzeros.length);
    var zeros = new Array(numZeros + 1).join('0').split('').map(parseFloat);
    var new_row = zeros.concat(nonzeros);
    this.board[row] = new_row;
  }
};

Game.prototype.upShifter = function() {
  for (var col = 0; col < this.board.length; col++) {
    var zeros = [];
    var nonzeros = [];
    for (var row = 0; row < this.board.length; row++) {
      if (this.board[row][col] === 0) {
        zeros.push(this.board[row][col]);
      } else {
        nonzeros.push(this.board[row][col]);
      }
    }
      var new_col = nonzeros.concat(zeros);
        for (var i = 0; i < this.board.length; i++){
        this.board[i][col] = new_col[i];
    }
  }
};

Game.prototype.downShifter = function() {
  for (var col = 0; col < this.board.length; col++) {
    var zeros = [];
    var nonzeros = [];
    for (var row = 0; row < this.board.length; row++) {
      if (this.board[row][col] === 0) {
        zeros.push(this.board[row][col]);
      } else {
        nonzeros.push(this.board[row][col]);
      }
    }
      var new_col = zeros.concat(nonzeros);
        for (var i = 0; i < this.board.length; i++){
        this.board[i][col] = new_col[i];
    }
  }
};

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      this.upShifter();
      break;
    case 40: //down
    this.downShifter();
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      this.leftShifter();
      break;
    case 39: //right
      console.log('right');
      this.rightShifter();
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
    }
  });
});
