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
	const Images = __webpack_require__(9);
	
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = "transparent";
	
	
	setTimeout( function () {
	  if (Images.loaded) {
	    let game = new Game(ctx);
	    game.play();
	  }
	}, 100);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Alien = __webpack_require__(2);
	const SpecialAlien = __webpack_require__(6);
	const Ship = __webpack_require__(7);
	const Bullet = __webpack_require__(5);
	const Utils = __webpack_require__(4);
	const MovingObject = __webpack_require__(3);
	const Explosion = __webpack_require__(8);
	const Images = __webpack_require__(9);
	
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
	
	  this.alienFire = setInterval(alienFire, Utils.bulletFrequency);
	  this.intervals.push(this.alienFire);
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
	          this.score += 50;
	        }
	        this.shipBullets.splice(bulletIndex, 1);
	        this.makeExplosion({x: alien.x_pos - Utils.offsetExplosion, y: alien.y_pos - Utils.offsetExplosion});
	        this.score += 10;
	      }
	    });
	  });
	};
	
	Game.prototype.gameWon = function () {
	  if (this.aliens.length === 0) {
	    this.intervals.forEach((int) => {
	      clearInterval(int);
	    });
	    return true;
	  }
	};
	
	Game.prototype.gameLost = function () {
	  if (this.shipLives.length === 0) {
	    this.intervals.forEach((int) => {
	      clearInterval(int);
	    });
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
	  this.regularSpawn = setInterval(this.makeAliens.bind(this), 30000);
	  this.specialSpawn = setInterval(this.makeSpecialAlien.bind(this), 4000);
	  this.timer = setInterval(this.moveAll.bind(this), 60);
	  this.intervals.push(this.regularSpawn);
	  this.intervals.push(this.specialSpawn);
	  this.intervals.push(this.timer);
	};
	
	Game.prototype.start = function () {
	  if (Images.loaded) {
	    this.play();
	  }
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Bullet = __webpack_require__(5);
	const Images = __webpack_require__(9);
	const Utils = __webpack_require__(4);
	
	function Alien(params) {
	  MovingObject.call(this, params);
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
	
	MovingObject.prototype.draw = function (){
	  let x = this.x_pos;
	  let y = this.y_pos;
	  this.game.ctx.beginPath();
	  this.game.ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
	  this.game.ctx.stroke();
	  this.showImage();
	};
	
	MovingObject.prototype.showImage = function () {
	    this.game.ctx.drawImage(this.image, this.x_pos - Utils.offsetObject , this.y_pos - Utils.offsetObject, 50, 50);
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
	  alienRadius: 20,
	  specialAlienMove: 5,
	
	
	
	  alienRight: {x: 4, y: 0},
	  alienLeft: {x: -4, y: 0},
	  alienDown: {x: 0, y: 16},
	
	  alienBullet: {x: 0, y: 15},
	  shipBullet: {x: 0, y: -25},
	  shipRight: {x: 10, y: 0},
	  shipLeft: {x: -10, y: 0},
	
	  hoverGap: 40,
	  bulletRadius: 3,
	  bulletFrequency: 400,
	  offsetObject: 25,
	  offsetExplosion: 50,
	
	  // ship options
	  shipHealth: 5
	
	
	
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
/***/ function(module, exports, __webpack_require__) {

	const Alien = __webpack_require__(2);
	const Images = __webpack_require__(9);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Bullet = __webpack_require__(5);
	const Images = __webpack_require__(9);
	const Utils = __webpack_require__(4);
	
	
	function Ship(params){
	  this.leftPressed = false;
	  this.rightPresed = false;
	  this.spacePressed = false;
	  this.timeOut = 0;
	  MovingObject.call(this, params);
	  this.startShip();
	}
	
	Utils.inherits(Ship, MovingObject);
	
	Ship.prototype.addListeners = function (){
	  document.addEventListener("keydown",this._handleKeyDown.bind(this));
	  document.addEventListener("keyup",this._handleKeyUp.bind(this));
	};
	
	Ship.prototype._handleKeyDown = function(e) {
	  if (e.keyCode === 65) {
	    this.leftPressed = true;
	  } else if (e.keyCode === 68) {
	    this.rightPresed = true;
	  }
	  if (e.keyCode === 32) {
	    this.spacePressed = true;
	  }
	};
	
	
	Ship.prototype._handleKeyUp = function(e) {
	  if (e.keyCode === 65) {
	    this.leftPressed = false;
	  } else if (e.keyCode === 68) {
	    this.rightPresed = false;
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
	  if (this.rightPresed === true && this.x_pos < this.game.ctx.canvas.width - this.radius) {
	    this.moveObj(Utils.shipRight);
	  }
	  if (this.spacePressed === true) {
	    this.timeOut = this.timeOut % 10;
	    if (this.timeOut % 10 === 0){
	      this.fire();
	    }
	    this.timeOut += 1;
	  }
	};
	
	module.exports = Ship;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const Images = __webpack_require__(9);
	
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
	  // do this later
	  if (this.frameY > 1152) {
	    this.game.explosions.forEach((explode,index) => {
	      if (explode.pos.x === this.pos.x && explode.pos.y === this.pos.y) {
	        this.game.explosions.splice(index, 1);
	      }
	    });
	  }
	
	};
	
	module.exports = Explosion;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var images = {
	  loading: 0,
	  loaded: false
	};
	function addImages(imagesArray){
	
	    imagesArray.forEach((imageName)=>{
	      let img = new Image();
	      img.onload = function () {
	        images[imageName] = img;
	        images.loading += 1;
	        if (images.loading === imagesArray.length) {
	          images.loaded = true;
	        }
	      };
	      img.src = `space_invaders_game/images/${imageName}.png`;
	    });
	}
	
	let imageFiles = ['background','explosion','ship', 'ship_bullet', 'intro', 'red_invader', 'alien_bullet', 'green_invader'];
	
	addImages(imageFiles);
	
	module.exports = images;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map