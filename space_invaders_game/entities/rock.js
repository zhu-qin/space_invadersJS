import Entity from './entity'
import Images from '../assets/images.js'

class Rock extends Entity {
  constructor(initialState) {
    super(initialState)
    this.sprite = Images.rock
    this.frameX = 0
    this.frameY = 0
    this.frameWidth = 256
    this.frameHeight = 256
    this.counter = 0
    this.radius = 40
  }

  draw() {
    this.stateManager.context.drawImage(
      this.sprite,
      this.frameX,
      this.frameY,
      this.frameWidth,
      this.frameHeight,
      this.pos[0] - 65,
      this.pos[1] - 65,
      this.frameWidth/2,
      this.frameHeight/2
    )

    if (this.counter%3 === 0) {
      this.updateSpriteFrame()
    }
  }

  updateSpriteFrame() {
    this.frameX += this.frameWidth;
    if (this.frameX >= 2048) {
      this.frameX = 0;
      this.frameY += this.frameHeight;
    }

    if (this.frameY >= 2048/2) {
      this.frameY = 0;
    }
  }

  checkWalls(){
    if (this.isOutsideHorizontal()) {
      this.vector[0] = -this.vector[0]
    }

    if (this.isOutsideVertical()) {
      this.vector[1] = -this.vector[1]
    }
  }

  updateVerticalPosition() {
    if (Math.abs(this.vector[1]) > 5) {
      this.vector[1] = this.vector[1] - this.vector[1]%5
    }
  }

  tick(){
    this.checkWalls()
    this.updateVerticalPosition()
    this.pos[0] += this.vector[0]
    this.pos[1] += this.vector[1]
    this.counter += 1
  }

  render() {
    this.draw()
  }

}

export default Rock
