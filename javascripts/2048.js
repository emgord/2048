var Game = function() {
  // this.board = [[0, 0, 0, 0],
  //               [0, 0, 0, 0],
  //               [0, 0, 0, 0],
  //               [0, 0, 0, 0]];
  this.board = [[2, 2, 32, 512],
                [2, 16, 32, 256],
                [4, 2, 64, 128],
                [2048, 2, 1024, 8]];
  this.addTile();
  this.addTile();
  this.win = false;
  this.lose = false;
  this.score = 0;
};

var mergeBackwards = function(array){
  var score = 0;
  var squished_array = [];
  while (array.length > 0) {
    if (array.length === 1) {
      squished_array.push(array[0]);
      array.splice(0, 1);
    } else if (array[0] === array[1]) {
      var mergeVal = array[0] * 2;
      squished_array.push(mergeVal);
      score += mergeVal;
      array.splice(0, 2);
    } else {
      squished_array.push(array[0]);
      array.splice(0, 1);
    }
  }
  return { squished_array: squished_array,
          score: score
          };
};

var mergeForwards = function(array){
  var score = 0;
  var squished_array = [];
  while (array.length > 0) {
    if (array.length === 1) {
      squished_array.unshift(array[0]);
      array.splice(0, 1);
    } else if (array[array.length-1] === array[array.length-2]) {
      var mergeVal = array[array.length-1] * 2;
      squished_array.unshift(mergeVal);
      score += mergeVal;
      array.splice(array.length-2, 2);
    } else {
      squished_array.unshift(array[array.length-1]);
      array.splice(array.length-1, 1);
    }
  }
  return { squished_array: squished_array,
          score: score
          };
};

var axisBuilder = function(boardLength, nonzeros, forward) {
  var score = 0;
  var mergeReturn;
  if (nonzeros.length !== 0) {
    if (forward) {
      mergeReturn = mergeForwards(nonzeros);
    } else {
      mergeReturn = mergeBackwards(nonzeros);
    }
    nonzeros = mergeReturn.squished_array;
    score += mergeReturn.score;
  }

  var numZeros = (boardLength - nonzeros.length);
  var zeros = new Array(numZeros + 1).join('0').split('').map(parseFloat);
  var rebuiltArray;
  if (forward){
    rebuiltArray = zeros.concat(nonzeros);
  } else {
    rebuiltArray = nonzeros.concat(zeros);
  }
  return { rebuiltArray: rebuiltArray,
          score: score
          };
};

// forward is a boolean, true indicates down or right, row is a boolean, true is left or right, false is up or down
var shifter = function(board, forward, row) {
  var score = new Number();
  var cell;
  for (var outer = 0; outer < board.length; outer++) {
    var nonzeros = [];
    for (var inner = 0; inner < board.length; inner++) {
      if (row) {
        cell = board[outer][inner];
      } else {
        cell = board[inner][outer];
      }
        if (cell !== 0) {
          nonzeros.push(cell);
        }
    }
    var axisBuildReturn = axisBuilder(board.length, nonzeros, forward);
    var new_axis = axisBuildReturn.rebuiltArray;
    score += axisBuildReturn.score;
    if (row){
      board[outer] = new_axis;
    } else {
      for (var i = 0; i < board.length; i++){
        board[i][outer] = new_axis[i];
      }
    }
  }
  return score;
};

function arraysEqual(a1,a2) {
    return JSON.stringify(a1)==JSON.stringify(a2);
}

Game.prototype.checkLoser = function() {
  var fakeBoard = this.board.slice(0);
  shifter(fakeBoard, true, true);
  shifter(fakeBoard, false, true);
  shifter(fakeBoard, true, false);
  shifter(fakeBoard, false, false);
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
      this.score += shifter(this.board, false, false);
      break;
    case 40: //down
      this.score += shifter(this.board, true, false);
      // console.log('down');
      break;
    case 37: //left
      // console.log('left');
      this.score += shifter(this.board, false, true);

      break;
    case 39: //right
      // console.log('right');
      this.score += shifter(this.board, true, true);
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

Game.prototype.updateScore = function(){
  $("#score-value").empty();
  $("#score-value").append(this.score);
};

Game.prototype.clearBoard = function(){
  $(".tile").remove();
};

$(document).ready(function() {
  console.log("ready to go!");
  // Any interactive jQuery functionality
  var game = new Game();
  game.drawBoard();
  game.updateScore();


  $('body').keydown(function(event){
    var arrows = [37, 38, 39, 40];
    if (arrows.indexOf(event.which) > -1) {
      var tile = $('.tile');

      game.moveTile(tile, event.which);
      game.addTile();
      game.clearBoard();
      game.drawBoard();
      game.updateScore();
      game.checkWinner();
      if (game.win || game.lose) {
        console.log("Game Over, lost: " + game.lose + ", win: " + game.win);
      }
    }
  });
});
