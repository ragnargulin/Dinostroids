class Player extends MoveableObject {
  private isFacingRight: boolean;
  private gameBoard: GameBoard;
  private spaceKeyWasPressedInPrevFrame: boolean;

  public isShieldActive: boolean;
  private shieldTimer: number;         
  private powerupSound: p5.SoundFile; 
  private shieldSound: p5.SoundFile;   

  constructor(gameBoard: GameBoard) {
    super(width * 0.5 - 60, height - 120, 120, 120, 0, 0, imageAssets.dino);

    this.isFacingRight = true;
    this.gameBoard = gameBoard;
    // Check if space is pressed at start
    this.spaceKeyWasPressedInPrevFrame = keyIsDown(32);

    this.isShieldActive = false;
    this.shieldTimer = 0;
    this.powerupSound = soundeffects.powerupSound;
    this.shieldSound = soundeffects.shieldSound;
  }

  public update() {
    super.update();

    if (this.isShieldActive) {
      if (millis() > this.shieldTimer) {
        this.deactivateShield();
      }
    }

    // Movement Logic
    if (keyIsDown(LEFT_ARROW)) {
      this.velocity.x = -5;
      this.isFacingRight = false;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.velocity.x = 5;
      this.isFacingRight = true;
    } else {
      this.velocity.x = 0;
    }

    // Ensure player stays within canvas boundaries
    this.position.x = constrain(this.position.x, 0, width - this.size.x);
  }

  private shootLaser() {
    soundeffects.laserSound.play();

    let laserStartX = this.position.x + this.size.x / 2 + 25;
    if (!this.isFacingRight) {
      laserStartX = this.position.x - this.size.x / 2 + 74;
    }

    // Create a laser slightly above the player's position
    const laser = new Laser(laserStartX, this.position.y - 50, imageAssets.laser);
    this.gameBoard.addGameObject(laser);
  }

  public activateShield(duration: number, dinowithshield2: p5.Image) {
    this.isShieldActive = true;
    this.image = dinowithshield2;

    this.shieldTimer = millis() + duration;

    this.powerupSound.play();

    this.shieldSound.loop();
  }

  private deactivateShield(): void {
    this.isShieldActive = false;
    this.image = imageAssets.dino;
    this.shieldSound.stop();
  }

  public draw() {
    //Shooting Logic
    if (keyIsDown(32) && !this.spaceKeyWasPressedInPrevFrame) {
      this.shootLaser();
    }
    this.spaceKeyWasPressedInPrevFrame = keyIsDown(32);

    this.position.x = constrain(this.position.x, 0, width - this.size.x);

    push();
    if (!this.isFacingRight) {
      translate(this.position.x + this.size.x, this.position.y);
      scale(-1, 1);
    } else {
      translate(this.position.x, this.position.y);
    }

    image(this.image, 0, 0, this.size.x, this.size.y);
    pop();
  }
}
