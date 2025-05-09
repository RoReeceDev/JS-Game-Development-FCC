// Change Sprite animations through controls
let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function (e) {
  playerState = e.target.value;
});

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);

// Setting Canvas Width and Height
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerIMG = new Image();
playerIMG.src = 'shadow_dog.png';
let x = 0;

// Take width of the entire file and divide by number of columns
const spriteWidth = 575;

// Take height of the entire file and divide by number of rows
const spriteHeight = 523;

// Adjusting animation speed
let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations = [];
const animationStates = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'getHit',
    frames: 4,
  },
];

// Loop through animation states
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations);

// Animate on Canvas

function animate() {
  // Clear old paint from canvas from every animation frame
  // Clear the entire canvas from canvas width to height
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Cycle between frames - advanced method
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  // Test that its working - Draw a simple rectangle
  // ctx.fillRect(100, 50, 100, 100);
  let frameX = spriteAnimations[playerState].loc[position].x;
  let frameY = spriteAnimations[playerState].loc[position].y;
  // Draw Sprite on Canvas - can pass 3, 5, or 9 arguments depends on how much control you want to have
  // ctx.drawImage(source image, source x coordinate, source y coordinate, source height, source width, destination x coordinate, destination y coordinate, destination width, destination height[])

  ctx.drawImage(
    playerIMG,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  // Loop through idle animation sprite frames - Beginner Method
  //   if (gameFrame % staggerFrames == 0) {
  //     if (frameX < 6) frameX++;
  //     else frameX = 0;
  //   }

  // Loop through idle animation sprite frames - Advanced Method

  gameFrame++;
  // Create an animation loop
  requestAnimationFrame(animate);
}
animate();
