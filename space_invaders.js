const Alien = require('./moving_aliens');
const Ship = require('./moving_ship');
const Bullet = require('./moving_bullets');
const Utils = require('./utils');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";

function Game(ctx){
  this.aliens = [];
  this.wall = [];
  this.shipBullets = [];
  this.alienBullets = [];
  this.ship = [];
  this.counter = 0;
  this.ctx = ctx;
  this.hoverGap = 40;
  this.bulletFrequency = 200;
  this.alienBullet = {x: 0, y: 15};
  this.shipBullet = {x: 0, y: -25};
  this.shipRight = {x: 10, y: 0};
  this.shipLeft = {x: -10, y: 0};
  this.alienRight = {x: 4, y: 0};
  this.alienLeft = {x: -4, y: 0};
  this.bulletRadius = 5;
  this.backgroundImage = new Image();
  this.backgroundImage.src = Utils.background;

}


Game.prototype.makeShip = function () {
  let ship = new Ship({x_pos: 400, y_pos: 760, radius: 25, game: this, image: Utils.ship});
  this.ship.push(ship);
};


Game.prototype.makeAliens = function (){
  for (let i = 100; i <= 800 ;i += 120) {
    for (let j = 50; j <= 250; j += 50){
      let alien = new Alien({
        x_pos: i,
        y_pos: j,
        radius: 20,
        game: this,
        image: Utils.alien
      });
      this.aliens.push(alien);
    }
  }
};

Game.prototype.clear = function () {
  this.ctx.clearRect(0,0, canvas.width, canvas.height);
};

Game.prototype.drawAll = function (){
  this.drawBackground();
  let allObjects = this.aliens.concat(this.ship, this.shipBullets, this.alienBullets);
  allObjects.forEach((obj) => {
    obj.draw();
  });

};

Game.prototype.drawBackground = function () {
  this.ctx.drawImage(this.backgroundImage, 0, 0);
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

Game.prototype.moveShipBullets = function (){
  this.shipBullets.forEach((bullet) => {
    bullet.moveObj(this.shipBullet);
  });
};

Game.prototype.moveAlienBullets = function (){
  this.alienBullets.forEach((bullet) => {
    bullet.moveObj(this.alienBullet);
  });
};

Game.prototype.setAlienFire = function () {

  let alienFire = function () {
    let alien = Math.floor(Math.random()*this.aliens.length);
    this.aliens[alien].fire();
  }.bind(this);

  setInterval(alienFire, this.bulletFrequency);
};

Game.prototype.checkShipCollision = function (){
  this.alienBullets.forEach((bullet, alienIndex)=>{
    if (bullet.collideWith(this.ship[0])){
      this.ship.splice(0, 1);
      this.alienBullets.splice(alienIndex, 1);
    }
  });
};

Game.prototype.checkAlienCollision = function (){
  this.shipBullets.forEach((bullet, bulletIndex)=>{
    this.aliens.forEach((alien, alienIndex) => {
      if(bullet.collideWith(alien)){
        this.aliens.splice(alienIndex, 1);
        this.shipBullets.splice(bulletIndex, 1);
      }
    });
  });
};

Game.prototype.gameWon = function () {
  if (this.aliens.length === 0) {
    clearInterval(this.timer);
    return true;
  }
};

Game.prototype.gameLost = function () {

  if (this.ship.length === 0) {
    clearInterval(this.timer);
    return true;
  }
};


Game.prototype.moveAll = function () {
  this.clear();
  this.ship[0].activateShip();
  this.moveAlienBullets();
  this.moveShipBullets();
  this.moveAliens();
  this.checkShipCollision();
  this.checkAlienCollision();
  this.gameWon();
  this.gameLost();
  this.drawAll();
};

Game.prototype.play = function (){
  this.makeAliens();
  this.makeShip();
  this.setAlienFire();
  this.timer = setInterval(this.moveAll.bind(this), 60);
};

let game = new Game(ctx);

game.play();
