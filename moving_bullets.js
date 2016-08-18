const MovingObject = require("./moving_objects");
const Util = require("./utils");

function Bullet(params) {
  params.radius = params.game.bulletRadius;
  MovingObject.call(this, params);
}

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
