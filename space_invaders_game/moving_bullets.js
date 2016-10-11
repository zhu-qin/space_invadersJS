const MovingObject = require("./moving_objects");
const Utils = require("./utils");

class Bullet extends MovingObject {
  constructor(params){
    params.radius = Utils.bulletRadius;
    super(params);
  }
}

module.exports = Bullet;
