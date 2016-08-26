const Game = require('./space_invaders');
const Images = require('./images');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";

let score = document.getElementById('score');
let scoreCtx = score.getContext('2d');

function GameView(ctx, scoreCtx) {
  this.ctx = ctx;
  this.scoreCtx = scoreCtx;
  this.game = new Game(ctx, scoreCtx);
}

GameView.prototype.start = function (){
  this.game.showMenu();
};



let load = function (){
  if (Images.loaded) {
    let gameView = new GameView(ctx, scoreCtx);
    gameView.start();
  }
};

let interval = setTimeout(load, 800);
