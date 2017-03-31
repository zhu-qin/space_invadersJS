import Entity from './entity'
import Images from '../assets/images'
import Bullet from './bullet'

class Alien extends Entity {
  constructor(initialState) {
    super(initialState)
    this.sprite = Images.green_invader
    this.type = 'Alien'
  }

  fireBullet(){
    let bullet = new Bullet({
      pos: Object.assign([], this.pos),
      stateManager: this.stateManager,
      type: 'AlienBullet'
    })
    this.stateManager.playingState.alienBullets.push(bullet)
  }

  tick() {
    if (Math.floor(Math.random()*this.stateManager.config.alienBulletFrequency) === 1) {
      this.fireBullet()
    }
    this.pos[0] += this.vector[0]
    this.pos[1] += this.vector[1]
  }

  render() {
    this.stateManager.context.drawImage(
      this.sprite,
      this.pos[0] - 25,
      this.pos[1] - 25,
      50,
      50
    )
  }

}

export default Alien
