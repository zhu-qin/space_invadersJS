/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _stateManager = __webpack_require__(1);

	var _stateManager2 = _interopRequireDefault(_stateManager);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	context.strokeStyle = 'FFF';

	var start = function start() {
	  return new _stateManager2.default({ context: context });
	};

	_images2.default.loadImages(context, start);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _menuState = __webpack_require__(2);

	var _menuState2 = _interopRequireDefault(_menuState);

	var _playingState = __webpack_require__(5);

	var _playingState2 = _interopRequireDefault(_playingState);

	var _keyManager = __webpack_require__(14);

	var _keyManager2 = _interopRequireDefault(_keyManager);

	var _spaceInvadersConfig = __webpack_require__(15);

	var _spaceInvadersConfig2 = _interopRequireDefault(_spaceInvadersConfig);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StateManager = function () {
	  function StateManager(config) {
	    _classCallCheck(this, StateManager);

	    this.config = _spaceInvadersConfig2.default;
	    this.gameWidth = _spaceInvadersConfig2.default.gameWidth;
	    this.gameHeight = _spaceInvadersConfig2.default.gameHeight;
	    this.keyManager = new _keyManager2.default({ stateManager: this });
	    this.menuState = new _menuState2.default({ stateManager: this });
	    this.playingState = new _playingState2.default({ stateManager: this });
	    this.currentState = this.menuState;
	    this.context = config.context;
	    this.reactView = config.reactView;
	    this.running = false;
	    this.forceUpdate = undefined;
	    this.showMenu();
	  }

	  _createClass(StateManager, [{
	    key: 'showMenu',
	    value: function showMenu() {
	      this.setMenuState();
	      this.run();
	    }
	  }, {
	    key: 'unMountGame',
	    value: function unMountGame() {
	      this.running = false;
	      this.keyManager.clearKeyListeners();
	    }
	  }, {
	    key: 'setMenuState',
	    value: function setMenuState() {
	      this.currentState = this.menuState;
	      this.keyManager.addStartListener();
	    }
	  }, {
	    key: 'addScoreListener',
	    value: function addScoreListener(listener) {
	      var _this = this;

	      this.forceUpdate = listener;
	      return {
	        remove: function remove() {
	          delete _this.forceUpdate;
	        }
	      };
	    }
	  }, {
	    key: 'preTick',
	    value: function preTick() {
	      this.currentState.preTick();
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      this.currentState.tick();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.context.clearRect(0, 0, 800, 600);
	      this.currentState.render();
	    }
	  }, {
	    key: 'postRender',
	    value: function postRender() {
	      this.currentState.postRender();
	    }
	  }, {
	    key: 'run',
	    value: function run() {
	      var _this2 = this;

	      this.running = true;
	      // let timeNow = Date.now(),
	      //     millisecondsPerFrame = (1000/60),
	      //     timeDelta = 0,
	      //     nextTime = undefined
	      this.interval = setInterval(function () {
	        // nextTime = Date.now()
	        // timeDelta += (nextTime - timeNow)
	        // timeNow = nextTime
	        //
	        // if (timeDelta >= millisecondsPerFrame) {
	        // this.preTick()
	        if (_this2.running) {
	          // this.forceUpdate()
	          // this.preTick()
	          _this2.tick();
	          _this2.render();
	          // this.postRender()
	        } else {
	          clearInterval(_this2.interval);
	        }
	        // this.postRender()
	        //   timeDelta -= millisecondsPerFrame
	        // }
	      }, 1000 / 60);
	    }
	  }]);

	  return StateManager;
	}();

	exports.default = StateManager;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _gameState = __webpack_require__(3);

	var _gameState2 = _interopRequireDefault(_gameState);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuState = function (_GameState) {
	  _inherits(MenuState, _GameState);

	  function MenuState(initialState) {
	    _classCallCheck(this, MenuState);

	    var _this = _possibleConstructorReturn(this, (MenuState.__proto__ || Object.getPrototypeOf(MenuState)).call(this, initialState));

	    _this.sprite = _images2.default.intro;
	    return _this;
	  }

	  _createClass(MenuState, [{
	    key: 'tick',
	    value: function tick() {}
	  }, {
	    key: 'render',
	    value: function render() {
	      this.stateManager.context.drawImage(this.sprite, 280, 300);
	    }
	  }]);

	  return MenuState;
	}(_gameState2.default);

	exports.default = MenuState;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameState = function () {
	  function GameState(initialState) {
	    _classCallCheck(this, GameState);

	    this.stateManager = initialState.stateManager;
	  }

	  _createClass(GameState, [{
	    key: "preTick",
	    value: function preTick() {}
	  }, {
	    key: "tick",
	    value: function tick() {}
	  }, {
	    key: "render",
	    value: function render() {}
	  }, {
	    key: "postRender",
	    value: function postRender() {}
	  }]);

	  return GameState;
	}();

	exports.default = GameState;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var imageFiles = ['explosion', 'ship', 'ship_bullet', 'intro', 'red_invader', 'alien_bullet', 'green_invader', 'rock', 'gameover'];

	var Images = {
	  loading: 0,
	  loadImages: function loadImages(ctx, startGame) {
	    imageFiles.forEach(function (imageName) {
	      var img = new Image();
	      img.onload = function () {
	        Images[imageName] = img;
	        Images.loading += 1;
	        ctx.fillText("LOADING...", 350, 300);
	        if (Images.loading === imageFiles.length) {
	          startGame();
	        }
	      };
	      img.src = 'space_invaders_game/assets/images/' + imageName + '.png';
	    });
	  }
	};

	module.exports = Images;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _gameState = __webpack_require__(3);

	var _gameState2 = _interopRequireDefault(_gameState);

	var _ship = __webpack_require__(6);

	var _ship2 = _interopRequireDefault(_ship);

	var _alien = __webpack_require__(10);

	var _alien2 = _interopRequireDefault(_alien);

	var _bullet = __webpack_require__(8);

	var _bullet2 = _interopRequireDefault(_bullet);

	var _rock = __webpack_require__(11);

	var _rock2 = _interopRequireDefault(_rock);

	var _explosion = __webpack_require__(9);

	var _explosion2 = _interopRequireDefault(_explosion);

	var _spaceInvadersUtils = __webpack_require__(12);

	var _spaceInvadersUtils2 = _interopRequireDefault(_spaceInvadersUtils);

	var _specialAlien = __webpack_require__(13);

	var _specialAlien2 = _interopRequireDefault(_specialAlien);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PlayingState = function (_GameState) {
	  _inherits(PlayingState, _GameState);

	  function PlayingState(initialState) {
	    _classCallCheck(this, PlayingState);

	    var _this = _possibleConstructorReturn(this, (PlayingState.__proto__ || Object.getPrototypeOf(PlayingState)).call(this, initialState));

	    _this.ship = [_this.makeShip()];
	    _this.rock = [_this.makeRock()];
	    _this.shipBullets = [];
	    _this.alienBullets = [];
	    _this.explosions = [];
	    _this.aliens = _this.makeAliens();
	    _this.setVectorForAlien = _this.setVectorFunction();
	    _this.counter = 0;
	    _this.spawnCounter = 0;
	    _this.shipLives = _this.stateManager.config.shipLives;
	    _this.score = 0;
	    return _this;
	  }

	  _createClass(PlayingState, [{
	    key: 'makeShip',
	    value: function makeShip() {
	      return new _ship2.default({
	        pos: Object.assign([], this.stateManager.config.shipStartPos),
	        vector: [0, 0],
	        stateManager: this.stateManager
	      });
	    }
	  }, {
	    key: 'makeRock',
	    value: function makeRock() {
	      return new _rock2.default({
	        pos: Object.assign([], this.stateManager.config.rockStartPos),
	        vector: [this.stateManager.config.rockSpeed, 0],
	        stateManager: this.stateManager
	      });
	    }
	  }, {
	    key: 'makeAliens',
	    value: function makeAliens() {
	      var aliens = [];
	      var alienGap = this.stateManager.config.alienGap;
	      var alienStartPos = this.stateManager.config.alienStartPos;
	      for (var i = alienStartPos; i < this.stateManager.gameWidth - 50; i += alienGap) {
	        for (var j = 50; j < this.stateManager.gameHeight - 400; j += 70) {
	          aliens.push(new _alien2.default({
	            vector: [0, 0],
	            pos: [i, j],
	            stateManager: this.stateManager
	          }));
	        }
	      }
	      return aliens;
	    }
	  }, {
	    key: 'joinEntities',
	    value: function joinEntities() {
	      return [].concat(this.rock, this.ship, this.aliens, this.shipBullets, this.alienBullets, this.explosions);
	    }
	  }, {
	    key: 'setVectorFunction',
	    value: function setVectorFunction() {
	      var _this2 = this;

	      var direction = 'right';
	      return function () {
	        _this2.aliens.forEach(function (alien) {
	          alien.vector = direction === 'right' ? [1, 0] : [-1, 0];
	          alien.pos[1] += 5;
	        });
	        direction = direction === 'right' ? 'left' : 'right';
	      };
	    }
	  }, {
	    key: 'addExplosion',
	    value: function addExplosion(entity) {
	      this.explosions.push(new _explosion2.default({
	        pos: entity.pos,
	        vector: [0, 0],
	        stateManager: this.stateManager
	      }));
	    }
	  }, {
	    key: 'remove',
	    value: function remove(entity) {
	      if (entity.type === 'ShipBullet') {
	        this.shipBullets.splice(this.shipBullets.indexOf(entity), 1);
	      } else if (entity.type === 'AlienBullet') {
	        this.alienBullets.splice(this.alienBullets.indexOf(entity), 1);
	      } else if (entity.type === 'Alien') {
	        this.aliens.splice(this.aliens.indexOf(entity), 1);
	      }
	    }
	  }, {
	    key: 'takeShipLife',
	    value: function takeShipLife() {
	      if (this.ship[0].isCollidable()) {
	        this.addExplosion(this.ship[0]);
	        this.ship[0].counter = 0;
	        this.shipLives -= 1;
	        this.ship[0].pos = Object.assign([], this.stateManager.config.shipStartPos);
	      }
	    }
	  }, {
	    key: 'shipCollisions',
	    value: function shipCollisions() {
	      var _this3 = this;

	      this.collidesWithRock(this.ship[0]);
	      this.alienBullets.concat(this.aliens).forEach(function (entity) {
	        _this3.collidesWithRock(entity);
	        var distance = _spaceInvadersUtils2.default.distance(entity.pos, _this3.ship[0].pos);
	        if (distance <= entity.radius + _this3.ship[0].radius) {
	          _this3.remove(entity);
	          _this3.addExplosion(entity);
	          _this3.takeShipLife();
	        }
	      });
	    }
	  }, {
	    key: 'collidesWithRock',
	    value: function collidesWithRock(entity) {
	      var collided = false;
	      var distance = _spaceInvadersUtils2.default.distance(this.rock[0].pos, entity.pos);
	      if (distance <= entity.radius + this.rock[0].radius) {
	        collided = true;
	      }
	      if (entity.type === 'ShipBullet' && collided) {
	        this.remove(entity);
	        this.rock[0].vector[1] -= 1;
	        this.addExplosion(entity);
	      } else if (entity.type === 'AlienBullet' && collided) {
	        this.remove(entity);
	        this.addExplosion(entity);
	        this.rock[0].vector[1] += 1;
	      } else if (entity.type === 'Alien' && collided) {
	        this.score += 100;
	        this.remove(entity);
	        this.addExplosion(entity);
	      } else if (entity.type === 'Ship' && collided) {
	        this.takeShipLife();
	      }
	    }
	  }, {
	    key: 'alienCollisions',
	    value: function alienCollisions() {
	      var _this4 = this;

	      this.shipBullets.forEach(function (shipBullet) {
	        _this4.collidesWithRock(shipBullet);
	        _this4.aliens.forEach(function (alien) {
	          var distance = _spaceInvadersUtils2.default.distance(alien.pos, shipBullet.pos);
	          if (distance <= alien.radius + shipBullet.radius) {
	            _this4.score += 100;
	            _this4.remove(alien);
	            _this4.remove(shipBullet);
	            _this4.addExplosion(alien);
	          }
	        });
	      });
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      this.shipCollisions();
	      this.alienCollisions();
	    }
	  }, {
	    key: 'spawnAliens',
	    value: function spawnAliens() {
	      this.spawnCounter += 1;
	      if (this.spawnCounter % this.stateManager.config.respawnRate === 0 || this.aliens.length === 0) {
	        this.aliens = this.aliens.concat(this.makeAliens());
	        this.spawnCounter = 0;
	      }
	    }
	  }, {
	    key: 'setHighScore',
	    value: function setHighScore() {
	      if (localStorage.spaceInvadersHighScores && this.score > localStorage.spaceInvadersHighScores) {
	        localStorage.spaceInvadersHighScores = this.score;
	      }
	    }
	  }, {
	    key: 'isGameOver',
	    value: function isGameOver() {
	      if (this.shipLives <= 0) {
	        this.shipLives = this.stateManager.config.shipLives;
	        this.stateManager.setMenuState();
	        this.setHighScore();
	        return true;
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      if (this.counter % this.stateManager.config.alienWobble === 20) {
	        this.setVectorForAlien();
	      }
	      this.joinEntities().forEach(function (entity) {
	        return entity.tick();
	      });
	      this.checkCollisions();
	      this.spawnAliens();
	      this.counter += 1;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.joinEntities().forEach(function (entity) {
	        return entity.render();
	      });
	      this.isGameOver();
	    }
	  }, {
	    key: 'postRender',
	    value: function postRender() {
	      this.joinEntities().forEach(function (entity) {
	        return entity.postRender();
	      });
	    }
	  }]);

	  return PlayingState;
	}(_gameState2.default);

	exports.default = PlayingState;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _entity = __webpack_require__(7);

	var _entity2 = _interopRequireDefault(_entity);

	var _bullet = __webpack_require__(8);

	var _bullet2 = _interopRequireDefault(_bullet);

	var _explosion = __webpack_require__(9);

	var _explosion2 = _interopRequireDefault(_explosion);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Ship = function (_Entity) {
	  _inherits(Ship, _Entity);

	  function Ship(initialState) {
	    _classCallCheck(this, Ship);

	    var _this = _possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, initialState));

	    _this.sprite = _images2.default.ship;
	    _this.type = 'Ship';
	    _this.counter = 120;
	    _this.gunCounter = 0;
	    _this.radius = 25;
	    return _this;
	  }

	  _createClass(Ship, [{
	    key: 'updatePosition',
	    value: function updatePosition() {
	      var keys = this.stateManager.keyManager;
	      var conf = this.stateManager.config;
	      if (keys.leftPressed && this.pos[0] - this.radius >= 0) {
	        this.pos[0] -= conf.shipMoveSpeed;
	      }
	      if (keys.downPressed && this.pos[1] + this.radius <= this.stateManager.gameHeight) {
	        this.pos[1] += conf.shipMoveSpeed;
	      }
	      if (keys.rightPressed && this.pos[0] + this.radius <= this.stateManager.gameWidth) {
	        this.pos[0] += conf.shipMoveSpeed;
	      }
	      if (keys.upPressed && this.pos[1] - this.radius >= 0) {
	        this.pos[1] -= conf.shipMoveSpeed;
	      }
	    }
	  }, {
	    key: 'fire',
	    value: function fire() {
	      var spacePressed = this.stateManager.keyManager.spacePressed;
	      if (spacePressed && this.gunCounter % 20 === 10) {
	        var bullet = new _bullet2.default({
	          stateManager: this.stateManager,
	          pos: Object.assign([], this.pos),
	          vector: [0, -this.stateManager.config.shipBulletSpeed],
	          type: "ShipBullet"
	        });
	        this.stateManager.playingState.shipBullets.push(bullet);
	      } else if (!spacePressed) {
	        this.gunCounter = 5;
	      }
	    }
	  }, {
	    key: 'isCollidable',
	    value: function isCollidable() {
	      return this.counter >= 120;
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.stateManager.context.drawImage(this.sprite, this.pos[0] - 25, this.pos[1] - 25, 50, 50);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      this.counter += 1;
	      this.gunCounter += 1;
	      this.updatePosition();
	      this.fire();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (this.counter > 120 || this.counter % 5 === 0) {
	        this.draw();
	      }
	    }
	  }]);

	  return Ship;
	}(_entity2.default);

	exports.default = Ship;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Entity = function () {
	  function Entity(initialState) {
	    _classCallCheck(this, Entity);

	    this.type = initialState.type;
	    this.pos = initialState.pos;
	    this.vector = initialState.vector;
	    this.sprite = initialState.sprite;
	    this.stateManager = initialState.stateManager;
	    this.radius = this.stateManager.config.entityRadius;
	  }

	  _createClass(Entity, [{
	    key: "isOutsideHorizontal",
	    value: function isOutsideHorizontal() {
	      return this.pos[0] - this.radius <= 0 || this.pos[0] + this.radius >= this.stateManager.gameWidth;
	    }
	  }, {
	    key: "isOutsideVertical",
	    value: function isOutsideVertical() {
	      return this.pos[1] - this.radius <= 0 || this.pos[1] + this.radius >= this.stateManager.gameHeight;
	    }
	  }, {
	    key: "preTick",
	    value: function preTick() {}
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.pos[0] += this.vector[0];
	      this.pos[1] += this.vector[1];
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      this.stateManager.context.drawImage(this.sprite, this.pos[0], this.pos[1], 50, 50);
	    }
	  }, {
	    key: "postRender",
	    value: function postRender() {
	      var ctx = this.stateManager.context;
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
	      ctx.stroke();
	    }
	  }]);

	  return Entity;
	}();

	exports.default = Entity;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _entity = __webpack_require__(7);

	var _entity2 = _interopRequireDefault(_entity);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bullet = function (_Entity) {
	  _inherits(Bullet, _Entity);

	  function Bullet(initialState) {
	    _classCallCheck(this, Bullet);

	    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, initialState));

	    _this.setSprite();
	    _this.radius = 5;
	    return _this;
	  }

	  _createClass(Bullet, [{
	    key: 'setSprite',
	    value: function setSprite() {
	      if (this.type === 'AlienBullet') {
	        this.sprite = _images2.default.alien_bullet;
	        this.vector = [0, this.stateManager.config.alienBulletSpeed];
	      } else if (this.type === 'ShipBullet') {
	        this.sprite = _images2.default.ship_bullet;
	        this.vector = [0, -this.stateManager.config.shipBulletSpeed];
	      }
	    }
	  }, {
	    key: 'checkIfVisible',
	    value: function checkIfVisible() {
	      if (this.isOutsideHorizontal()) {
	        this.stateManager.playingState.remove(this);
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      this.pos[0] += this.vector[0];
	      this.pos[1] += this.vector[1];
	      this.checkIfVisible();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.stateManager.context.drawImage(this.sprite, this.pos[0] - 20, this.pos[1] - 20, 50, 50);
	    }
	  }]);

	  return Bullet;
	}(_entity2.default);

	exports.default = Bullet;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _entity = __webpack_require__(7);

	var _entity2 = _interopRequireDefault(_entity);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Explosion = function (_Entity) {
	  _inherits(Explosion, _Entity);

	  function Explosion(initialState) {
	    _classCallCheck(this, Explosion);

	    var _this = _possibleConstructorReturn(this, (Explosion.__proto__ || Object.getPrototypeOf(Explosion)).call(this, initialState));

	    _this.sprite = _images2.default.explosion;
	    _this.frameX = 0;
	    _this.frameY = 0;
	    _this.frameWidth = 128;
	    _this.frameHeight = 128;
	    _this.counter = 0;
	    return _this;
	  }

	  _createClass(Explosion, [{
	    key: 'tick',
	    value: function tick() {
	      this.counter += 1;
	    }
	  }, {
	    key: 'updateSpriteFrame',
	    value: function updateSpriteFrame() {
	      this.frameX += this.frameWidth;

	      if (this.frameX >= 640) {
	        this.frameX = 0;
	        this.frameY += this.frameHeight;
	      }

	      if (this.frameY > 1152) {
	        this.stateManager.playingState.explosions.shift();
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw() {
	      this.stateManager.context.drawImage(this.sprite, this.frameX, this.frameY, this.frameWidth, this.frameHeight, this.pos[0] - 60, this.pos[1] - 60, this.frameWidth, this.frameHeight);

	      if (this.counter % 3 === 0) {
	        this.updateSpriteFrame();
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.draw();
	    }
	  }]);

	  return Explosion;
	}(_entity2.default);

	exports.default = Explosion;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _entity = __webpack_require__(7);

	var _entity2 = _interopRequireDefault(_entity);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	var _bullet = __webpack_require__(8);

	var _bullet2 = _interopRequireDefault(_bullet);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Alien = function (_Entity) {
	  _inherits(Alien, _Entity);

	  function Alien(initialState) {
	    _classCallCheck(this, Alien);

	    var _this = _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, initialState));

	    _this.sprite = _images2.default.green_invader;
	    _this.type = 'Alien';
	    return _this;
	  }

	  _createClass(Alien, [{
	    key: 'fireBullet',
	    value: function fireBullet() {
	      var bullet = new _bullet2.default({
	        pos: Object.assign([], this.pos),
	        stateManager: this.stateManager,
	        type: 'AlienBullet'
	      });
	      this.stateManager.playingState.alienBullets.push(bullet);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      if (Math.floor(Math.random() * this.stateManager.config.alienBulletFrequency) === 1) {
	        this.fireBullet();
	      }
	      this.pos[0] += this.vector[0];
	      this.pos[1] += this.vector[1];
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.stateManager.context.drawImage(this.sprite, this.pos[0] - 25, this.pos[1] - 25, 50, 50);
	    }
	  }]);

	  return Alien;
	}(_entity2.default);

	exports.default = Alien;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _entity = __webpack_require__(7);

	var _entity2 = _interopRequireDefault(_entity);

	var _images = __webpack_require__(4);

	var _images2 = _interopRequireDefault(_images);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rock = function (_Entity) {
	  _inherits(Rock, _Entity);

	  function Rock(initialState) {
	    _classCallCheck(this, Rock);

	    var _this = _possibleConstructorReturn(this, (Rock.__proto__ || Object.getPrototypeOf(Rock)).call(this, initialState));

	    _this.sprite = _images2.default.rock;
	    _this.frameX = 0;
	    _this.frameY = 0;
	    _this.frameWidth = 256;
	    _this.frameHeight = 256;
	    _this.counter = 0;
	    _this.radius = 40;
	    return _this;
	  }

	  _createClass(Rock, [{
	    key: 'draw',
	    value: function draw() {
	      this.stateManager.context.drawImage(this.sprite, this.frameX, this.frameY, this.frameWidth, this.frameHeight, this.pos[0] - 65, this.pos[1] - 65, this.frameWidth / 2, this.frameHeight / 2);

	      if (this.counter % 3 === 0) {
	        this.updateSpriteFrame();
	      }
	    }
	  }, {
	    key: 'updateSpriteFrame',
	    value: function updateSpriteFrame() {
	      this.frameX += this.frameWidth;
	      if (this.frameX >= 2048) {
	        this.frameX = 0;
	        this.frameY += this.frameHeight;
	      }

	      if (this.frameY >= 2048 / 2) {
	        this.frameY = 0;
	      }
	    }
	  }, {
	    key: 'checkWalls',
	    value: function checkWalls() {
	      if (this.isOutsideHorizontal()) {
	        this.vector[0] = -this.vector[0];
	      }

	      if (this.isOutsideVertical()) {
	        this.vector[1] = -this.vector[1];
	      }
	    }
	  }, {
	    key: 'updateVerticalPosition',
	    value: function updateVerticalPosition() {
	      if (Math.abs(this.vector[1]) > 5) {
	        this.vector[1] = this.vector[1] - this.vector[1] % 5;
	      }
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      this.checkWalls();
	      this.updateVerticalPosition();
	      this.pos[0] += this.vector[0];
	      this.pos[1] += this.vector[1];
	      this.counter += 1;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.draw();
	    }
	  }]);

	  return Rock;
	}(_entity2.default);

	exports.default = Rock;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SpaceInvadersUtils = {
	  distance: function distance(posOne, posTwo) {
	    return Math.sqrt(Math.pow(posOne[0] - posTwo[0], 2) + Math.pow(posOne[1] - posTwo[1], 2));
	  }
	};

	exports.default = SpaceInvadersUtils;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _alien = __webpack_require__(10);

	var _alien2 = _interopRequireDefault(_alien);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SpecialAlien = function (_Alien) {
	  _inherits(SpecialAlien, _Alien);

	  function SpecialAlien(initialState) {
	    _classCallCheck(this, SpecialAlien);

	    return _possibleConstructorReturn(this, (SpecialAlien.__proto__ || Object.getPrototypeOf(SpecialAlien)).call(this, initialState));
	  }

	  return SpecialAlien;
	}(_alien2.default);

	exports.default = SpecialAlien;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var KeyManager = function () {
	  function KeyManager(config) {
	    _classCallCheck(this, KeyManager);

	    this.stateManager = config.stateManager;
	    this.upPressed = false;
	    this.downPressed = false;
	    this.leftPressed = false;
	    this.rightPressed = false;
	    this.spacePressed = false;
	    this.init();
	  }

	  _createClass(KeyManager, [{
	    key: 'init',
	    value: function init() {
	      var keyUp = this.handleKeyUp.bind(this);
	      var keyDown = this.handleKeyDown.bind(this);
	      window.addEventListener('keyup', keyUp);
	      window.addEventListener('keydown', keyDown);
	      this.clearKeyListeners = function () {
	        window.removeEventListener('keyup', keyUp);
	        window.removeEventListener('keydown', keyDown);
	      };
	    }
	  }, {
	    key: 'addStartListener',
	    value: function addStartListener() {
	      var _this = this;

	      var start = function start(e) {
	        if (e.keyCode === 13) {
	          _this.stateManager.currentState = _this.stateManager.playingState;
	          window.removeEventListener('keydown', start);
	        }
	      };
	      window.addEventListener('keydown', start);
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(e) {
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
	    }
	  }, {
	    key: 'handleKeyUp',
	    value: function handleKeyUp(e) {
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

	      if (e.keyCode === 32) {
	        this.spacePressed = false;
	      }
	    }
	  }]);

	  return KeyManager;
	}();

	exports.default = KeyManager;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SpaceInvadersConfig = {
	  gameWidth: 800,
	  gameHeight: 600,
	  entityRadius: 20,
	  shipStartPos: [400, 500],
	  rockStartPos: [400, 300],
	  shipMoveSpeed: 2,
	  rockSpeed: 2,
	  shipBulletSpeed: 3,
	  alienBulletSpeed: 2,
	  alienBulletFrequency: 1000,
	  alienGap: 95,
	  alienWobble: 60,
	  alienStartPos: 40,
	  respawnRate: 2000,
	  shipLives: 5
	};

	exports.default = SpaceInvadersConfig;

/***/ }
/******/ ]);