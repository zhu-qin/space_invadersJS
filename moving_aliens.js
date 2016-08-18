const MovingObject = require("./moving_objects");
const Utils = require("./utils");

function Alien(params) {
  MovingObject.call(this, params);
}

Utils.inherits(Alien, MovingObject);


module.exports = Alien;
