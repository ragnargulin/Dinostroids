//---- GLOBAL VARIABLES ----//
let game: DinoStroids;
const mainMenu = new MainMenu();

let music: {
  mystery: p5.SoundFile;
  laserSound: p5.SoundFile;
};
let imageAssets: {  
  dino: p5.Image;
  background: p5.Image;

}

/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  music = {
    mystery: loadSound("/assets/music/backgroundMusic.mp3"),
    laserSound: loadSound("/assets/music/laserSound.mp3"),
  };
  imageAssets = {
    dino: loadImage("/assets/music/dino.gif"),
    background: loadImage("assets/music/background.png")
  };
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  music.mystery.setVolume(0.8);

  game = new DinoStroids(mainMenu);
}







/**
 * Built in draw function in P5
 * This is a good place to call public methods of the object
 * you created in the setup function above
 */
function draw() {
  game.update();
  game.draw();
}

function keyPressed() {
  if (key === ' ') {
    console.log('Spacebar pressed, switching to GameScene...');
    game.changeActiveScene(new MainMenu());
  }
}

/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}