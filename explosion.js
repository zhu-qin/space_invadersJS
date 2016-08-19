function Explosion(params){
  this.pos = params.pos;
  this.frameWidth = params.frameWidth;
  this.frameHeight = params.frameHeight;
  this.game = params.game;
  this.ctx = params.game.ctx;
  this.frameX = params.frameX;
  this.frameY = params.frameY;
  this.image = new Image();
  this.image.src = params.image_src;
}


Explosion.prototype.draw = function (){

  this.ctx.drawImage(this.image, this.frameX, this.frameY, this.frameWidth, this.frameHeight,
                    this.pos.x, this.pos.y, this.frameWidth, this.frameHeight);

                    this.frameX += this.frameWidth;


                    if (this.frameX >= 320) {
                      this.frameX = 0;
                      this.frameY += this.frameHeight;
                    }

                    if (this.frameY >= 320) {
                      this.game.explosions;
                    }

};

Explosion.prototype.animate = function (){
  this.explode = setInterval(this.draw.bind(this), 50);
};

module.exports = Explosion;
