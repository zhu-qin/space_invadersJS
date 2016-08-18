const MovingObject = require("./moving_objects");
const Bullet = require('./moving_bullets');
const Utils = require("./utils");


function Ship(params){
  this.leftPressed = false;
  this.rightPresed = false;
  this.spacePressed = false;
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
    this.spacePressed = false;
  }
};

Ship.prototype.fire = function () {
  let params = {};
  params.x_pos = this.x_pos;
  params.y_pos = this.y_pos;
  params.game = this.game;
  let bullet = new Bullet(params);
  this.game.add(bullet);

};

Ship.prototype.startShip = function () {
  this.addListeners();
};

Ship.prototype.activateShip = function () {
  if (this.leftPressed === true) {
    this.moveObj(this.game.shipLeft);
  }
  if (this.rightPresed === true) {
    this.moveObj(this.game.shipRight);
  }
  if (this.spacePressed === true) {
    this.fire();
  }
};




module.exports = Ship;
