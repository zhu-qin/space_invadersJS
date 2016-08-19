const Alien = require('./moving_aliens');
const Ship = require('./moving_ship');
const Bullet = require('./moving_bullets');
const Utils = require('./utils');
const Explosion = require('./explosion.js');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.strokeStyle = "transparent";

function Game(ctx){
  this.aliens = [];
  this.wall = [];
  this.shipBullets = [];
  this.alienBullets = [];
  this.ship = [];
  this.specialAliens = [];
  this.explosions = [];
  this.counter = 0;
  this.ctx = ctx;
  this.hoverGap = 40;
  this.alienBullet = {x: 0, y: 15};
  this.shipBullet = {x: 0, y: -25};
  this.shipRight = {x: 10, y: 0};
  this.shipLeft = {x: -10, y: 0};
  this.bulletRadius = 3;
  this.backgroundImage = new Image();
  this.backgroundImage.src = Utils.background;

}


Game.prototype.makeShip = function () {
  let ship = new Ship({x_pos: 400, y_pos: 720, radius: 25, game: this, image: Utils.ship});
  this.ship.push(ship);
};

Game.prototype.makeExplosion = function (pos) {
  let explode = new Explosion({
    pos: pos,
    frameWidth: 64,
    frameHeight: 64,
    frameX: 0,
    frameY: 0,
    game: this,
    image_src: Utils.explosion
  });
  this.explosions.push(explode);
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

// work on this tommorrow
Game.prototype.makeSpecialAlien = function () {
  let x = Math.floor(Math.random()*1.9)*800;
  let y = Math.random()*400 + 200;

  let alien = new Alien({
    x_pos: x,
    y_pos: y,
    radius: 20,
    game: this,
    image: Utils.specialAlien
  });
  let specialAlienMove;
  if (x === 0) {
     specialAlienMove = alien.moveObj.bind(alien, Utils.specialAlienRight);
  } else {
    specialAlienMove = alien.moveObj.bind(alien, Utils.specialAlienLeft);
  }


  this.special.push(specialAlienMove);
  this.specialAliens.push(alien);
};

Game.prototype.clear = function () {
  this.ctx.clearRect(0,0, canvas.width, canvas.height);
};

Game.prototype.drawAll = function (){
  this.drawBackground();
  let allObjects = this.aliens.concat(this.ship, this.shipBullets, this.alienBullets, this.explosions, this.specialAliens);
  allObjects.forEach((obj) => {
    obj.draw();
  });
};

Game.prototype.drawBackground = function () {
  this.ctx.drawImage(this.backgroundImage, 0, 0);
};

Game.prototype.moveAliens = function (alienMove){
  this.aliens.forEach((alien) => {
    alien.moveObj(alienMove);
  });
};


Game.prototype.wobbleAliens = function (){
  let gap = this.hoverGap;
  if (this.counter >= gap/2) {
    this.counter += 1;
    this.counter = this.counter%gap;
    this.moveAliens(Utils.alienRight);
  } else if (this.counter >= 0) {
    this.counter += 1;
    this.counter = this.counter%gap;
    this.moveAliens(Utils.alienLeft);
  }
  if (this.counter === gap -1 ) {
    this.moveAliens(Utils.alienDown);
  }
};

Game.prototype.moveShipBullets = function (){
  this.shipBullets.forEach((bullet) => {
    bullet.moveObj(Utils.shipBullet);
  });
};

Game.prototype.moveAlienBullets = function (){
  this.alienBullets.forEach((bullet) => {
    bullet.moveObj(Utils.alienBullet);
  });
};

Game.prototype.setAlienFire = function () {

  let alienFire = function () {
    let index = Math.floor(Math.random()*this.aliens.length);
    this.aliens[index].fire();
  }.bind(this);

  setInterval(alienFire, Utils.bulletFrequency);
};

Game.prototype.checkShipCollision = function (){
  this.alienBullets.forEach((bullet, alienIndex)=>{
    if (bullet.collideWith(this.ship[0])){
      this.makeExplosion({x: this.ship[0].x_pos, y: this.ship[0].y_pos});
      this.ship.splice(0, 1);
      this.alienBullets.splice(alienIndex, 1);
      this.makeShip();

    }
  });
};

Game.prototype.checkAlienCollision = function (){
  this.shipBullets.forEach((bullet, bulletIndex)=>{
    this.aliens.forEach((alien, alienIndex) => {
      if(bullet.collideWith(alien)){
        this.aliens.splice(alienIndex, 1);
        this.shipBullets.splice(bulletIndex, 1);
        this.makeExplosion({x: alien.x_pos, y: alien.y_pos});
      }
    });
  });
};

Game.prototype.gameWon = function () {
  if (this.aliens.length === 0) {
    // clearInterval(this.timer);
    return true;
  }
};

Game.prototype.gameLost = function () {

  if (this.ship.length === 0) {
    // clearInterval(this.timer);
    return true;
  }
};


Game.prototype.moveAll = function () {
  this.clear();
  this.ship[0].moveShip();
  this.moveAlienBullets();
  this.moveShipBullets();
  this.wobbleAliens();
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
