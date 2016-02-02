var Game = function() {
  this.board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
  this.addTile();
  this.addTile();
};


Game.prototype.addTile = function() {
  var row = Math.floor(Math.random() * 3);
  var column = Math.floor(Math.random() * 3);
  while (game.board[row][column] !== 0) {
    row = Math.floor(Math.random() * 3);
    column = Math.floor(Math.random() * 3);
  }
  var options = [2,2,4];
  var value = options[Math.floor(Math.random() * options.length)];
  this.board[row][column] = value;
};


// Game.prototype.moveTile = function(tile, direction) {
//   // Game method here
//   switch(direction) {
//     case 38: //up
//       console.log('up');
//       break;
//     case 40: //down
//       console.log('down');
//       break;
//     case 37: //left
//       console.log('left');
//       break;
//     case 39: //right
//       console.log('right');
//       break;
//   }
// };
//
// $(document).ready(function() {
//   console.log("ready to go!");
//   // Any interactive jQuery functionality
//   var game = new Game();
//
//   $('body').keydown(function(event){
//     var arrows = [37, 38, 39, 40];
//     if (arrows.indexOf(event.which) > -1) {
//       var tile = $('.tile');
//
//       game.moveTile(tile, event.which);
//     }
//   });
// });
