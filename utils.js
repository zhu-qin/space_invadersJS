module.exports = {
  inherits: function (ChildClass, ParentClass) {
    function Surrogate(){}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },

  alien: 'images/green_invader.png',
  specialAlien: 'red_invader.png',
  ship: 'images/galaga.png',
  shipBulletImage: 'images/green_bullet.png',
  alienBulletImage: 'images/red_bullet.png',
  background: 'images/space.jpg',


  explosion: 'images/explosion.png',



  alienRight: {x: 4, y: 0},
  alienLeft: {x: -4, y: 0},
  alienDown: {x: 0, y: 8},

  alienBullet: {x: 0, y: 15},
  shipBullet: {x: 0, y: -25},
  shipRight: {x: 10, y: 0},
  shipLeft: {x: -10, y: 0},


  bulletFrequency: 200
};
