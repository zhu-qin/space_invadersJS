var images = {
  loading: 0,
  loaded: false
};
function addImages(imagesArray){

    imagesArray.forEach((imageName)=>{
      
      let img = new Image();
      img.onload = function () {
        images[imageName] = img;
        images.loading += 1;
        if (images.loading === imagesArray.length) {
          images.loaded = true;
        }
      };
      img.src = `space_invaders_game/images/${imageName}.png`;
    });
}

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

addImages(imageFiles);

module.exports = images;
