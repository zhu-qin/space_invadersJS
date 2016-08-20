module.exports = {
  inherits: function (ChildClass, ParentClass) {
    function Surrogate(){}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },

  // alien options
  alienRadius: 20,
  specialAlienMove: 5,



  alienRight: {x: 4, y: 0},
  alienLeft: {x: -4, y: 0},
  alienDown: {x: 0, y: 16},

  alienBullet: {x: 0, y: 15},
  shipBullet: {x: 0, y: -25},
  shipRight: {x: 10, y: 0},
  shipLeft: {x: -10, y: 0},

  hoverGap: 40,
  bulletRadius: 3,
  bulletFrequency: 400,
  offsetObject: 25,
  offsetExplosion: 50,

  // ship options
  shipHealth: 5



};
