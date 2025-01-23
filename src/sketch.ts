let game: DinoStroids;
let cnv: any;

let music: {
  mystery: p5.SoundFile;
};
let soundeffects: {
  laserSound: p5.SoundFile;
  buttonClick: p5.SoundFile;
}
let imageAssets: {  
  dino: p5.Image;
  background: p5.Image;
  gameTitle: p5.Image;
  moveImage: p5.Image;
  shootImage: p5.Image;
  hearts: p5.Image;
  laser: p5.Image;
}


/**
 * Built in preload function in P5
 * This is a good place to load assets such as
 * sound files, images etc...
 */
function preload() {
  music = {
    mystery: loadSound("../assets/music/backgroundMusic.mp3"),
  };
  soundeffects = {
    buttonClick: loadSound("../assets/soundeffects/buttonClick.mp3"),
    laserSound: loadSound("../assets/soundeffects/laserSound.mp3"),
  }
  imageAssets = {
    dino: loadImage("../assets/images/dino.gif"),
    background: loadImage("../assets/images/background.png"),
    gameTitle: loadImage("../assets/images/gameTitle.png"),
    moveImage: loadImage("../assets/images/Frame-17.png"),
    shootImage: loadImage("../assets/images/Frame-19.png"),
    hearts: loadImage("../assets/images/heart.png"),
    laser: loadImage("../assets/images/regularLaser.gif")
  };
}

/**
 * Built in setup function in P5
 * This is a good place to create your first class object
 * and save it as a global variable so it can be used
 * in the draw function belows
 */
function setup() {
  cnv = createCanvas(1000, 666);
  centerCanvas();
  frameRate(60);
  game = new DinoStroids();
}

function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
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

//keyPressed används för input och i spelbrädet. Flytta ner några nivåer
function keyPressed() {
  if (game && typeof game.getActiveScene === "function") {
    const scene = game.getActiveScene();
    if (scene && typeof scene.keyPressed === "function") {
      scene.keyPressed();
    }
  }
}

/**
 * FORWARD MOUSEPRESSED
 * So your custom scenes can detect clicks (e.g. focusing a text box).
 */
function mousePressed() {
  if (game && typeof game.getActiveScene === "function") {
    const scene = game.getActiveScene();
    if (scene && typeof scene.mousePressed === "function") {
      scene.mousePressed();
    }
  }
}

function keyReleased() {
  if (game && typeof game.getActiveScene === "function") {
    const scene = game.getActiveScene();
    if (scene && typeof scene.keyReleased === "function") {
      scene.keyReleased();
    }
  }
}
 