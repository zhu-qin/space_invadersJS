module.exports = {
  inherits: function (ChildClass, ParentClass) {
    function Surrogate(){}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },

  // alien options
  alienRadius: 25,
  specialAlienMove: 5,

  alienRight: {x: 4, y: 0},
  alienLeft: {x: -4, y: 0},
  alienDown: {x: 0, y: 10},
  alienSpawnRate: 15000,
  specialAlienSpawnRate: 4000,

  alienBullet: {x: 0, y: 12},
  shipBullet: {x: 0, y: -20},


  hoverGap: 40,
  bulletRadius: 3,
  bulletFrequency: 500,
  offsetObject: 25,
  offsetExplosion: 50,

  // ship options
  shipHealth: 5,
  shipRight: {x: 6, y: 0},
  shipLeft: {x: -6, y: 0},
  shipDown: {x: 0, y: 6},
  shipUp: {x: 0, y: -6},

  // rock options
  rockRadius: 35,
  offsetRock: 60,

  canvasWidth: 800,
  canvasHeight: 600

};
