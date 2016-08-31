const Game = require('./space_invaders');
const Images = require('./images');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.font = "24px serif";
ctx.fillStyle = "#fff";
ctx.strokeStyle = "transparent";

if (!localStorage.highScores) {
  localStorage.highScores = "0";
}



let load = function (){
  let game = new Game(ctx);
  game.showMenu();
};

Images.loadImages(ctx, load);
