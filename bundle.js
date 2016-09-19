/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Images = __webpack_require__(6);
	
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	ctx.font = "24px serif";
	ctx.fillStyle = "#fff";
	ctx.strokeStyle = "transparent";
	
	if (!localStorage.highScores) {
	  localStorage.highScores = "0";
	}
	
	
	
	let load = function (){
	  let game = new Game(ctx);
	  game.showMenu();
	};
	
	Images.loadImages(ctx, load);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Alien = __webpack_require__(2);
	const SpecialAlien = __webpack_require__(7);
	const Ship = __webpack_require__(8);
	const Bullet = __webpack_require__(5);
	const Utils = __webpack_require__(4);
	const MovingObject = __webpack_require__(3);
	const SpaceRock = __webpack_require__(9);
	const Explosion = __webpack_require__(10);
	const Images = __webpack_require__(6);
	
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
	  this.score = 0;
	  this.intervals = [];
	}
	
	// draw methods
	
	Game.prototype.makeShip = function () {
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
	};
	
	Game.prototype.makeRocks = function (){
	  let rocks = new SpaceRock({
	    x_pos: 400,
	    y_pos: 400,
	    game: this
	  });
	  this.rocks.push(rocks);
	};
	
	Game.prototype.drawScore = function (){
	    this.ctx.fillText(`High Score: ${localStorage.highScores}`, 10, 20);
	    this.ctx.fillText(`Current Score: ${this.score}`, 10, 40);
	};
	
	Game.prototype.makeAliens = function (){
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
	};
	
	Game.prototype.makeSpecialAlien = function () {
	  let x = Math.floor(Math.random()*1.9)*800;
	  let y = Math.random()*400 + 200;
	
	  let alienLeft = new SpecialAlien({
	    x_pos: 0 - Utils.alienRadius,
	    y_pos: Math.random()*100 + 300,
	    move_x: Utils.specialAlienMove,
	    game: this
	  });
	
	  let alienRight = new SpecialAlien({
	    x_pos: this.ctx.canvas.width + Utils.alienRadius,
	    y_pos: Math.random()*100 + 300,
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
	
	    if (rock.collideWith(this.ship[0]) && this.ship[0].invulnerabilityTimer === 0){
	      this.makeExplosion({x: this.ship[0].x_pos - Utils.offsetExplosion, y: this.ship[0].y_pos - Utils.offsetExplosion});
	      this.shipLives.pop();
	      this.ship.shift();
	      this.makeShip();
	    }
	  });
	};
	
	Game.prototype.alienFire = function () {
	    let index = Math.floor(Math.random()*this.aliens.length);
	    this.aliens[index].fire();
	    this.specialAliens.forEach((alien) => {
	        alien.fire();
	    });
	
	};
	
	
	
	// Game.prototype.gameWon = function () {
	//   if (this.aliens.length === 0) {
	//     this.intervals.forEach((int)=> {
	//       clearInterval(int);
	//     });
	//     this.showMenu();
	//   }
	// };
	
	Game.prototype.gameLost = function () {
	  if (this.shipLives.length === 0) {
	    this.intervals.forEach((int)=> {
	      clearInterval(int);
	    });
	    this.restart();
	  }
	};
	Game.prototype.drawAll = function (){
	  // this.drawBackground();
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
	};
	
	Game.prototype.moveAll = function () {
	  this.clear();
	  this.ship[0].moveShip();
	  this.moveAlienBullets();
	  this.moveShipBullets();
	  this.wobbleAliens();
	  this.moveRocks();
	  this.drawAll();
	  this.gameLost();
	};
	
	Game.prototype.setup = function (){
	  this.makeShip();
	  this.makeLives();
	  this.makeAliens();
	  this.makeSpecialAlien();
	  this.makeRocks();
	};
	
	Game.prototype.play = function (){
	
	  this.regularSpawn = setInterval(this.makeAliens.bind(this), Utils.alienSpawnRate);
	  this.specialSpawn = setInterval(this.makeSpecialAlien.bind(this), Utils.specialAlienSpawnRate);
	  this.alienFire = setInterval(this.alienFire.bind(this), Utils.alienbulletFrequency);
	  this.timer = setInterval(this.moveAll.bind(this), Utils.refreshRate);
	
	  this.intervals.push(this.alienFire);
	  this.intervals.push(this.regularSpawn);
	  this.intervals.push(this.specialSpawn);
	  this.intervals.push(this.timer);
	};
	
	Game.prototype.restart = function(){
	  if (this.score > localStorage.highScores){
	    localStorage.highScores = this.score.toString();
	  }
	  let game = new Game(this.ctx);
	  game.showMenu(Images.gameover);
	};
	
	
	Game.prototype.showMenu = function (image = Images.intro){
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
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Bullet = __webpack_require__(5);
	const Images = __webpack_require__(6);
	const Utils = __webpack_require__(4);
	
	function Alien(params) {
	  MovingObject.call(this, params);
	  this.x_pos = params.x_pos;
	  this.y_pos = params.y_pos;
	  this.game = params.game;
	  this.frameWidth = params.frameWidth;
	  this.frameHeight = params.frameHeight;
	  this.ctx = params.game.ctx;
	  this.frameX = params.frameX;
	  this.frameY = params.frameY;
	  this.image = Images.green_invader;
	}
	
	Utils.inherits(Alien, MovingObject);
	
	
	Alien.prototype.fire = function () {
	  let params = {};
	  params.image = Images.alien_bullet;
	  params.x_pos = this.x_pos;
	  params.y_pos = this.y_pos;
	  params.game = this.game;
	  let bullet = new Bullet(params);
	  this.game.alienBullets.push(bullet);
	
	};
	
	module.exports = Alien;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	Utils = __webpack_require__(4);
	
	function MovingObject(params) {
	  this.image = params.image;
	  this.x_pos = params.x_pos;
	  this.y_pos = params.y_pos;
	  this.game = params.game;
	  this.radius = params.radius;
	}
	
	
	// draw circles to see collisions and test
	MovingObject.prototype.draw = function (){
	  // let x = this.x_pos;
	  // let y = this.y_pos;
	  // this.game.ctx.beginPath();
	  // this.game.ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
	  // this.game.ctx.stroke();
	  this.showImage();
	};
	
	MovingObject.prototype.showImage = function () {
	    this.game.ctx.drawImage(
	      this.image, this.x_pos - Utils.offsetObject,
	      this.y_pos - Utils.offsetObject,
	      50,
	      50
	    );
	};
	
	MovingObject.prototype.moveObj = function (vector){
	  this.x_pos += vector.x;
	  this.y_pos += vector.y;
	};
	
	MovingObject.prototype.collideWith = function (otherObj) {
	  let distance = Math.sqrt(Math.pow((this.x_pos - otherObj.x_pos), 2) + Math.pow((this.y_pos - otherObj.y_pos), 2));
	  if (distance < this.radius + otherObj.radius) {
	    return true;
	  }
	  return false;
	};
	
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

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
	
	  alienRight: {x: 5, y: 0},
	  alienLeft: {x: -5, y: 0},
	  alienDown: {x: 0, y: 10},
	  alienSpawnRate: 13000,
	  specialAlienSpawnRate: 4000,
	
	  alienBullet: {x: 0, y: 12},
	
	  hoverGap: 40,
	  bulletRadius: 3,
	  alienbulletFrequency: 300,
	
	  // ship options
	  shipLives: 5,
	  shipRight: {x: 6, y: 0},
	  shipLeft: {x: -6, y: 0},
	  shipDown: {x: 0, y: 6},
	  shipUp: {x: 0, y: -6},
	  shipBullet: {x: 0, y: -20},
	  invulnerabilityTimer: 120,
	
	  // rock options
	  rockRadius: 35,
	  offsetRock: 60,
	
	  // canvas options
	  canvasWidth: 800,
	  canvasHeight: 600,
	  refreshRate: 25,
	
	  // image options
	  offsetObject: 25,
	  offsetExplosion: 50,
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Utils = __webpack_require__(4);
	
	function Bullet(params) {
	  params.radius = Utils.bulletRadius;
	  MovingObject.call(this, params);
	}
	
	Utils.inherits(Bullet, MovingObject);
	
	module.exports = Bullet;


/***/ },
/* 6 */
/***/ function(module, exports) {

	let imageFiles = [
	  'explosion',
	  'ship',
	  'ship_bullet',
	  'intro',
	  'red_invader',
	  'alien_bullet',
	  'green_invader',
	  'rocks',
	  'gameover'
	];
	
	const Images = {
	  loading: 0,
	  loadImages: function(ctx, startGame){
	    imageFiles.forEach((imageName)=>{
	      let img = new Image();
	      img.onload = function () {
	        Images[imageName] = img;
	        Images.loading += 1;
	        ctx.fillText("LOADING...", 350, 300);
	        if (Images.loading === imageFiles.length) {
	          startGame();
	        }
	      };
	      img.src = `space_invaders_game/images/${imageName}.png`;
	    });
	  }
	};
	
	module.exports = Images;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Alien = __webpack_require__(2);
	const Images = __webpack_require__(6);
	const Utils = __webpack_require__(4);
	
	function SpecialAlien(params){
	  this.game = params.game;
	  this.image = Images.red_invader;
	  this.radius = Utils.alienRadius;
	  this.x_pos = params.x_pos;
	  this.y_pos = params.y_pos;
	  this.move_x = params.move_x;
	
	}
	
	Utils.inherits(SpecialAlien, Alien);
	
	SpecialAlien.prototype.moveObj = function () {
	  this.x_pos += this.move_x;
	};
	
	module.exports = SpecialAlien;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Bullet = __webpack_require__(5);
	const Images = __webpack_require__(6);
	const Utils = __webpack_require__(4);
	
	
	function Ship(params){
	  MovingObject.call(this, params);
	  this.leftPressed = false;
	  this.rightPressed = false;
	  this.upPressed = false;
	  this.downPressed = false;
	  this.spacePressed = false;
	  this.timeOut = 0;
	  this.invulnerabilityTimer = params.invulnerabilityTimer;
	  this.startShip();
	}
	
	Utils.inherits(Ship, MovingObject);
	
	Ship.prototype.addListeners = function (){
	  document.addEventListener("keydown", this._handleKeyDown.bind(this));
	  document.addEventListener("keyup", this._handleKeyUp.bind(this));
	};
	
	Ship.prototype._handleKeyDown = function(e) {
	  if (e.keyCode === 65) {
	    this.leftPressed = true;
	  } else if (e.keyCode === 68) {
	    this.rightPressed = true;
	  }
	
	  if (e.keyCode === 83) {
	    this.downPressed = true;
	  } else if (e.keyCode === 87) {
	    this.upPressed = true;
	  }
	
	  if (e.keyCode === 32) {
	    this.spacePressed = true;
	  }
	
	};
	
	
	Ship.prototype._handleKeyUp = function(e) {
	  if (e.keyCode === 65) {
	    this.leftPressed = false;
	  } else if (e.keyCode === 68) {
	    this.rightPressed = false;
	  }
	
	  if (e.keyCode === 83) {
	    this.downPressed = false;
	  } else if (e.keyCode === 87) {
	    this.upPressed = false;
	  }
	
	  if (e.keyCode === 32){
	    this.timeOut = 0;
	    this.spacePressed = false;
	  }
	};
	
	Ship.prototype.fire = function () {
	  let params = {};
	  params.x_pos = this.x_pos;
	  params.y_pos = this.y_pos;
	  params.game = this.game;
	  params.image = Images.ship_bullet;
	  let bullet = new Bullet(params);
	  this.game.shipBullets.push(bullet);
	
	};
	
	Ship.prototype.startShip = function () {
	  this.addListeners();
	};
	
	Ship.prototype.moveShip = function () {
	  if (this.leftPressed === true && this.x_pos > this.radius) {
	    this.moveObj(Utils.shipLeft);
	  }
	  if (this.rightPressed === true && this.x_pos < this.game.ctx.canvas.width - this.radius) {
	    this.moveObj(Utils.shipRight);
	  }
	  if (this.upPressed === true && this.y_pos > this.radius) {
	    this.moveObj(Utils.shipUp);
	  }
	  if (this.downPressed === true && this.y_pos < this.game.ctx.canvas.height - this.radius) {
	    this.moveObj(Utils.shipDown);
	  }
	  if (this.spacePressed === true) {
	    this.timeOut = this.timeOut % 10;
	    if (this.timeOut % 10 === 0){
	      this.fire();
	    }
	    this.timeOut += 1;
	  }
	
	};
	
	Ship.prototype.draw = function (){
	  // let x = this.x_pos;
	  // let y = this.y_pos;
	  // this.game.ctx.beginPath();
	  // this.game.ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
	  // this.game.ctx.stroke();
	  if (this.invulnerabilityTimer%3 === 0) {
	    this.showImage();
	  }
	
	  if (this.invulnerabilityTimer > 0) {
	    this.invulnerabilityTimer -= 1;
	  }
	};
	
	MovingObject.prototype.showImage = function () {
	    this.game.ctx.drawImage(
	      this.image, this.x_pos - Utils.offsetObject,
	      this.y_pos - Utils.offsetObject,
	      50,
	      50
	    );
	};
	
	module.exports = Ship;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Images = __webpack_require__(6);
	const MovingObject = __webpack_require__(3);
	const Utils = __webpack_require__(4);
	
	function SpaceRock(params){
	  this.velocity = {x:4, y: -1};
	  this.x_pos = params.x_pos;
	  this.y_pos = params.y_pos;
	  this.frameWidth = 256;
	  this.frameHeight = 256;
	  this.game = params.game;
	  this.ctx = params.game.ctx;
	  this.frameX = 0;
	  this.frameY = 0;
	  this.radius = Utils.rockRadius;
	  this.image = Images.rocks;
	}
	
	Utils.inherits(SpaceRock, MovingObject);
	
	
	SpaceRock.prototype.draw = function (){
	  // this.game.ctx.beginPath();
	  // this.game.ctx.arc(this.x_pos, this.y_pos, this.radius, 0, Math.PI*2, true);
	  // this.game.ctx.stroke();
	
	  this.ctx.drawImage(
	    this.image,
	    this.frameX,
	    this.frameY,
	    this.frameWidth,
	    this.frameHeight,
	    this.x_pos - Utils.offsetRock,
	    this.y_pos - Utils.offsetRock,
	    this.frameWidth/2,
	    this.frameHeight/2
	  );
	
	  this.frameX += this.frameWidth;
	
	  if (this.frameX >= 2048) {
	    this.frameX = 0;
	    this.frameY += this.frameHeight;
	  }
	
	  if (this.frameY >= 2048/2) {
	    this.frameY = 0;
	      }
	};
	
	SpaceRock.prototype.moveObj = function (){
	  if (this.x_pos >= (Utils.canvasWidth - this.radius) || this.x_pos <= (0 + this.radius)) {
	    let newVel = -this.velocity.x;
	    this.velocity.x = newVel;
	  }
	  this.x_pos += this.velocity.x;
	  if (this.y_pos >= (Utils.canvasHeight - this.radius) || this.y_pos <= (0 + this.radius )) {
	    let newVel = -this.velocity.y;
	    this.velocity.y = newVel;
	  }
	  this.y_pos += this.velocity.y;
	};
	
	module.exports = SpaceRock;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	const Images = __webpack_require__(6);
	
	function Explosion(params){
	  this.pos = params.pos;
	  this.frameWidth = params.frameWidth;
	  this.frameHeight = params.frameHeight;
	  this.game = params.game;
	  this.ctx = params.game.ctx;
	  this.frameX = params.frameX;
	  this.frameY = params.frameY;
	  this.image = Images.explosion;
	}
	
	
	Explosion.prototype.draw = function (){
	  this.ctx.drawImage(
	    this.image,
	    this.frameX,
	    this.frameY,
	    this.frameWidth,
	    this.frameHeight,
	    this.pos.x,
	    this.pos.y,
	    this.frameWidth,
	    this.frameHeight
	  );
	
	  this.frameX += this.frameWidth;
	
	  if (this.frameX >= 640) {
	    this.frameX = 0;
	    this.frameY += this.frameHeight;
	  }
	
	  if (this.frameY > 1152) {
	    this.game.explosions.shift();
	      }
	};
	
	
	
	module.exports = Explosion;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map