class GameBoard implements IScene {
  private dinoStroids: IChangeableScene;
  private memory: GameMemory;

  private localScore: number = 0;
  private secondTicker: number = 0;
  private lives: number = 5;

  private backgroundImage: p5.Image;
  private heartImage: p5.Image;
  private explosionImage: p5.Image;
  private explosions: { position: p5.Vector; frameCount: number }[] = [];

  private menuButton: Button;

  private powerSpawnTimer: number;
  private astroSpawnTimer: number;

  private moveableObjects: MoveableObject[];
  private collisionSystem: CollisionSystem;

  private paused: boolean = false;

  constructor(dinoStroids: IChangeableScene) {
    this.dinoStroids = dinoStroids;
    this.memory = this.dinoStroids.getMemory();
    this.localScore = this.memory.playerScore;
    this.collisionSystem = new CollisionSystem();

    this.backgroundImage = imageAssets.background;
    this.heartImage = imageAssets.hearts;
    this.explosionImage = imageAssets.explosion;

    this.menuButton = new Button(
      "| |",
      createVector(width * 0.1, height * 0.06),
      40,
      40,
      "maroon"
    );

    this.moveableObjects = [new Player(this)];
    this.explosions = [];
    this.astroSpawnTimer = 0;
    this.powerSpawnTimer = 0;
  }

  public update(): void {
    if (this.paused) return;

    this.spawnAstro();

    this.secondTicker++;

    if (this.secondTicker >= 60) {
      this.localScore++;
      this.secondTicker = 0;
    }

    if (this.menuButton.isClicked()) {
      console.log("Menu button => pause game)");
      this.memory.playerScore = this.localScore;
      this.paused = true;
      this.dinoStroids.changeActiveScene(
        new InGameMenuPopup(this.dinoStroids, this)
      );
    }

    for (const gameObject of this.moveableObjects) {
      gameObject.update();
    }

    this.explosions = this.explosions.filter((explosion) => {
      explosion.frameCount++;
      return explosion.frameCount < 30;
    });

    const player = this.moveableObjects.find(
      (obj) => obj instanceof Player
    ) as Player;
    
    if (player) {
      this.collisionSystem.checkCollisions(
        player,
        this.moveableObjects,
        {
          removeObject: (obj) => this.removeGameObject(obj),
          addObject: (obj) => this.addGameObject(obj),
          decreaseLives: (amount) => {
            this.lives -= amount;
            if (this.lives <= 0) {
              this.handleGameOver();
            }
            // Keep lives at max 5
            if (this.lives > 5) this.lives = 5;
          },
          increaseScore: (amount) => this.localScore += amount,
          addExplosion: (position) => this.explosions.push({
            position: position.copy(),
            frameCount: 0
          }),
          handleGameOver: () => this.handleGameOver()
        }
      );
    }
  }

  private handleGameOver(): void {
    this.memory.playerScore = this.localScore;
    this.memory.addScore(this.memory.playerName, this.memory.playerScore);
    this.dinoStroids.changeActiveScene(new GameOverPopup(this.dinoStroids));
  }

  public draw(): void {
    imageMode(CORNER);
    image(this.backgroundImage, 0, 0, width, height);

    for (const gameObject of this.moveableObjects) {
      gameObject.draw();
    }

    for (const explosion of this.explosions) {
      image(
        this.explosionImage,
        explosion.position.x - 15,
        explosion.position.y + 30,
        100,
        100
      );
    }

    this.menuButton.draw();
    this.drawPlayerInfo();
    this.drawLives();
    this.PowerSpawnTimer();
    this.spawnAstro();
  }

  public resumeGame(): void {
    this.paused = false;
  }

  private PowerSpawnTimer() {
    if (this.paused) return;

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
  }

  private spawnAstro() {
    if (this.paused) return;

    if (this.astroSpawnTimer <= 0) {
      const index = floor(random(0, 3));
      if (index === 0) {
        this.moveableObjects.push(new RegularAsteroid(this.localScore));
      } else if (index === 1) {
        this.moveableObjects.push(new BigAsteroid(this.localScore));
      } else {
        this.moveableObjects.push(new SuperAstro(this.localScore));
      }
      
      const baseSpawnTime = random(2000, 5000);
      const spawnTimeReduction = Math.floor(this.localScore / 200) * 300;
      this.astroSpawnTimer = Math.max(baseSpawnTime - spawnTimeReduction, 1000);
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

  private removeGameObject(moveableObjects: MoveableObject) {
    const index = this.moveableObjects.indexOf(moveableObjects);
    if (index !== -1) {
      this.moveableObjects.splice(index, 1);
    }
  }
}