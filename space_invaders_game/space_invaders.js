const Alien = require('./moving_aliens');
const SpecialAlien = require('./moving_special_aliens');
const Ship = require('./moving_ship');
const Bullet = require('./moving_bullets');
const Utils = require('./utils');
const MovingObject = require('./moving_objects');
const SpaceRock = require('./space_rock');
const Explosion = require('./explosion.js');
const Images = require('./images');

function Game(ctx){
  this.ctx = ctx;
  this.aliens = [];
  this.rocks = [];
  this.shipBullets = [];
  this.alienBullets = [];
  this.ship = [];
  this.shipLives = [];
  this.specialAliens = [];
  this.explosions = [];
  this.counter = 0;
  this.shipHealth = Utils.shipHealth;
  this.score = 0;
  this.scoreArray = [];
  this.intervals = [];
  this.backgroundImage = Images.background;
}

// draw methods

Game.prototype.makeShip = function () {
  let ship = new Ship({x_pos: 400, y_pos: 720, radius: 25, game: this, image: Images.ship});
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
  });
  this.explosions.push(explode);
};

Game.prototype.makeLives = function () {
  for (let i = 1; i <= this.shipHealth; i += 1) {
    let shipLife = new MovingObject({
      x_pos: this.ctx.canvas.width - i*50,
      y_pos: 40,
      radius: 2,
      image: Images.ship,
      game: this
    });
    this.shipLives.push(shipLife);
  }
};

Game.prototype.makeRocks = function (){
  let rocks = new SpaceRock({
    x_pos: 600,
    y_pos: 600,
    radius: 5,
    game: this
  });

  this.rocks.push(rocks);
};

Game.prototype.drawScore = function (){
    this.ctx.font = "48px serif";
    this.ctx.fillStyle = "#fff";
    this.ctx.fillText(`Score: ${this.score}`, 10, 40);

};

Game.prototype.makeAliens = function (){
  for (let i = 100; i <= 800 ;i += 150) {
    for (let j = 100; j <= 300; j += 50){
      let alien = new Alien({
        x_pos: i,
        y_pos: j,
        radius: 20,
        game: this,
        image: Images.green_invader
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

// move bullets and check collisions
Game.prototype.moveShipBullets = function (){
  this.shipBullets.forEach((bullet, bulletIndex) => {
    bullet.moveObj(Utils.shipBullet);
    if (bullet.y_pos <= 0 - Utils.canvasHeight*(0.2)) {
      this.shipBullets.shift();
    }
    this.aliens.forEach((alien, alienIndex) => {
      if(bullet.collideWith(alien)){
        this.aliens.splice(alienIndex, 1);
        if (alien instanceof SpecialAlien) {
          this.score += 50;
        }
        this.shipBullets.splice(bulletIndex, 1);
        this.makeExplosion({x: alien.x_pos - Utils.offsetExplosion, y: alien.y_pos - Utils.offsetExplosion});
        this.score += 10;
      }

    });

    this.rocks.forEach((rock) => {
      if (bullet.collideWith(rock)){
        this.makeExplosion({x: rock.x_pos - Utils.offsetExplosion, y: rock.y_pos - Utils.offsetExplosion});
        rock.velocity.y -= 3;
        this.shipBullets.splice(bulletIndex, 1);
      }
    });

  });
};

Game.prototype.moveAlienBullets = function (){
  this.alienBullets.forEach((bullet, bulletIndex) => {
    bullet.moveObj(Utils.alienBullet);
    if (bullet.y_pos >= Utils.canvasHeight*1.2) {
      this.alienBullets.shift();
    }

    if (bullet.collideWith(this.ship[0])){
      this.makeExplosion({x: this.ship[0].x_pos - Utils.offsetExplosion, y: this.ship[0].y_pos - Utils.offsetExplosion});
      this.alienBullets.splice(bulletIndex, 1);
      this.shipLives.pop();
    }

    this.rocks.forEach((rock) => {
      if (bullet.collideWith(rock)){
        this.makeExplosion({x: rock.x_pos - Utils.offsetExplosion, y: rock.y_pos - Utils.offsetExplosion});
        rock.velocity.y += 1;
        this.alienBullets.splice(bulletIndex, 1);
      }
    });


  });
};

Game.prototype.moveRocks = function () {
  this.rocks.forEach((rock) => {
    rock.moveObj();
    this.aliens.forEach((alien, alienIndex) => {
      if (rock.collideWith(alien)) {
        this.makeExplosion({x: rock.x_pos - Utils.offsetExplosion, y: rock.y_pos - Utils.offsetExplosion});
        this.aliens.splice(alienIndex, 1);
        if (alien instanceof SpecialAlien) {
          this.score += 50;
        }
          this.score += 10;
      }
    });

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
  this.alienFire = setInterval(alienFire, Utils.bulletFrequency);
  this.intervals.push(this.alienFire);
};


Game.prototype.gameWon = function () {
  if (this.aliens.length === 0) {
    this.intervals.forEach((int)=> {
      clearInterval(int);
    });
    this.showMenu();
  }
};

Game.prototype.gameLost = function () {
  if (this.shipLives.length === 0) {
    this.intervals.forEach((int)=> {
      clearInterval(int);
    });
    this.restart();

  }
};
Game.prototype.drawAll = function (){
  this.drawBackground();
  this.drawScore();
  let allObjects = this.aliens.concat(
    this.ship,
    this.shipBullets,
    this.alienBullets,
    this.explosions,
    this.rocks,
    this.shipLives,
    this.scoreArray,
    this.specialAliens
  );
  allObjects.forEach((obj) => {
    obj.draw();
  });
};

Game.prototype.moveAll = function () {
  this.clear();
  this.ship[0].moveShip();
  this.moveAlienBullets();
  this.moveShipBullets();
  this.wobbleAliens();
  this.moveRocks();
  this.drawAll();
  this.gameWon();
  this.gameLost();
};

Game.prototype.setup = function (){
  this.makeLives();
  this.makeAliens();
  this.makeSpecialAlien();
  this.makeShip();
  this.makeRocks();
  this.setAlienFire();
};

Game.prototype.play = function (){

  this.regularSpawn = setInterval(this.makeAliens.bind(this), 30000);
  this.specialSpawn = setInterval(this.makeSpecialAlien.bind(this), 4000);
  this.timer = setInterval(this.moveAll.bind(this), 60);

  this.intervals.push(this.regularSpawn);
  this.intervals.push(this.specialSpawn);
  this.intervals.push(this.timer);
};

Game.prototype.restart = function(){
  let game = new Game(this.ctx);
  game.showMenu();
};

Game.prototype.showMenu = function (){
  this.clear();
  this.setup();
  this.drawAll();
  this.ctx.drawImage(Images.intro, 280, 300);
  let play = (e) => {
    if (e.keyCode === 13) {
            this.play();
            window.removeEventListener('keydown', play);
          }
        };
  window.addEventListener("keydown", play);
};

module.exports = Game;
