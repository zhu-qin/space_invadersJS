const Game = require('./space_invaders');
const Images = require('./images');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";


setTimeout( function () {
  if (Images.loaded) {
    let game = new Game(ctx);
    game.play();
  }
}, 100);
