const Alien = require('./moving_aliens');
const SpecialAlien = require('./moving_special_aliens');
const Ship = require('./moving_ship');
const Bullet = require('./moving_bullets');
const Utils = require('./utils');
const MovingObject = require('./moving_objects');
const SpaceRock = require('./space_rock');
const Explosion = require('./explosion.js');
const Images = require('./images');

class Game {
  constructor(ctx){
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
    this.score = 0;
    this.intervals = [];
  }

// draw methods
  makeShip() {
    let invulnerabilityTimer = 60;
    if (this.shipLives.length === 0) {
      invulnerabilityTimer = 0;
    }
    let ship = new Ship({
       x_pos: 400,
       y_pos: 575,
       radius: 25,
       game: this,
       image: Images.ship,
       invulnerabilityTimer: invulnerabilityTimer
     });
    this.ship.push(ship);
  }

  makeExplosion(pos) {
    let explode = new Explosion({
      pos: pos,
      frameWidth: 128,
      frameHeight: 128,
      frameX: 0,
      frameY: 0,
      game: this,
    });
    this.explosions.push(explode);
  }

  makeLives() {
    for (let i = 1; i <= Utils.shipLives; i += 1) {
      let shipLife = new MovingObject({
        x_pos: this.ctx.canvas.width - i*50,
        y_pos: 40,
        radius: 2,
        image: Images.ship,
        game: this
      });
      this.shipLives.push(shipLife);
    }
  }

  makeRocks() {
    let rocks = new SpaceRock({
      x_pos: 400,
      y_pos: 400,
      game: this
    });
    this.rocks.push(rocks);
  }

  drawScore() {
      this.ctx.fillText(`High Score: ${localStorage.highScores}`, 10, 20);
      this.ctx.fillText(`Current Score: ${this.score}`, 10, 40);
  }

  makeAliens() {
    for (let i = 115; i <= 800 ;i += 120) {
      for (let j = 80; j <= 200; j += 50){
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
  }

  makeSpecialAlien() {
    let x = Math.floor(Math.random()*1.9)*800;
    let y = Math.random()*400 + 200;

    let alienLeft = new SpecialAlien({
      x_pos: 0 - Utils.alienRadius,
      y_pos: Math.random()*100 + 300,
      move_x: Utils.specialAlienMove,
      radius: Utils.alienRadius,
      game: this
    });

    let alienRight = new SpecialAlien({
      x_pos: this.ctx.canvas.width + Utils.alienRadius,
      y_pos: Math.random()*100 + 300,
      move_x: -Utils.specialAlienMove,
      radius: Utils.alienRadius,
      game: this
    });

    this.aliens.push(alienLeft);
    this.aliens.push(alienRight);
  }

  clear() {
    this.ctx.clearRect(0,0, canvas.width, canvas.height);
  }


  drawBackground() {
    this.ctx.drawImage(this.backgroundImage, 0, 0);
  }

  moveAliens(alienMove){
    this.aliens.forEach((alien) => {
      alien.moveObj(alienMove);
    });

    this.specialAliens.forEach((special) => {
      special.moveObj();
    });
  }

  wobbleAliens() {
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
  }

  // move bullets and check collisions
  moveShipBullets() {
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
  }

  moveAlienBullets() {
    this.alienBullets.forEach((bullet, bulletIndex) => {
      bullet.moveObj(Utils.alienBullet);
      if (bullet.y_pos >= Utils.canvasHeight*1.4) {
        this.alienBullets.shift();
      }

  // alien bullets to ship
      if (bullet.collideWith(this.ship[0]) && this.ship[0].invulnerabilityTimer === 0){
        this.makeExplosion({x: this.ship[0].x_pos - Utils.offsetExplosion, y: this.ship[0].y_pos - Utils.offsetExplosion});
        this.alienBullets.splice(bulletIndex, 1);
        this.shipLives.pop();
        this.ship.shift();
        this.makeShip();
      }

  // alien bullet to rock
      this.rocks.forEach((rock) => {
        if (bullet.collideWith(rock)){
          this.makeExplosion({x: rock.x_pos - Utils.offsetExplosion, y: rock.y_pos - Utils.offsetExplosion});
          rock.velocity.y += 1;
          this.alienBullets.splice(bulletIndex, 1);
        }
      });
    });
  }

  moveRocks() {
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

      if (rock.collideWith(this.ship[0]) && this.ship[0].invulnerabilityTimer === 0){
        this.makeExplosion({x: this.ship[0].x_pos - Utils.offsetExplosion, y: this.ship[0].y_pos - Utils.offsetExplosion});
        this.shipLives.pop();
        this.ship.shift();
        this.makeShip();
      }
    });
  }

  alienFire() {
      let index = Math.floor(Math.random()*this.aliens.length);
      this.aliens[index].fire();
      this.specialAliens.forEach((alien) => {
          alien.fire();
      });

  }



  // gameWon() {
  //   if (this.aliens.length === 0) {
  //     this.intervals.forEach((int)=> {
  //       clearInterval(int);
  //     });
  //     this.showMenu();
  //   }
  // };

  gameLost() {
    if (this.shipLives.length === 0) {
      this.intervals.forEach((int)=> {
        clearInterval(int);
      });
      this.restart();
    }
  }

  drawAll() {
    this.drawScore();
    let allObjects = this.aliens.concat(
      this.ship,
      this.shipBullets,
      this.alienBullets,
      this.explosions,
      this.rocks,
      this.shipLives,
      this.specialAliens
    );
    allObjects.forEach((obj) => {
      obj.draw();
    });
  }

  moveAll() {
    this.clear();
    this.ship[0].moveShip();
    this.moveAlienBullets();
    this.moveShipBullets();
    this.wobbleAliens();
    this.moveRocks();
    this.drawAll();
    this.gameLost();
  }

  setup() {
    this.makeShip();
    this.makeLives();
    this.makeAliens();
    this.makeSpecialAlien();
    this.makeRocks();
  }

  play() {

    this.regularSpawn = setInterval(this.makeAliens.bind(this), Utils.alienSpawnRate);
    this.specialSpawn = setInterval(this.makeSpecialAlien.bind(this), Utils.specialAlienSpawnRate);
    this.alienFire = setInterval(this.alienFire.bind(this), Utils.alienbulletFrequency);
    this.timer = setInterval(this.moveAll.bind(this), Utils.refreshRate);

    this.intervals.push(this.alienFire);
    this.intervals.push(this.regularSpawn);
    this.intervals.push(this.specialSpawn);
    this.intervals.push(this.timer);
  }

  restart() {
    if (this.score > localStorage.highScores){
      localStorage.highScores = this.score.toString();
    }
    let game = new Game(this.ctx);
    game.showMenu(Images.gameover);
  }


  showMenu(image = Images.intro) {
    this.clear();
    this.ctx.drawImage(image, 280, 300);
    let play = (e) => {
      if (e.keyCode === 13) {
              this.setup();
              this.drawAll();
              this.play();
              window.removeEventListener('keydown', play);
            }
          };
    window.addEventListener("keydown", play);
  }

}

module.exports = Game;
