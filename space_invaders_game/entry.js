const Game = require('./space_invaders');
const Images = require('./images');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";



let load = function (){
  if (Images.loaded) {
    let game = new Game(ctx);
    game.showMenu();
    clearInterval(interval);
  }
};

let interval = setInterval(load, 300);
