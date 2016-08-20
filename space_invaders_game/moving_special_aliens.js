const Alien = require('./moving_aliens');
const Images = require('./images');
const Utils = require('./utils');

function SpecialAlien(params){
  this.game = params.game;
  this.image = Images.red_invader;
  this.radius = Utils.alienRadius;
  this.x_pos = params.x_pos;
  this.y_pos = params.y_pos;
  this.move_x = params.move_x;

}

Utils.inherits(SpecialAlien, Alien);

SpecialAlien.prototype.moveObj = function () {
  this.x_pos += this.move_x;
};

module.exports = SpecialAlien;
