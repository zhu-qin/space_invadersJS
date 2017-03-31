import Entity from './entity'
import Images from '../assets/images.js'

class Bullet extends Entity {
  constructor(initialState) {
    super(initialState)
    this.setSprite()
    this.radius = 5
  }

  setSprite() {
    if (this.type === 'AlienBullet') {
      this.sprite = Images.alien_bullet
      this.vector = [0, this.stateManager.config.alienBulletSpeed]
    } else if (this.type === 'ShipBullet') {
      this.sprite = Images.ship_bullet
      this.vector = [0, -this.stateManager.config.shipBulletSpeed]
    }
  }

  checkIfVisible() {
    if (this.isOutsideHorizontal()) {
      this.stateManager.playingState.remove(this)
    }
  }

  tick() {
    this.pos[0] += this.vector[0]
    this.pos[1] += this.vector[1]
    this.checkIfVisible()
  }

  render() {
    this.stateManager.context.drawImage(
      this.sprite,
      this.pos[0] - 20,
      this.pos[1] - 20,
      50,
      50
    )
  }

}


export default Bullet
