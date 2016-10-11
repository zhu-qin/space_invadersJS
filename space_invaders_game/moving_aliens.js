const MovingObject = require("./moving_objects");
const Bullet = require("./moving_bullets");
const Images = require('./images');
const Utils = require("./utils");

class Alien extends MovingObject {
  constructor (params) {
    super(params);
    this.frameWidth = params.frameWidth;
    this.frameHeight = params.frameHeight;
    this.ctx = params.game.ctx;
    this.frameX = params.frameX;
    this.frameY = params.frameY;
    this.image = Images.green_invader;
  }

  fire() {
    let params = {};
    params.image = Images.alien_bullet;
    params.x_pos = this.x_pos;
    params.y_pos = this.y_pos;
    params.game = this.game;
    let bullet = new Bullet(params);
    this.game.alienBullets.push(bullet);
  }

}

module.exports = Alien;
