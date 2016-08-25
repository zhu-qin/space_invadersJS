const Images = require('./images');

function Explosion(params){
  this.pos = params.pos;
  this.frameWidth = params.frameWidth;
  this.frameHeight = params.frameHeight;
  this.game = params.game;
  this.ctx = params.game.ctx;
  this.frameX = params.frameX;
  this.frameY = params.frameY;
  this.image = Images.explosion;
}


Explosion.prototype.draw = function (){
  this.ctx.drawImage(
    this.image,
    this.frameX,
    this.frameY,
    this.frameWidth,
    this.frameHeight,
    this.pos.x,
    this.pos.y,
    this.frameWidth,
    this.frameHeight
  );

  this.frameX += this.frameWidth;

  if (this.frameX >= 640) {
    this.frameX = 0;
    this.frameY += this.frameHeight;
  }

  if (this.frameY > 1152) {
    this.game.explosions.shift();
      }
};



module.exports = Explosion;
