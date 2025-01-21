class Player extends MoveableObject {
  private isFacingRight: boolean;

  constructor() {
    super(width*0.5 -60, height - 120, 120, 120, 0, 0, imageAssets.dino);
    this.isFacingRight = true; // Initial facing direction
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


public draw() {
  
    if (!this.isFacingRight) {
      // Flip the canvas horizontally for the player
      translate(this.position.x + this.size.x, this.position.y); // Adjust for flipping
      scale(-1, 1); // Flip horizontally
    } else {
      // Normal rendering
      translate(this.position.x, this.position.y);
    }
  
    // Draw the image at the adjusted position
    image(this.image, 0, 0, this.size.x, this.size.y);
  }
}