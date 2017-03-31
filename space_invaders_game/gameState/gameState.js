class GameState {
  constructor(initialState) {
    this.stateManager = initialState.stateManager
  }

  preTick(){}
  tick(){}
  render(){}
  postRender(){}

}

export default GameState
