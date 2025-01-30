class Player extends MoveableObject {
  public isFacingRight: boolean;
  private gameBoard: GameBoard;
  private spaceKeyWasPressedInPrevFrame: boolean;

  public isShieldActive: boolean;
  public isSuperLaserActive: boolean
  private shieldTimer: number;         // Now used to track shield expiration
  private superLaserTimer: number;         // Now used to track shield expiration
  private powerupSound: p5.SoundFile;  // Now played when shield activates
  private shieldSound: p5.SoundFile;   // Loops while shield is active

  constructor(gameBoard: GameBoard) {
    super(width * 0.5 - imageAssets.dino.width/2, height - imageAssets.dino.height, imageAssets.dino.width, imageAssets.dino.height, 0, 0, imageAssets.dino);

    this.isFacingRight = true;
    this.gameBoard = gameBoard;
    // Check if space is pressed at start
    this.spaceKeyWasPressedInPrevFrame = keyIsDown(32);

    this.isShieldActive = false;
    this.isSuperLaserActive = false;
    this.shieldTimer = 0;
    this.superLaserTimer = 0;
    this.powerupSound = soundeffects.powerupSound;
    this.shieldSound = soundeffects.shieldSound;
  }

  public update() {
    super.update();

    // --------------------------
    // 1) Shield Timer Check
    // --------------------------
    // If shield is active and enough time has passed, turn it off
    if (this.isShieldActive) {
      if (millis() > this.shieldTimer) {
        this.deactivateShield();
      }
    }
    if (this.isSuperLaserActive) {
      if (millis() > this.superLaserTimer) {
        this.deactivateSuperLaser();}
    }

    // --------------------------
    // 2) Movement Logic
    // --------------------------
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

  public shootLaser() {
    soundeffects.laserSound.play();

    // Adjust X based on facing direction
    let laserStartX = this.position.x + this.size.x / 2 + 25;
    if (!this.isFacingRight) {
        // Shift a bit more to the left for left-facing Dino
        laserStartX = this.position.x - this.size.x / 2 + 74;
    }

    // Create a laser slightly above the player's position
    if (this.isSuperLaserActive) {
        return;
    } else {
        console.log("Laser Fired");
        const laser = new Laser(laserStartX, this.position.y - 50, imageAssets.laser);
        this.gameBoard.addGameObject(laser);
    }
}


  /**
   * Activates the shield for "duration" ms, switching to a shield image,
   * playing a one-time power-up sound, and looping shield sound while active.
   *
   * We store the "end time" in shieldTimer, then check in update() if
   * we've exceeded that time (millis() > shieldTimer).
   */
  public activateShield(duration: number, dinowithshield2: p5.Image) {
    this.isShieldActive = true;
    this.image = dinowithshield2;
    
    // Update size to match the new image's dimensions
    this.size = createVector(dinowithshield2.width, dinowithshield2.height);
    this.position = createVector(this.position.x, height - dinowithshield2.height);



    // We'll end the shield after "duration" ms from now
    this.shieldTimer = millis() + duration;

    // Play a quick "power-up" sound once
    this.powerupSound.play();

    // Loop a shield hum or effect while active
    this.shieldSound.loop();
}

  public activateSuperLaser(duration: number, rampageDino: p5.Image) {
    let laserStartX = this.position.x + this.size.x / 2 + 25;

    this.isSuperLaserActive = true;
    const superLaserBeam = new SuperLaserBeam(laserStartX, this.position.y - 50, imageAssets.superLaserBeam, this);
    this.gameBoard.addGameObject(superLaserBeam);
    this.image = rampageDino;
    this.superLaserTimer = millis() + duration;
    console.log("Super Laser Activated");
  }

  /**
   * Called automatically once shieldTimer is reached, or if something else
   * needs to end the shield early.
   */
  private deactivateShield(): void {
    this.isShieldActive = false;
    this.image = imageAssets.dino;
    
    // Restore original dino image dimensions
    this.size = createVector(imageAssets.dino.width, imageAssets.dino.height);
    this.position = createVector(this.position.x, height - imageAssets.dino.height);

    
    this.shieldSound.stop();
}

  private deactivateSuperLaser(): void {
    this.isSuperLaserActive = false;
    this.image = imageAssets.dino;

    const superLaserBeam = this.gameBoard.moveableObjects.find(obj => obj instanceof SuperLaserBeam);
    if (superLaserBeam) {
        this.gameBoard.removeGameObject(superLaserBeam);
    }
    
    console.log("Super Laser Deactivated");
  }

  public draw() {
    // --------------------------
    // 1) Shooting Logic
    // --------------------------
    if (keyIsDown(32) && !this.spaceKeyWasPressedInPrevFrame) {
      this.shootLaser();
    }
    this.spaceKeyWasPressedInPrevFrame = keyIsDown(32);

    // Just to double-check boundary in draw (slightly redundant but harmless)
    this.position.x = constrain(this.position.x, 0, width - this.size.x);

    // --------------------------
    // 2) Draw Player (flip if left)
    // --------------------------
    push();
    if (!this.isFacingRight) {
      translate(this.position.x + this.size.x, this.position.y);
      scale(-1, 1);
    } else {
      translate(this.position.x, this.position.y);
    }

    image(this.image, 0, 0, this.size.x, this.size.y); //BILDSTORLEKSSPÖKE???!
    pop();
  }
}
