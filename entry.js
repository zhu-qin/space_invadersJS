const Game = require('./space_invaders');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";

let game = new Game(ctx);


game.play();
