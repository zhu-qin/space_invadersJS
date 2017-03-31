const SpaceInvadersUtils = {
  distance: function(posOne, posTwo) {
    return Math.sqrt(Math.pow(posOne[0] - posTwo[0], 2) + Math.pow(posOne[1] - posTwo[1], 2))
  }
}

export default SpaceInvadersUtils
