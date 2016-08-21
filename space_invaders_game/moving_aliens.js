const MovingObject = require("./moving_objects");
const Bullet = require("./moving_bullets");
const Images = require('./images');
const Utils = require("./utils");

function Alien(params) {
  MovingObject.call(this, params);
  this.x_pos = params.x_pos;
  this.y_pos = params.y_pos;
  this.game = params.game;
  this.frameWidth = params.frameWidth;
  this.frameHeight = params.frameHeight;
  this.ctx = params.game.ctx;
  this.frameX = params.frameX;
  this.frameY = params.frameY;
  this.image = Images.green_invader;
}

Utils.inherits(Alien, MovingObject);


Alien.prototype.fire = function () {
  let params = {};
  params.image = Images.alien_bullet;
  params.x_pos = this.x_pos;
  params.y_pos = this.y_pos;
  params.game = this.game;
  let bullet = new Bullet(params);
  this.game.alienBullets.push(bullet);

};

// Alien.prototype.draw = function (){
//
// };


module.exports = Alien;
