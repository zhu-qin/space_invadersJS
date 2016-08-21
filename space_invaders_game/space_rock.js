const Images = require('./images');
const MovingObject = require('./moving_objects');
const Utils = require('./utils');

function SpaceRock(params){
  this.velocity = {x:4, y: -1};
  this.pos = params.pos;
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
  this.ctx.drawImage(
    this.image,
    this.frameX,
    this.frameY,
    this.frameWidth,
    this.frameHeight,
    this.pos.x,
    this.pos.y,
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
console.log(this.radius);
  if (this.pos.x >= (Utils.canvasWidth - this.radius) || this.pos.x <= (0 + this.radius)) {

    let newVel = -this.velocity.x;
    this.velocity.x = newVel;
  }
  this.pos.x += this.velocity.x;
  if (this.pos.y >= (Utils.canvasHeight + this.radius) || this.pos.y <= (0 + this.radius )) {
    let newVel = -this.velocity.y;
    this.velocity.y = newVel;
  }
  this.pos.y += this.velocity.y;
};

module.exports = SpaceRock;
