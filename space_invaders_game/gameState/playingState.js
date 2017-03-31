import GameState from './gameState'
import Ship from '../entities/ship'
import Alien from '../entities/alien'
import Bullet from '../entities/bullet'
import Rock from '../entities/rock'
import Explosion from '../entities/explosion'
import SpaceInvadersUtils from '../spaceInvadersUtils'
import SpecialAlien from '../entities/specialAlien'

class PlayingState extends GameState {
  constructor(initialState) {
    super(initialState)
    this.ship = [this.makeShip()]
    this.rock = [this.makeRock()]
    this.shipBullets = []
    this.alienBullets = []
    this.explosions = []
    this.aliens = this.makeAliens()
    this.setVectorForAlien = this.setVectorFunction()
    this.counter = 0
    this.spawnCounter = 0
    this.shipLives = this.stateManager.config.shipLives
    this.score = 0
  }

  makeShip() {
    return new Ship({
      pos: Object.assign([], this.stateManager.config.shipStartPos),
      vector: [0, 0],
      stateManager: this.stateManager
    })
  }

  makeRock() {
    return new Rock({
      pos: Object.assign([], this.stateManager.config.rockStartPos),
      vector: [this.stateManager.config.rockSpeed, 0],
      stateManager: this.stateManager
    })
  }

  makeAliens() {
    let aliens = []
    let alienGap = this.stateManager.config.alienGap
    let alienStartPos = this.stateManager.config.alienStartPos
    for (let i = alienStartPos; i < this.stateManager.gameWidth - 50; i += alienGap) {
      for(let j = 50; j < this.stateManager.gameHeight - 400; j += 70) {
        aliens.push(new Alien({
          vector: [0, 0],
          pos: [i, j],
          stateManager: this.stateManager
        }))
      }
    }
    return aliens
  }

  joinEntities() {
    return [].concat(
      this.rock,
      this.ship,
      this.aliens,
      this.shipBullets,
      this.alienBullets,
      this.explosions
    )
  }

  setVectorFunction() {
    let direction = 'right'
    return () => {
      this.aliens.forEach((alien) => {
        alien.vector = direction === 'right' ?  [1, 0] : [-1, 0]
        alien.pos[1] += 5
      })
      direction = direction === 'right' ? 'left' : 'right'
    }
  }

  addExplosion(entity) {
    this.explosions.push(
      new Explosion({
        pos: entity.pos,
        vector: [0, 0],
        stateManager: this.stateManager
      })
    )
  }

  remove(entity) {
    if (entity.type === 'ShipBullet') {
      this.shipBullets.splice(this.shipBullets.indexOf(entity), 1)
    } else if (entity.type === 'AlienBullet') {
      this.alienBullets.splice(this.alienBullets.indexOf(entity), 1)
    } else if (entity.type === 'Alien') {
      this.aliens.splice(this.aliens.indexOf(entity), 1)
    }
  }

  takeShipLife() {
    if (this.ship[0].isCollidable()) {
      this.addExplosion(this.ship[0])
      this.ship[0].counter = 0
      this.shipLives -= 1
      this.ship[0].pos = Object.assign([], this.stateManager.config.shipStartPos)
    }
  }

  shipCollisions() {
    this.collidesWithRock(this.ship[0])
    this.alienBullets.concat(this.aliens).forEach((entity) => {
      this.collidesWithRock(entity)
      let distance = SpaceInvadersUtils.distance(entity.pos, this.ship[0].pos)
      if (distance <= entity.radius + this.ship[0].radius) {
        this.remove(entity)
        this.addExplosion(entity)
        this.takeShipLife()
      }
    })
  }

  collidesWithRock(entity) {
    let collided = false
    let distance = SpaceInvadersUtils.distance(this.rock[0].pos, entity.pos)
    if (distance <= entity.radius + this.rock[0].radius) {
      collided = true
    }
    if (entity.type === 'ShipBullet' && collided) {
      this.remove(entity)
      this.rock[0].vector[1] -= 1
      this.addExplosion(entity)
    } else if (entity.type === 'AlienBullet' && collided) {
      this.remove(entity)
      this.addExplosion(entity)
      this.rock[0].vector[1] += 1
    } else if (entity.type === 'Alien' && collided) {
      this.score += 100
      this.remove(entity)
      this.addExplosion(entity)
    } else if (entity.type === 'Ship' && collided) {
      this.takeShipLife()
    }
  }

  alienCollisions() {
    this.shipBullets.forEach((shipBullet) => {
      this.collidesWithRock(shipBullet)
        this.aliens.forEach((alien) => {
          let distance = SpaceInvadersUtils.distance(alien.pos, shipBullet.pos)
          if (distance <= alien.radius + shipBullet.radius) {
            this.score += 100
            this.remove(alien)
            this.remove(shipBullet)
            this.addExplosion(alien)
          }
      })
    })
  }

  checkCollisions() {
    this.shipCollisions()
    this.alienCollisions()
  }

  spawnAliens() {
    this.spawnCounter += 1
    if (this.spawnCounter%this.stateManager.config.respawnRate === 0 || this.aliens.length === 0) {
      this.aliens = this.aliens.concat(this.makeAliens())
      this.spawnCounter = 0
    }
  }

  setHighScore() {
    if (localStorage.spaceInvadersHighScores && this.score > localStorage.spaceInvadersHighScores) {
      localStorage.spaceInvadersHighScores = this.score
    }
  }

  isGameOver() {
    if (this.shipLives <= 0) {
      this.shipLives = this.stateManager.config.shipLives
      this.stateManager.setMenuState()
      this.setHighScore()
      return true
    }
  }

  tick() {
    if (this.counter%this.stateManager.config.alienWobble === 20) {
      this.setVectorForAlien()
    }
    this.joinEntities().forEach((entity) => entity.tick())
    this.checkCollisions()
    this.spawnAliens()
    this.counter += 1
  }

  render() {
    this.joinEntities().forEach((entity) => entity.render())
    this.isGameOver()
  }

  postRender() {
    this.joinEntities().forEach((entity) => entity.postRender())
  }
}


export default PlayingState
