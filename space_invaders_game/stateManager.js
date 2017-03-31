import MenuState from './gameState/menuState'
import PlayingState from './gameState/playingState'
import KeyManager from './keyManager'
import SpaceInvadersConfig from './spaceInvadersConfig'

class StateManager {
  constructor(config) {
    this.config = SpaceInvadersConfig
    this.gameWidth = SpaceInvadersConfig.gameWidth
    this.gameHeight = SpaceInvadersConfig.gameHeight
    this.keyManager = new KeyManager({stateManager: this})
    this.menuState = new MenuState({stateManager: this})
    this.playingState = new PlayingState({stateManager: this})
    this.currentState = this.menuState
    this.context = config.context
    this.reactView = config.reactView
    this.running = false
    this.forceUpdate = undefined
    this.showMenu()
  }

  showMenu() {
    this.setMenuState()
    this.run()
  }

  unMountGame() {
    this.running = false
    this.keyManager.clearKeyListeners()
  }

  setMenuState(){
    this.currentState = this.menuState
    this.keyManager.addStartListener()
  }

  addScoreListener(listener) {
    this.forceUpdate = listener
    return {
      remove: () => {
        delete this.forceUpdate
      }
    }
  }

  preTick() {
    this.currentState.preTick()
  }


  tick() {
    this.currentState.tick()
  }

  render() {
    this.context.clearRect(0, 0, 800, 600)
    this.currentState.render()
  }

  postRender() {
    this.currentState.postRender()
  }

  run() {
    this.running = true;
    // let timeNow = Date.now(),
    //     millisecondsPerFrame = (1000/60),
    //     timeDelta = 0,
    //     nextTime = undefined
    this.interval = setInterval(() => {
        // nextTime = Date.now()
        // timeDelta += (nextTime - timeNow)
        // timeNow = nextTime
        //
        // if (timeDelta >= millisecondsPerFrame) {
        // this.preTick()
          if (this.running) {
            // this.forceUpdate()
            // this.preTick()
            this.tick()
            this.render()
            // this.postRender()
          } else {
            clearInterval(this.interval)
          }
        // this.postRender()
        //   timeDelta -= millisecondsPerFrame
        // }
    }, 1000/60)
  }

}

export default StateManager
