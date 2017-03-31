import Entity from './entity'
import Images from '../assets/images'

class Explosion extends Entity {
  constructor(initialState) {
    super(initialState)
    this.sprite = Images.explosion
    this.frameX = 0;
    this.frameY = 0;
    this.frameWidth = 128;
    this.frameHeight = 128;
    this.counter = 0;
  }

  tick() {
    this.counter += 1
  }

  updateSpriteFrame() {
    this.frameX += this.frameWidth;

    if (this.frameX >= 640) {
      this.frameX = 0;
      this.frameY += this.frameHeight;
    }

    if (this.frameY > 1152) {
      this.stateManager.playingState.explosions.shift();
    }
  }

  draw() {
    this.stateManager.context.drawImage(
        this.sprite,
        this.frameX,
        this.frameY,
        this.frameWidth,
        this.frameHeight,
        this.pos[0] - 60,
        this.pos[1] - 60,
        this.frameWidth,
        this.frameHeight
      )

      if (this.counter % 3 === 0) {
        this.updateSpriteFrame()
      }
  }

  render() {
    this.draw()
  }

}


export default Explosion
