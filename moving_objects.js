function MovingObject(params) {
  this.x_pos = params.x_pos;
  this.y_pos = params.y_pos;
  this.game = params.game;
  this.radius = params.radius;
}

MovingObject.prototype.draw = function (ctx){
  let x = this.x_pos;
  let y = this.y_pos;
  ctx.beginPath();
  ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
  ctx.stroke();
};

MovingObject.prototype.moveObj = function (vector){
  this.x_pos += vector.x;
  this.y_pos += vector.y;
};


module.exports = MovingObject;
