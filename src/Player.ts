class Player extends MoveableObject {
  private isFacingRight: boolean;
  private gameBoard: GameBoard;
  private spaceKeyWasPressedInPrevFrame: boolean;

  public isShieldActive: boolean;
  private shieldTimer: number;
  private powerupSound: p5.SoundFile;

  constructor(gameBoard: GameBoard) {
    super(width * 0.5 - 60, height - 120, 120, 120, 0, 0, imageAssets.dino);
    this.isFacingRight = true; // Initial facing direction
    this.gameBoard = gameBoard;
    this.spaceKeyWasPressedInPrevFrame = keyIsDown(32);

    this.isShieldActive = false;
    this.shieldTimer = 0;
    this.powerupSound = soundeffects.powerupSound;

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

  private shootLaser() {
    soundeffects.laserSound.play();
    let laserStartX = this.position.x + this.size.x / 2 + 25;

    // Adjust laser position based on facing direction
    if (!this.isFacingRight) {
      laserStartX = this.position.x - this.size.x / 2 + 74;  // Adjust for left-facing Dino
    }

    // Create a laser at the player's current position
    const laser = new Laser(laserStartX, this.position.y - 50, imageAssets.laser);
    this.gameBoard.addGameObject(laser);  // Add laser to the game through GameBoard reference
  }

  public activateShield(duration: number, dinowithshield2: p5.Image) {
    this.isShieldActive = true; //Om sköld aktiv är sant ska Dino byta till sköldbilden
    this.image = dinowithshield2;
    //this.powerupSound = powerupSound;
    this.shieldTimer = millis() + duration; //Tid för hur länge skölden ska vara aktiv. Beräknar tiden då skölden ska inaktiveras genom att lägga till duration till den aktuella tiden (i millisekunder).

    setTimeout(() => {
      this.deactivateShield();
    }, duration)
  }

  private deactivateShield(): void { //Om sköld aktiv är falskt ska Dino byta till gamla bilden
    this.isShieldActive = false;
    this.image = imageAssets.dino;
  }

  public draw() {
    push();
    if (keyIsDown(32) && !this.spaceKeyWasPressedInPrevFrame) {
      this.shootLaser();
    }

    // Ensure the player stays within the canvas boundaries
    this.position.x = constrain(this.position.x, 0, width - this.size.x);
    this.spaceKeyWasPressedInPrevFrame = keyIsDown(32);

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
