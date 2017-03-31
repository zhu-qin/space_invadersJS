class Entity {
  constructor(initialState) {
    this.type = initialState.type
    this.pos = initialState.pos
    this.vector = initialState.vector
    this.sprite = initialState.sprite
    this.stateManager = initialState.stateManager
    this.radius = this.stateManager.config.entityRadius
  }

  isOutsideHorizontal() {
    return (
      this.pos[0] - this.radius <= 0 ||
      this.pos[0] + this.radius >= this.stateManager.gameWidth
    )
  }

  isOutsideVertical() {
    return (
      this.pos[1] - this.radius <= 0 ||
      this.pos[1] + this.radius >= this.stateManager.gameHeight
    )
  }

  preTick() {

  }

  tick() {
    this.pos[0] += this.vector[0]
    this.pos[1] += this.vector[1]
  }

  render() {
    this.stateManager.context.drawImage(this.sprite, this.pos[0], this.pos[1], 50, 50)
  }

  postRender() {
    let ctx = this.stateManager.context
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true)
    ctx.stroke();
  }
}


export default Entity
