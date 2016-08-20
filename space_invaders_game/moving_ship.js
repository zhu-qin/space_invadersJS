const MovingObject = require("./moving_objects");
const Bullet = require('./moving_bullets');
const Images = require('./images');
const Utils = require("./utils");


function Ship(params){
  this.leftPressed = false;
  this.rightPresed = false;
  this.spacePressed = false;
  this.timeOut = 0;
  MovingObject.call(this, params);
  this.startShip();
}

Utils.inherits(Ship, MovingObject);

Ship.prototype.addListeners = function (){
  document.addEventListener("keydown",this._handleKeyDown.bind(this));
  document.addEventListener("keyup",this._handleKeyUp.bind(this));
};

Ship.prototype._handleKeyDown = function(e) {
  if (e.keyCode === 65) {
    this.leftPressed = true;
  } else if (e.keyCode === 68) {
    this.rightPresed = true;
  }
  if (e.keyCode === 32) {
    this.spacePressed = true;
  }
};


Ship.prototype._handleKeyUp = function(e) {
  if (e.keyCode === 65) {
    this.leftPressed = false;
  } else if (e.keyCode === 68) {
    this.rightPresed = false;
  }
  if (e.keyCode === 32){
    this.timeOut = 0;
    this.spacePressed = false;
  }
};

Ship.prototype.fire = function () {
  let params = {};
  params.x_pos = this.x_pos;
  params.y_pos = this.y_pos;
  params.game = this.game;
  params.image = Images.ship_bullet;
  let bullet = new Bullet(params);
  this.game.shipBullets.push(bullet);

};

Ship.prototype.startShip = function () {
  this.addListeners();
};

Ship.prototype.moveShip = function () {
  if (this.leftPressed === true && this.x_pos > this.radius) {
    this.moveObj(Utils.shipLeft);
  }
  if (this.rightPresed === true && this.x_pos < this.game.ctx.canvas.width - this.radius) {
    this.moveObj(Utils.shipRight);
  }
  if (this.spacePressed === true) {
    this.timeOut = this.timeOut % 10;
    if (this.timeOut % 10 === 0){
      this.fire();
    }
    this.timeOut += 1;
  }
};

module.exports = Ship;
