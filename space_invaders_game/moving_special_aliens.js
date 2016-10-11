const Alien = require('./moving_aliens');
const Images = require('./images');
const Utils = require('./utils');

class SpecialAlien extends Alien {

  constructor(params) {
    super(params);
    this.image = Images.red_invader;
    this.move_x = params.move_x;
  }

  moveObj() {
    this.x_pos += this.move_x;
  }
}


module.exports = SpecialAlien;
