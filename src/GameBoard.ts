class GameBoard implements IScene {

    private dinoStroids: IChangeableScene;
    private memory: GameMemory;

    private localScore: number = 0;
    private lives: number = 5;

    private backgroundImage: p5.Image;
    private heartImage: p5.Image;

    private menuButton: Button;

    private powerSpawnTimer: number;
  
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

        this.powerSpawnTimer = 0
    }

    public update(): void {

        this.localScore++;


        if (this.menuButton.isClicked()) {
            console.log("Menu button => pause game)");

            this.memory.playerScore = this.localScore;

            this.dinoStroids.changeActiveScene(new InGameMenuPopup(this.dinoStroids, this));
        }

        for (const gameObject of this.moveableObjects) {
            gameObject.update();
        }

        this.PowerSpawnTimer();
         this.spawnAstro();

    }

    private PowerSpawnTimer() {
        if (this.powerSpawnTimer <= 0) {
          const index = floor(random(1, 3));
          const powerUps = [new Heart(), new Sheild(), new SuperLaser()]
            this.moveableObject.push(powerUps[index]);
          this.moveableObject.push(new Heart());
          this.powerSpawnTimer = 400;
        }
    
        this.powerSpawnTimer -= deltaTime;

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
          this.moveableObjects.push(new RegularAsteroid());
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
