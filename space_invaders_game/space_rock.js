const Images = require('./images');
const MovingObject = require('./moving_objects');
const Utils = require('./utils');

function SpaceRock(params){
  this.velocity = {x:4, y: -1};
  this.x_pos = params.x_pos;
  this.y_pos = params.y_pos;
  this.frameWidth = 256;
  this.frameHeight = 256;
  this.game = params.game;
  this.ctx = params.game.ctx;
  this.frameX = 0;
  this.frameY = 0;
  this.radius = Utils.rockRadius;
  this.image = Images.rocks;
}

Utils.inherits(SpaceRock, MovingObject);


SpaceRock.prototype.draw = function (){
  this.game.ctx.beginPath();
  this.game.ctx.arc(this.x_pos, this.y_pos, this.radius, 0, Math.PI*2, true);
  this.game.ctx.stroke();

  this.ctx.drawImage(
    this.image,
    this.frameX,
    this.frameY,
    this.frameWidth,
    this.frameHeight,
    this.x_pos - Utils.offsetRock,
    this.y_pos - Utils.offsetRock,
    this.frameWidth/2,
    this.frameHeight/2
  );

  this.frameX += this.frameWidth;

  if (this.frameX >= 2048) {
    this.frameX = 0;
    this.frameY += this.frameHeight;
  }
  // do this later
  if (this.frameY >= 2048/2) {
    this.frameY = 0;
      }
};

SpaceRock.prototype.moveObj = function (){
  if (this.x_pos >= (Utils.canvasWidth - this.radius) || this.x_pos <= (0 + this.radius)) {
    let newVel = -this.velocity.x;
    this.velocity.x = newVel;
  }
  this.x_pos += this.velocity.x;
  if (this.y_pos >= (Utils.canvasHeight - this.radius) || this.y_pos <= (0 + this.radius )) {
    let newVel = -this.velocity.y;
    this.velocity.y = newVel;
  }
  this.y_pos += this.velocity.y;
};

module.exports = SpaceRock;