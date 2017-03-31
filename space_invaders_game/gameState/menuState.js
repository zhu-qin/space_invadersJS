import GameState from './gameState'
import Images from '../assets/images'

class MenuState extends GameState {
  constructor(initialState) {
    super(initialState)
    this.sprite = Images.intro
  }

  tick() {

  }

  render() {
    this.stateManager.context.drawImage(this.sprite, 280, 300)
  }
}

export default MenuState
