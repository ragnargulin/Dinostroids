class GameBoard implements IScene {
    private dinoStroids: IChangeableScene;
    private playerName: string;

    private score: number = 999;

    private lives: number = 5;

    private backgroundImage: p5.Image;
    private heartImage: p5.Image;

    private menuButton: Button;

    constructor(dinoStroids: IChangeableScene, playerName: string) {
        this.dinoStroids = dinoStroids;
        this.playerName = playerName;

        this.backgroundImage = imageAssets.background;
        this.heartImage = imageAssets.hearts;

        this.menuButton = new Button("MENU", createVector(width * 0.1, height * 0.06), 100, 40, "maroon");
    }

    public update(): void {
        if (this.menuButton.isClicked()) {
            console.log("Menu button clicked. (Add code to open a menu/popup here.)");
            this.dinoStroids.changeActiveScene(new InGameMenuPopup(this.dinoStroids));
        }

    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

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

        text(`${this.playerName} | Score: ${this.score}`, playerInfoX, playerInfoY);
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
            image(this.heartImage, heartPositionX - i * (heartWidth + spacing), heartPositionY, heartWidth, heartHeight);
        }

        pop();
    }
}
