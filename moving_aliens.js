const MovingObject = require("./moving_objects");
const Bullet = require("./moving_bullets");
const Utils = require("./utils");

function Alien(params) {
  MovingObject.call(this, params);
}

Utils.inherits(Alien, MovingObject);


Alien.prototype.fire = function () {
  let params = {};
  params.x_pos = this.x_pos;
  params.y_pos = this.y_pos;
  params.game = this.game;
  params.image = Utils.alienBulletImage;
  let bullet = new Bullet(params);
  this.game.alienBullets.push(bullet);

};


module.exports = Alien;
