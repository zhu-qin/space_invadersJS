const Game = require('./space_invaders');
const Images = require('./images');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";

let score = document.getElementById('score');
let scoreCtx = score.getContext('2d');


let load = function (){
  let game = new Game(ctx, scoreCtx);
  game.showMenu();
};

Images.loadImages(load);
