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

Game.prototype.moveTile = function(tile, direction) {
  // Game method here
  switch(direction) {
    case 38: //up
      console.log('up');
      break;
    case 40: //down
      console.log('down');
      break;
    case 37: //left
      console.log('left');
      break;
    case 39: //right
      console.log('right');
      break;
  }
};

Game.prototype.drawBoard = function(){
  for(var row = 0; row < this.board.length; row++) {
    for(var col = 0; col < this.board.length; col++)
    $("#gameboard").append($("<div class=\"tile\" data-row=\"r" + row + "\", data-col=\"c" + col + "\" data-val=\"" + this.board[row][col] + "\">" + this.board[row][col] + "</div>"));
  }
};

Game.prototype.clearBoard = function(){

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
    }
  });
});
