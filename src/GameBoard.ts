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

        this.menuButton = new Button("| |", createVector(width * 0.1, height * 0.06), 40, 40, "maroon");

        this.moveableObjects = [new Player(this)];

        this.astroSpawnTimer = 300;
        this.powerSpawnTimer = 400;
    }

    public update(): void {

        this.localScore++;

        if (this.menuButton.isClicked()) {
            console.log("Menu button => pause game)");
            this.memory.playerScore = this.localScore;
            this.dinoStroids.changeActiveScene(new InGameMenuPopup(this.dinoStroids, this));
            return;
        }

        const maxDeltaTime = 100;
        const effectiveDeltaTime = Math.min(deltaTime, maxDeltaTime);

        // Decrement spawn timers
        this.powerSpawnTimer -= effectiveDeltaTime;
        this.astroSpawnTimer -= effectiveDeltaTime;

        // Handle Power-Up Spawning
        if (this.powerSpawnTimer <= 0) {
            this.spawnPowerUp();
            this.powerSpawnTimer += 400;
        }

        // Handle Asteroid Spawning
        if (this.astroSpawnTimer <= 0) {
            this.spawnAsteroid();
            this.astroSpawnTimer += 300;
        }

        // Update all moveable objects
        for (const gameObject of this.moveableObjects) {
            gameObject.update();
        }

        this.moveableObjects = this.moveableObjects.filter((obj) => !obj.isOffCanvas());

        console.log(`Remaining moveable objects: ${this.moveableObjects.length}`);
    }


    private spawnPowerUp(): void {
        const index = floor(random(0, 3));
        const powerUps = [new Heart(), new Sheild(), new SuperLaser()];
        this.moveableObjects.push(powerUps[index]);
        console.log("Spawned a Power-Up:", powerUps[index]);
    }


    private spawnAsteroid(): void {
        this.moveableObjects.push(new RegularAsteroid());
        console.log("Spawned an Asteroid");
    }

    public addGameObject(obj: MoveableObject): void {
        this.moveableObjects.push(obj);
    }

    public draw(): void {

        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        // Draw all moveable objects first
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
