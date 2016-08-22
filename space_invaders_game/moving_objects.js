Utils = require('./utils');

function MovingObject(params) {
  this.image = params.image;
  this.x_pos = params.x_pos;
  this.y_pos = params.y_pos;
  this.game = params.game;
  this.radius = params.radius;
}

MovingObject.prototype.draw = function (){
  let x = this.x_pos;
  let y = this.y_pos;
  this.game.ctx.beginPath();
  this.game.ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
  this.game.ctx.stroke();
  this.showImage();
};

MovingObject.prototype.showImage = function () {
    this.game.ctx.drawImage(this.image, this.x_pos - Utils.offsetObject , this.y_pos - Utils.offsetObject, 50, 50);
};

MovingObject.prototype.moveObj = function (vector){
  this.x_pos += vector.x;
  this.y_pos += vector.y;
};

MovingObject.prototype.collideWith = function (otherObj) {
  let distance = Math.sqrt(Math.pow((this.x_pos - otherObj.x_pos), 2) + Math.pow((this.y_pos - otherObj.y_pos), 2));
  if (distance < this.radius + otherObj.radius) {
    return true;
  }
  return false;
};


module.exports = MovingObject;
