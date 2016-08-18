module.exports = {
  inherits: function (ChildClass, ParentClass) {
    function Surrogate(){}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },

  alien: 'images/green_invader.png',
  ship: 'images/galaga.png',
  shipBullet: 'images/green_bullet.png',
  alienBullet: 'images/red_bullet.png',
  background: 'images/space.jpg'
};
