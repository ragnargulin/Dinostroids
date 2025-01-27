class GameBoard implements IScene {
  private dinoStroids: IChangeableScene;
  private memory: GameMemory;

  private localScore: number = 0;
  private lives: number = 5;

  private backgroundImage: p5.Image;
  private heartImage: p5.Image;

  private menuButton: Button;

  private powerSpawnTimer: number;
  
  private astroSpawnTimer: number;

  private moveableObjects: MoveableObject[];


  constructor(dinoStroids: IChangeableScene) {
    this.dinoStroids = dinoStroids;
    this.memory = this.dinoStroids.getMemory();

    this.backgroundImage = imageAssets.background;
    this.heartImage = imageAssets.hearts;

    this.menuButton = new Button(
      "| |",
      createVector(width * 0.1, height * 0.06),
      40,
      40,
      "maroon"
    );

    //this.moveableObject = [new Player()];
    this.moveableObjects = [new Player(this)];

    this.astroSpawnTimer = 0;

    this.powerSpawnTimer = 0;
  }

  public update(): void {
    
    this.localScore++;

    if (this.menuButton.isClicked()) {
      console.log("Menu button => pause game)");

      this.memory.playerScore = this.localScore;

      this.dinoStroids.changeActiveScene(
        new InGameMenuPopup(this.dinoStroids, this)
      );
    }

    for (const gameObject of this.moveableObjects) {
      gameObject.update();
    }
  }
  public draw(): void {
    imageMode(CORNER);
    image(this.backgroundImage, 0, 0, width, height);

    for (const gameObject of this.moveableObjects) {
      gameObject.draw();
    }

    this.menuButton.draw();

    this.drawPlayerInfo();

    this.drawLives();

    this.PowerSpawnTimer();
    this.spawnAstro();
    this.checkCollisions();
  }

  private PowerSpawnTimer() {
    if (this.powerSpawnTimer <= 0) {
      const index = floor(random(0, 3));
      const powerUps = [new Heart(), new Sheild(), new SuperLaser()];
      this.moveableObjects.push(powerUps[index]);
      this.powerSpawnTimer = 10000;
    }

    this.powerSpawnTimer -= deltaTime;

    this.moveableObjects = this.moveableObjects.filter((gameObject) => {
      return !gameObject.isOffCanvas();
    });

    console.log(`Remaining moveable objects: ${this.moveableObjects.length}`);
  }

  

  private spawnAstro() {
    if (this.astroSpawnTimer <= 0) {
      // const index = floor(random(0, 3));
      // const asteroids = [new BigAsteroid(), new RegularAstoroid(), new SuperAsteroid()]
      //   this.moveableObject.push(asteroids[index]);
      this.moveableObjects.push(new RegularAsteroid());
      this.astroSpawnTimer = 400;
    }

    this.astroSpawnTimer -= deltaTime;
    
    if (this.astroSpawnTimer <= 0) {
      this.moveableObjects.push(new SuperAsteroid());
      this.astroSpawnTimer = 200;
    }

    this.astroSpawnTimer -= deltaTime;
  }

  public addGameObject(SomeMoveableObjects: MoveableObject) {
    this.moveableObjects.push(SomeMoveableObjects);
  }

  private drawPlayerInfo(): void {
    push();
    fill("white");
    textAlign(CENTER, TOP);
    textFont("Pixelify Sans", 24);
    textStyle(BOLD);

    const playerInfoX = width * 0.5;
    const playerInfoY = height * 0.03;

    text(
      `${this.memory.playerName} | Score: ${this.localScore}`,
      playerInfoX,
      playerInfoY
    );
    pop();
  }

  private drawLives(): void {
    push();
    imageMode(CORNER);

    const heartWidth = 35;
    const heartHeight = 30;
    const spacing = 5;

    let heartPositionX = width * 0.9;
    let heartPositionY = height * 0.02;

    for (let i = 0; i < this.lives; i++) {
      image(
        this.heartImage,
        heartPositionX - i * (heartWidth + spacing),
        heartPositionY,
        heartWidth,
        heartHeight
      );
    }

    pop();
  }

  private checkCollisions() {
    // Check collisions between player and asteroids
    const player = this.moveableObjects.find(
      (obj) => obj instanceof Player
    ) as Player;
    if (!player) return;

    for (const obj of this.moveableObjects) {
      if (obj instanceof RegularAsteroid) {
        
        if (player.collidesWith(obj)) {
          
          console.log("Player collided with asteroid!");
          this.removeGameObject(obj);
          this.lives -= 1;
          if (this.lives == 0) {
            this.memory.addScore(this.memory.playerName, this.memory.playerScore);
            this.dinoStroids.changeActiveScene(new GameOverPopup(this.dinoStroids));
          }
          soundeffects.playerHit.play();

        }
      }
    }

    for (const obj of this.moveableObjects) {
      if (obj instanceof SuperAsteroid) {
        
        if (player.collidesWith(obj)) {
          
          console.log("Player collided with asteroid!");
          this.removeGameObject(obj);
          this.lives -= 4;
          if (this.lives == 0) {
            this.memory.addScore(this.memory.playerName, this.memory.playerScore);
            this.dinoStroids.changeActiveScene(new GameOverPopup(this.dinoStroids));
          }
          soundeffects.playerHit.play();

        }
      }
    }
    for (const obj of this.moveableObjects) {
      if (obj instanceof Heart || obj instanceof Sheild) {
        // Player collides with heart
        if (player.collidesWith(obj)) {
          console.log("Player picked up a heart");
          this.removeGameObject(obj);
          if (this.lives < 5) {
            this.lives += 1;  // Increase the player's lives
          }
        }
      }
    }
    for (const obj of this.moveableObjects) {
      if (obj instanceof Laser) {
        for (const asteroid of this.moveableObjects) {
          if (asteroid instanceof RegularAsteroid || asteroid instanceof SuperAsteroid) {
            // Logga kollisionspositioner

            if (obj.collidesWith(asteroid)) {
              console.log("Laser hit an asteroid!");
              // Ta bort laser och asteroid från spelet

              this.removeGameObject(obj);
              this.removeGameObject(asteroid);
              soundeffects.explosion.play();

              // Hantera poäng eller annan spel-logik här
            }
          }
        }
      }
    }
  }

  private removeGameObject(moveableObjects: MoveableObject) {
    const index = this.moveableObjects.indexOf(moveableObjects);
    if (index !== -1) {
      this.moveableObjects.splice(index, 1);
    }
  }
}
