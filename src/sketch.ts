//---- GLOBAL VARIABLES ----//
let game: Game;


let images: {  
  player: p5.Image;
  astroid: p5.Image;
  bigAstoid: p5.Image;
  superAstoid: p5.Image;
  background: p5.Image;
  laser: p5.Image; // Add laser image
}

// preload function
function preload() {
  images = {
    player: loadImage("../assets/assets/images/dino.gif"),
    astroid: loadImage("../assets/assets/images/smallMeteor.png"),
    bigAstoid: loadImage("../assets/assets/images/bigAstro.png"),
    superAstoid: loadImage("../assets/assets/images/superAstro.png"),
    background: loadImage("../assets/assets/images/Background.png"),
    laser: loadImage("../assets/assets/images/Laserboltreal.png") // Make sure the image exists
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

  game = new Game();
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


/**
 *  Built in windowResize listener function in P5
 */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
