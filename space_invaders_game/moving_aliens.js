const MovingObject = require("./moving_objects");
const Bullet = require("./moving_bullets");
const Images = require('./images');
const Utils = require("./utils");

function Alien(params) {
  MovingObject.call(this, params);
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


module.exports = Alien;
