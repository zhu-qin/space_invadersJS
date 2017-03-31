class KeyManager {
  constructor(config) {
    this.stateManager = config.stateManager
    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.spacePressed = false;
    this.init();
  }

  init() {
    let keyUp = this.handleKeyUp.bind(this)
    let keyDown = this.handleKeyDown.bind(this)
    window.addEventListener('keyup', keyUp)
    window.addEventListener('keydown', keyDown)
    this.clearKeyListeners = () => {
      window.removeEventListener('keyup', keyUp)
      window.removeEventListener('keydown', keyDown)
    }
  }

  addStartListener() {
    let start = (e) => {
      if (e.keyCode === 13) {
        this.stateManager.currentState = this.stateManager.playingState
        window.removeEventListener('keydown', start)
      }
    }
    window.addEventListener('keydown', start)
  }

  handleKeyDown(e) {
    if (e.keyCode === 65) {
      this.leftPressed = true;
    } else if (e.keyCode === 68) {
      this.rightPressed = true;
    }

    if (e.keyCode === 83) {
      this.downPressed = true;
    } else if (e.keyCode === 87) {
      this.upPressed = true;
    }

    if (e.keyCode === 32) {
      this.spacePressed = true;
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 65) {
      this.leftPressed = false;
    } else if (e.keyCode === 68) {
      this.rightPressed = false;
    }

    if (e.keyCode === 83) {
      this.downPressed = false;
    } else if (e.keyCode === 87) {
      this.upPressed = false;
    }

    if (e.keyCode === 32){
      this.spacePressed = false;
    }
  }

}


export default KeyManager
