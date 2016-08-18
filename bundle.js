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

	const Alien = __webpack_require__(1);
	const Ship = __webpack_require__(5);
	const Bullet = __webpack_require__(3);
	const Utils = __webpack_require__(4);
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);
	const Bullet = __webpack_require__(3);
	const Utils = __webpack_require__(4);
	
	function Alien(params) {
	  MovingObject.call(this, params);
	}
	
	Utils.inherits(Alien, MovingObject);
	
	
	Alien.prototype.fire = function () {
	  let params = {};
	  params.x_pos = this.x_pos;
	  params.y_pos = this.y_pos;
	  params.game = this.game;
	  params.image = Utils.alienBullet;
	  let bullet = new Bullet(params);
	  this.game.alienBullets.push(bullet);
	
	};
	
	
	module.exports = Alien;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function MovingObject(params) {
	  this.image = new Image();
	  this.image.src = params.image;
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
	    this.game.ctx.drawImage(this.image, this.x_pos, this.y_pos, 50, 50);
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);
	const Util = __webpack_require__(4);
	
	function Bullet(params) {
	  params.radius = params.game.bulletRadius;
	  MovingObject.call(this, params);
	}
	
	Util.inherits(Bullet, MovingObject);
	
	module.exports = Bullet;


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
	
	  alien: 'images/green_invader.png',
	  ship: 'images/galaga.png',
	  shipBullet: 'images/green_bullet.png',
	  alienBullet: 'images/red_bullet.png',
	  background: 'images/space.jpg'
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);
	const Bullet = __webpack_require__(3);
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
	  params.image = Utils.shipBullet;
	  let bullet = new Bullet(params);
	  this.game.shipBullets.push(bullet);
	
	};
	
	Ship.prototype.startShip = function () {
	  this.addListeners();
	};
	
	Ship.prototype.activateShip = function () {
	  if (this.leftPressed === true) {
	    this.moveObj(this.game.shipLeft);
	  }
	  if (this.rightPresed === true) {
	    this.moveObj(this.game.shipRight);
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map