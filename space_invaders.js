const Alien = require('./moving_aliens');
const SpecialAlien = require('./moving_special_aliens');
const Ship = require('./moving_ship');
const Bullet = require('./moving_bullets');
const Utils = require('./utils');
const MovingObject = require('./moving_objects');
const Explosion = require('./explosion.js');

function Game(ctx){
  this.aliens = [];
  this.wall = [];
  this.shipBullets = [];
  this.alienBullets = [];
  this.ship = [];
  this.shipLives = [];
  this.specialAliens = [];
  this.explosions = [];
  this.counter = 0;
  this.ctx = ctx;
  this.shipHealth = Utils.shipHealth;
  this.score = 0;
  this.scoreArray= [];
  this.backgroundImage = new Image();
  this.backgroundImage.src = Utils.background;
}

// draw methods

Game.prototype.makeShip = function () {
  let ship = new Ship({x_pos: 400, y_pos: 720, radius: 25, game: this, image: Utils.ship});
  this.ship.push(ship);
};

Game.prototype.makeExplosion = function (pos) {
  let explode = new Explosion({
    pos: pos,
    frameWidth: 128,
    frameHeight: 128,
    frameX: 0,
    frameY: 0,
    game: this,
    image_src: Utils.explosion
  });
  this.explosions.push(explode);
};

Game.prototype.makeLives = function () {
  for (let i = 1; i <= this.shipHealth; i += 1) {
    let shipLife = new MovingObject({
      x_pos: this.ctx.canvas.width - i*50,
      y_pos: 40,
      radius: 2,
      image: 'images/galaga.png',
      game: this
    });
    this.shipLives.push(shipLife);
  }
};

Game.prototype.drawScore = function (){
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Score: ${this.score}`, 10, 40);

};

Game.prototype.makeAliens = function (){
  for (let i = 100; i <= 800 ;i += 120) {
    for (let j = 100; j <= 300; j += 50){
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

  let alienLeft = new SpecialAlien({
    x_pos: 0 - Utils.alienRadius,
    y_pos: Math.random()*200 + 300,
    move_x: Utils.specialAlienMove,
    game: this
  });

  let alienRight = new SpecialAlien({
    x_pos: this.ctx.canvas.width + Utils.alienRadius,
    y_pos: Math.random()*200 + 300,
    move_x: -Utils.specialAlienMove,
    game: this
  });

  this.aliens.push(alienLeft);
  this.aliens.push(alienRight);
};

Game.prototype.clear = function () {
  this.ctx.clearRect(0,0, canvas.width, canvas.height);
};

Game.prototype.drawAll = function (){
  this.drawBackground();
  this.drawScore();
  let allObjects = this.aliens.concat(
    this.ship,
    this.shipBullets,
    this.alienBullets,
    this.explosions,
    this.shipLives,
    this.scoreArray,
    this.specialAliens
  );
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

  this.specialAliens.forEach((special) => {
    special.moveObj();
  });
};


Game.prototype.wobbleAliens = function (){
  let gap = Utils.hoverGap;
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

    this.aliens.forEach((alien) => {
      if (alien instanceof SpecialAlien) {
        alien.fire();
      }
    });

  }.bind(this);

  setInterval(alienFire, Utils.bulletFrequency);
};



Game.prototype.checkShipCollision = function (){
  this.alienBullets.forEach((bullet, alienIndex)=>{
    if (bullet.collideWith(this.ship[0])){
      this.makeExplosion({x: this.ship[0].x_pos - Utils.offsetExplosion, y: this.ship[0].y_pos - Utils.offsetExplosion});
      this.ship.splice(0, 1);
      this.alienBullets.splice(alienIndex, 1);
      this.shipLives.pop();
      this.makeShip();

    }
  });
};

Game.prototype.checkAlienCollision = function (){
  this.shipBullets.forEach((bullet, bulletIndex)=>{
    this.aliens.forEach((alien, alienIndex) => {
      if(bullet.collideWith(alien)){
        this.aliens.splice(alienIndex, 1);
        if (alien instanceof SpecialAlien) {
          this.makeSpecialAlien();
        }
        this.shipBullets.splice(bulletIndex, 1);
        this.makeExplosion({x: alien.x_pos - Utils.offsetExplosion, y: alien.y_pos - Utils.offsetExplosion});
        this.score += 10;
      }
    });
  });
};

Game.prototype.gameWon = function () {
  if (this.aliens.length < 5) {
    this.makeAliens();
    // clearInterval(this.timer);
    return true;
  }
};

Game.prototype.gameLost = function () {
  if (this.shipLives.length === 0) {
    clearInterval(this.timer);
    this.clear();
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
  this.makeLives();
  this.makeAliens();
  this.makeSpecialAlien();
  this.makeShip();
  this.setAlienFire();
  this.timer = setInterval(this.moveAll.bind(this), 60);
};

module.exports = Game;
