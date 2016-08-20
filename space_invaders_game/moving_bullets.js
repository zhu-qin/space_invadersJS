const MovingObject = require("./moving_objects");
const Utils = require("./utils");

function Bullet(params) {
  params.radius = Utils.bulletRadius;
  MovingObject.call(this, params);
}

Utils.inherits(Bullet, MovingObject);

module.exports = Bullet;
