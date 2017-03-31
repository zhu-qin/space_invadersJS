import React from 'react';
import Links from '../links.jsx';

class LeftPanelSpaceInvaders extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.listener = this.props.game.addScoreListener(this.forceUpdate.bind(this))
  }

  componentWillReceiveProps(props) {
    this.listener = props.game.addScoreListener(this.forceUpdate.bind(this))
  }

  componentWillUnmount(){
    this.listener.remove()
  }

  render() {
    let game = this.props.game
    let shipLives = game ? Array(game.playingState.shipLives).fill().map((el, idx) => {
      return <img key={idx} src="./app/space_invaders_game/assets/images/ship.png"></img>
    }) : undefined

    let score = (
      <div className={'left-panel-score'}>
        High Score: {localStorage.spaceInvadersHighScores} <br></br>
        Current Score: {game ? game.currentState.score : undefined}
          <div className={'left-panel-lives'}>
          {shipLives}
          </div>
      </div>
    )

    return (
      <div className="left-panel">
        <div className="left-panel-profile">
          {score}
        </div>
        <Links/>
      </div>
    );
  }

}


module.exports = LeftPanelSpaceInvaders;
