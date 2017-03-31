import Entity from './entity'
import Bullet from './bullet'
import Explosion from './explosion'
import Images from '../assets/images'

class Ship extends Entity {
  constructor(initialState) {
    super(initialState)
    this.sprite = Images.ship
    this.type = 'Ship'
    this.counter = 120
    this.gunCounter = 0
    this.radius = 25
  }

  updatePosition() {
    let keys = this.stateManager.keyManager
    let conf = this.stateManager.config
    if ( keys.leftPressed && this.pos[0] - this.radius >= 0) {
      this.pos[0] -= conf.shipMoveSpeed
    }
    if ( keys.downPressed && this.pos[1] + this.radius <= this.stateManager.gameHeight) {
      this.pos[1] += conf.shipMoveSpeed
    }
    if ( keys.rightPressed && this.pos[0] + this.radius <= this.stateManager.gameWidth)  {
      this.pos[0] += conf.shipMoveSpeed
    }
    if ( keys.upPressed && this.pos[1] - this.radius >= 0) {
      this.pos[1] -= conf.shipMoveSpeed
    }
  }

  fire() {
    let spacePressed = this.stateManager.keyManager.spacePressed
    if (spacePressed && this.gunCounter%20 === 10) {
      let bullet = new Bullet({
        stateManager: this.stateManager,
        pos: Object.assign([], this.pos),
        vector: [0, -this.stateManager.config.shipBulletSpeed],
        type: "ShipBullet"
      })
      this.stateManager.playingState.shipBullets.push(bullet)
    } else if (!spacePressed) {
      this.gunCounter = 5
    }
  }

  isCollidable() {
    return this.counter >= 120
  }

  draw(){
    this.stateManager.context.drawImage(
      this.sprite,
      this.pos[0] - 25,
      this.pos[1] - 25,
      50,
      50
    )
  }

  tick() {
    this.counter += 1
    this.gunCounter += 1
    this.updatePosition()
    this.fire()
  }

  render() {
    if (this.counter > 120 || this.counter%5 === 0) {
      this.draw()
    }
  }

}


export default Ship
