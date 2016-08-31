#Space Invaders with a rock.

[Space Invaders with a rock](https://www.qin-zhu.com/space_invadersJS/)

Space Invaders with a rock is a game inspired by the classic game Space Invaders.
It is made on HTML canvas with vanilla JS.

The game lives in the space_invaders_game folder. entry.js is the entry for
webpack.
````javascript
// Game parameters can be set in the utils.js file.
// ship options
shipLives: 5,
shipRight: {x: 6, y: 0},
shipLeft: {x: -6, y: 0},
shipDown: {x: 0, y: 6},
shipUp: {x: 0, y: -6},
shipBullet: {x: 0, y: -20},
invulnerabilityTimer: 120,

// rock options
rockRadius: 35,
offsetRock: 60,

// canvas options
canvasWidth: 800,
canvasHeight: 600,
refreshRate: 25,
````

````javascript
// Images folder contains the sprites and images required by the game.
// If you wish to replace or alter image files add the image into the folder and
// rename your img to the same img you want to replace. Rename your img to .png

// i.e. if you want to switch the green aliens image rename your image
// to green_invader and replace the image.

// If you want to add additional art alter the images.js file to include more
// images to load.
let imageFiles = [
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
  loadImages: function(ctx, startGame){
    imageFiles.forEach((imageName)=>{
      let img = new Image();
      img.onload = function () {
        Images[imageName] = img;
        Images.loading += 1;
        ctx.fillText("LOADING...", 350, 300);
        if (Images.loading === imageFiles.length) {
          startGame();
        }
      };
      img.src = `space_invaders_game/images/${imageName}.png`;
    });
  }
};

module.exports = Images;

````
