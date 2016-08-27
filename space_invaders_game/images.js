let imageFiles = [
  'background',
  'explosion',
  'ship',
  'ship_bullet',
  'intro',
  'red_invader',
  'alien_bullet',
  'green_invader',
  'rocks'
];

const Images = {
  loading: 0,

  loadImages: function(startGame){
    imageFiles.forEach((imageName)=>{
      let img = new Image();
      img.onload = function () {
        Images[imageName] = img;
        Images.loading += 1;
        if (Images.loading === imageFiles.length) {
          startGame();
        }
      };
      img.src = `space_invaders_game/images/${imageName}.png`;
    });
  }

};


module.exports = Images;
