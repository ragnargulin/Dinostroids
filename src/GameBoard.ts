class GameBoard implements IScene {
    private dinoStroids: IChangeableScene;
    private memory: GameMemory;

    private localScore: number = 0;
    private secondTicker: number = 0;
    private lives: number = 5;

    private backgroundImage: p5.Image;
    private heartImage: p5.Image;

    private menuButton: Button;

    private moveableObjects: MoveableObject[];

    private astroSpawnTimer: number;

constructor(dinoStroids: IChangeableScene) {

        this.dinoStroids = dinoStroids;
        this.memory = this.dinoStroids.getMemory();

        this.backgroundImage = imageAssets.background;
        this.heartImage = imageAssets.hearts;

        this.menuButton = new Button("| |", createVector(width * 0.1, height * 0.06), 40, 40, "maroon");

        //this.moveableObject = [new Player()];
        this.moveableObjects = [new Player(this)];
  
         this.astroSpawnTimer = 0;
  }



  public update(): void {
    if (this.menuButton.isClicked()) {
      console.log("Menu button clicked. (Add code to open a menu/popup here.)");
      this.dinoStroids.changeActiveScene(new InGameMenuPopup(this.dinoStroids));
    }
    for (const gameObject of this.moveableObject) {
      gameObject.update();
    }

    this.spawnAstro();
  }

    }

    public update(): void {

        this.secondTicker++; //variable needed to calc one second (because update is called 60 times per second)
        
        if (this.secondTicker >= 60) {
            this.localScore++; //for each second, add one to the localScore
            this.secondTicker = 0; // Reset the ticker
        }
      

        if (this.menuButton.isClicked()) {
            console.log("Menu button => pause game)");

            this.memory.playerScore = this.localScore;

            this.dinoStroids.changeActiveScene(new InGameMenuPopup(this.dinoStroids, this));
        }

        for (const gameObject of this.moveableObjects) {
            gameObject.update();
        }

        // this.moveableObjects = this.moveableObjects.filter((gameObject) => {
        //     if (gameObject.isOffCanvas()) {
        //         return false; // Remove the object from the array
        //     }
        //     return true; // Keep the object in the array
        // });
        this.moveableObjects = this.moveableObjects.filter((gameObject) => {
            return !gameObject.isOffCanvas();
        });

        console.log(`Remaining moveable objects: ${this.moveableObjects.length}`);
    }

    public addGameObject(SomeMoveableObjects: MoveableObject) {
        this.moveableObjects.push(SomeMoveableObjects);
    }

  private spawnAstro() {
    if (this.astroSpawnTimer <= 0) {
      // const index = floor(random(0, 3));
      // const asteroids = [new BigAsteroid(), new RegularAstoroid(), new SuperAsteroid()]
      //   this.moveableObject.push(asteroids[index]);
      this.moveableObject.push(new RegularAsteroid());
      this.astroSpawnTimer = 400;
    }

    this.astroSpawnTimer -= deltaTime;
  }

 
    public draw(): void {

        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

      //KEVIN
        for (const gameObject of this.moveableObjects) {
            gameObject.draw();
        }

    this.menuButton.draw();

    this.drawPlayerInfo();

    this.drawLives();

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
        text(`${this.memory.playerName} | Score: ${this.localScore}`, playerInfoX, playerInfoY);
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
