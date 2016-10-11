const MovingObject = require("./moving_objects");
const Bullet = require('./moving_bullets');
const Images = require('./images');
const Utils = require("./utils");

class Ship extends MovingObject {
  constructor (params) {
    super(params);
    this.leftPressed = false;
    this.rightPressed = false;
    this.upPressed = false;
    this.downPressed = false;
    this.spacePressed = false;
    this.timeOut = 0;
    this.invulnerabilityTimer = params.invulnerabilityTimer;
    this.startShip();
  }

  startShip() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this));
    document.addEventListener("keyup", this._handleKeyUp.bind(this));
  }

  _handleKeyDown(e){
    if (e.keyCode === 65) {
      this.leftPressed = true;
    } else if (e.keyCode === 68) {
      this.rightPressed = true;
    }

    if (e.keyCode === 83) {
      this.downPressed = true;
    } else if (e.keyCode === 87) {
      this.upPressed = true;
    }

    if (e.keyCode === 32) {
      this.spacePressed = true;
    }
  }

  _handleKeyUp(e) {
    if (e.keyCode === 65) {
      this.leftPressed = false;
    } else if (e.keyCode === 68) {
      this.rightPressed = false;
    }

    if (e.keyCode === 83) {
      this.downPressed = false;
    } else if (e.keyCode === 87) {
      this.upPressed = false;
    }

    if (e.keyCode === 32){
      this.timeOut = 0;
      this.spacePressed = false;
    }
  }

  fire() {
    let params = {};
    params.x_pos = this.x_pos;
    params.y_pos = this.y_pos;
    params.game = this.game;
    params.image = Images.ship_bullet;
    let bullet = new Bullet(params);
    this.game.shipBullets.push(bullet);
  }

  moveShip() {
    if (this.leftPressed === true && this.x_pos > this.radius) {
      this.moveObj(Utils.shipLeft);
    }
    if (this.rightPressed === true && this.x_pos < this.game.ctx.canvas.width - this.radius) {
      this.moveObj(Utils.shipRight);
    }
    if (this.upPressed === true && this.y_pos > this.radius) {
      this.moveObj(Utils.shipUp);
    }
    if (this.downPressed === true && this.y_pos < this.game.ctx.canvas.height - this.radius) {
      this.moveObj(Utils.shipDown);
    }
    if (this.spacePressed === true) {
      this.timeOut = this.timeOut % 10;
      if (this.timeOut % 10 === 0){
        this.fire();
      }
      this.timeOut += 1;
    }
  }

  draw() {
    // let x = this.x_pos;
    // let y = this.y_pos;
    // this.game.ctx.beginPath();
    // this.game.ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
    // this.game.ctx.stroke();
    if (this.invulnerabilityTimer%3 === 0) {
      this.showImage();
    }

    if (this.invulnerabilityTimer > 0) {
      this.invulnerabilityTimer -= 1;
    }
  }

}

module.exports = Ship;
