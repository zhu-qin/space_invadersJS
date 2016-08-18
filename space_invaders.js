const Alien = require('./moving_aliens');
const Ship = require('./moving_ship');
const Bullet = require('./moving_bullets');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

function Game(ctx){
  this.aliens = [];
  this.wall = [];
  this.bullets = [];
  this.counter = 0;
  this.ctx = ctx;
  this.hoverGap = 40;
  this.shipBullet = {x:0, y: -3};
  this.shipRight = {x: 10, y: 0};
  this.shipLeft = {x: -10, y: 0};
  this.alienRight = {x: 4, y: 0};
  this.alienLeft = {x: -4, y: 0};
  this.bulletRadius = 5;
  this.ship = [new Ship({x_pos: 400, y_pos: 760, radius: 30, game: this})];
}


Game.prototype.add = function (obj) {
  if (obj instanceof Alien) {
    this.aliens.push(obj);
  } else if (obj instanceof Bullet) {
    this.bullets.push(obj);
  } else if (obj instanceof Ship) {
    this.ship.push(obj);
  }
};

Game.prototype.makeShip = function () {
  let ship = new Ship({x_pos: 400, y_pos: 760, radius: 30, game: this});
  this.add(ship);
};


Game.prototype.makeAliens = function (){
  for (let i = 100; i <= 800 ;i += 120) {
    for (let j = 50; j <= 250; j += 50){
      let alien = new Alien({
        x_pos: i,
        y_pos: j,
        radius: 20,
        game: this
      });
      this.add(alien);
    }
  }
};

Game.prototype.clear = function () {
  this.ctx.clearRect(0,0, canvas.width, canvas.height);
};

Game.prototype.drawAll = function (){
  let allObjects = this.aliens.concat(this.wall, this.ship, this.bullets)
  allObjects.forEach((obj) => {
    obj.draw(this.ctx);
  });
};

Game.prototype.moveAliensRight = function (){
  this.aliens.forEach((alien) => {
    alien.moveObj(this.alienRight);
  });
};

Game.prototype.moveAliensLeft = function (){
  this.aliens.forEach((alien) => {
    alien.moveObj(this.alienLeft);
  });
};

Game.prototype.moveAliens = function (){
  let gap = this.hoverGap;
  if (this.counter >= gap/2) {
    this.counter += 1;
    this.counter = this.counter%gap;
    this.moveAliensRight();
  } else if (this.counter >= 0) {
    this.counter += 1;
    this.counter = this.counter%gap;
    this.moveAliensLeft();
  }
};

Game.prototype.moveBullets = function (){
  this.bullets.forEach((bullet) => {
    bullet.moveObj(this.shipBullet);
  });
};

Game.prototype.moveAll = function () {
  this.clear();
  this.ship[0].activateShip();
  this.moveBullets();
  this.moveAliens();
  this.drawAll();
};

Game.prototype.play = function (){
  setInterval(this.moveAll.bind(this), 70);
};

let game = new Game(ctx);

game.makeAliens();
game.play();
