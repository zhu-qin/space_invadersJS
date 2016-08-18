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

	const Alien = __webpack_require__(2);
	const Ship = __webpack_require__(4);
	const Bullet = __webpack_require__(5);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	function MovingObject(params) {
	  this.x_pos = params.x_pos;
	  this.y_pos = params.y_pos;
	  this.game = params.game;
	  this.radius = params.radius;
	}
	
	MovingObject.prototype.draw = function (ctx){
	  let x = this.x_pos;
	  let y = this.y_pos;
	  ctx.beginPath();
	  ctx.arc(x, y, this.radius, 0, Math.PI*2, true);
	  ctx.stroke();
	};
	
	MovingObject.prototype.moveObj = function (vector){
	  this.x_pos += vector.x;
	  this.y_pos += vector.y;
	};
	
	
	module.exports = MovingObject;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Utils = __webpack_require__(3);
	
	function Alien(params) {
	  MovingObject.call(this, params);
	}
	
	Utils.inherits(Alien, MovingObject);
	
	
	module.exports = Alien;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	  inherits: function (ChildClass, ParentClass) {
	    function Surrogate(){}
	    Surrogate.prototype = ParentClass.prototype;
	    ChildClass.prototype = new Surrogate();
	    ChildClass.prototype.constructor = ChildClass;
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Bullet = __webpack_require__(5);
	const Utils = __webpack_require__(3);
	
	
	function Ship(params){
	  this.leftPressed = false;
	  this.rightPresed = false;
	  this.spacePressed = false;
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
	    this.spacePressed = false;
	  }
	};
	
	Ship.prototype.fire = function () {
	  let params = {};
	  params.x_pos = this.x_pos;
	  params.y_pos = this.y_pos;
	  params.game = this.game;
	  let bullet = new Bullet(params);
	  this.game.add(bullet);
	
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
	    this.fire();
	  }
	};
	
	
	
	
	module.exports = Ship;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(1);
	const Util = __webpack_require__(3);
	
	function Bullet(params) {
	  params.radius = params.game.bulletRadius;
	  MovingObject.call(this, params);
	}
	
	Util.inherits(Bullet, MovingObject);
	
	module.exports = Bullet;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map