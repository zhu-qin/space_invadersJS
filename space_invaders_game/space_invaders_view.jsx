import React from 'React'
import StateManager from './stateManager'
import Images from './assets/images'
import LeftPanelSpaceInvaders from './left_panel_space_invaders.jsx'

let imagesLoaded = false;

class SpaceInvadersView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    ctx.font = "24px serif";
    ctx.fillStyle = "#fff";
    // ctx.strokeStyle = "black";

    if (!localStorage.highScores) {
      localStorage.highScores = "0";
    }

    if (!imagesLoaded){
      Images.loadImages(ctx, () => {
        imagesLoaded = true
        this.startGame(ctx)
      })
    } else {
      this.startGame(ctx)
    }
  }

  startGame(ctx) {
    this.state.game = new StateManager({ context: ctx, reactView: this })
    this.state.game.showMenu()
    this.panel = <LeftPanelSpaceInvaders game={this.state.game} />
    this.forceUpdate()
  }

  componentWillUnmount() {
    this.state.game.unMountGame()
  }

  render() {
    let canvas = <canvas id="canvas" height="600" width="800"></canvas>
      return (
          <div className="game-wrapper">
            {this.panel}
            <div className="gameview">
              {canvas}
            </div>
          </div>
      )
  }

}

export default SpaceInvadersView
