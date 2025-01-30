// GameBoard.ts
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
  
    public moveableObjects: MoveableObject[];
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
  
      // Start with a single player in the game
      this.moveableObjects = [new Player(this)];
  
      this.explosions = [];
      this.astroSpawnTimer = 0;
      this.powerSpawnTimer = 0;
    }
  
    public update(): void {
      // If paused, skip updating
      if (this.paused) return;
  
      // Spawn logic called here (not in draw)
      this.spawnAstro();
      this.PowerSpawnTimer();
  
      // Increase score every 60 frames
      this.secondTicker++;
      if (this.secondTicker >= 60) {
        this.localScore++;
        this.secondTicker = 0;
      }
  
      // Check if menu button is clicked
      if (this.menuButton.isClicked()) {
        console.log("Menu button => pause game)");
        this.memory.playerScore = this.localScore;
        this.paused = true;
        this.dinoStroids.changeActiveScene(
          new InGameMenuPopup(this.dinoStroids, this)
        );
        return;
      }
  
      // Update all moveable objects (e.g. player, asteroids, powerups)
      for (const gameObject of this.moveableObjects) {
        gameObject.update();
      }
  
      // Manage explosions
      this.explosions = this.explosions.filter((explosion) => {
        explosion.frameCount++;
        return explosion.frameCount < 30;
      });
  
      // Collision detection
      const player = this.moveableObjects.find(
        (obj) => obj instanceof Player
      ) as Player;
      if (player) {
        this.collisionSystem.checkCollisions(player, this.moveableObjects, {
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
          increaseScore: (amount) => (this.localScore += amount),
          addExplosion: (position) =>
            this.explosions.push({
              position: position.copy(),
              frameCount: 0,
            }),
          handleGameOver: () => this.handleGameOver(),
        });
      }
    }

    // public decreaseLives(amount: number) {
    //   this.lives -= amount;
    //   if (this.lives <= 0) {
    //     this.handleGameOver();
    //   }
    //   // Keep lives at max 5
    //   if (this.lives > 5) this.lives = 5;
    // }
  
    private handleGameOver(): void {
      this.memory.playerScore = this.localScore;
      this.memory.addScore(this.memory.playerName, this.memory.playerScore);
      this.dinoStroids.changeActiveScene(new GameOverPopup(this.dinoStroids));
    }
  
    public draw(): void {
      // Background
      imageMode(CORNER);
      image(this.backgroundImage, 0, 0, width, height);
  
      // Draw moveable objects
      for (const gameObject of this.moveableObjects) {
        gameObject.draw();
      }
  
      // Draw explosions
      for (const explosion of this.explosions) {
        image(
          this.explosionImage,
          explosion.position.x - 15,
          explosion.position.y + 30,
          100,
          100
        );
      }
  
      // Draw UI
      this.menuButton.draw();
      this.drawPlayerInfo();
      this.drawLives();
    }
  
    public resumeGame(): void {
      this.paused = false;
    }
  
    /**
     * Spawn power-ups every X ms (default 10s).
     */
    private PowerSpawnTimer() {
      if (this.powerSpawnTimer <= 0) {
        // Randomly pick one of the three
        const index = floor(random(0, 3));
        const powerUps = [new Heart(), new Sheild(), new SuperLaser()];
        this.moveableObjects.push(powerUps[index]);
        console.log("Spawned power-up:", powerUps[index].constructor.name);
  
        // 10s in ms. If testing, reduce to e.g. 2000 or 1000 to see them spawn more often.
        this.powerSpawnTimer = 1000;
      }
  
      // deltaTime is ms elapsed since previous frame
      this.powerSpawnTimer -= deltaTime;
  
      // Clean up any off-canvas objects
      this.moveableObjects = this.moveableObjects.filter((obj) => {
        return !obj.isOffCanvas();
      });
    }
  
    /**
     * Spawn asteroids with a time-based approach.
     */
    private spawnAstro() {
      if (this.astroSpawnTimer <= 0) {
        const index = floor(random(0, 3));
        if (index === 0) {
          this.moveableObjects.push(new RegularAsteroid(this.localScore));
        } else if (index === 1) {
          this.moveableObjects.push(new BigAsteroid(this.localScore));
        } else {
          this.moveableObjects.push(new SuperAstro(this.localScore));
        }
  
        const baseSpawnTime = random(1000, 2000);
        // Speed up spawns a bit as score increases
        const spawnTimeReduction = Math.floor(this.localScore / 200) * 300;
        this.astroSpawnTimer = Math.max(baseSpawnTime - spawnTimeReduction, 1000);
      }
      this.astroSpawnTimer -= deltaTime;
    }
  
    public addGameObject(someObject: MoveableObject) {
      this.moveableObjects.push(someObject);
    }
  
    public removeGameObject(obj: MoveableObject) {
      const index = this.moveableObjects.indexOf(obj);
      if (index !== -1) {
        this.moveableObjects.splice(index, 1);
      }
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
  }
  