class Player extends MoveableObject {
  private isFacingRight: boolean;
  private gameBoard: GameBoard;

  constructor(gameBoard: GameBoard) {
    super(width * 0.5 - 60, height - 120, 120, 120, 0, 0, imageAssets.dino);
    this.isFacingRight = true; // Initial facing direction
    this.gameBoard = gameBoard;
  }

  public update() {
    super.update();

    // Update velocity and facing direction
    if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5;
      this.isFacingRight = false; // Facing left
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5;
      this.isFacingRight = true; // Facing right
    } else {
      this.velocity.x = 0;
    }

    // Ensure the player stays within the canvas boundaries
    this.position.x = constrain(this.position.x, 0, width - this.size.x);
  }

  /**
   * Handle key presses specific to the Player.
   * This method should be called when a key is pressed.
   */
  public handleKeyPress() {
    if (keyCode === 32) {  // 32 is the key code for the space bar
      console.log("Spacebar pressed");
      this.shootLaser();
      // Optionally, play laser sound
      soundeffects.laserSound.play();
    }
  }

  private shootLaser() {
    let laserStartX = this.position.x + this.size.x / 2 - 14 ;

    // Adjust laser position based on facing direction
    if (!this.isFacingRight) {
      laserStartX = this.position.x - this.size.x / 2 +36;  // Adjust for left-facing Dino
    }

    // Create a laser at the player's current position
    const laser = new Laser(laserStartX, this.position.y - 50, imageAssets.laser);
    this.gameBoard.addGameObject(laser);  // Add laser to the game through GameBoard reference
  }

  public draw() {
    push();  // Save the current transformation state

    if (!this.isFacingRight) {
      translate(this.position.x + this.size.x, this.position.y); // Adjust position for flipping
      scale(-1, 1); // Flip horizontally
    } else {
      translate(this.position.x, this.position.y);
    }
    image(this.image, 0, 0, this.size.x, this.size.y);
    pop(); 
  }
}