class Player extends GameObject {
  
  constructor() {
    super(width * 0.5, height - 120, 100, 120, 0, 0, images.player);
  }

  public update() {
    super.update();

    // Player movement
    if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5;
    } else {
      this.velocity.x = 0;
    }

    // Shoot laser when space is pressed
    if (keyIsDown(32)) {  // 32 is the key code for the space bar
      this.shootLaser();
    }
  }

  private shootLaser() {
    // Create a laser at the player's current position
    const laser = new Laser(this.position.x + this.size.x / 2 + 20, this.position.y, images.laser);
    game.addGameObject(laser);  // Add laser to the game
  }
}
