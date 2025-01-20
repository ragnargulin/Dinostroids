//---- GLOBAL VARIABLES ----//
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
}

// Placeholder Scoreboard array (global)
let topScores: { name: string; score: number }[] = [
  { name: "Ragnar", score: 5000 },
  { name: "Ragnar", score: 3000 },
  { name: "Ragnar", score: 7000 },
  { name: "Catharina", score: 4500 },
  { name: "Lil' Creep", score: 2000 }
];

let latestScore: number = 42;

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

function keyPressed() {
  if (key === ' ') {
    console.log('Spacebar pressed');
    soundeffects.laserSound.play();
  }
}

