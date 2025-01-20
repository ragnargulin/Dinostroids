class GameBoard implements IScene {
    private dinoStroids: IChangeableScene;

    constructor(dinoStroids: IChangeableScene) {
        this.dinoStroids = dinoStroids;
    }

    public update(): void {
        // Game logic
    }

    public draw(): void {
        // Draw your game here
        background(0);
        fill(255);
        text("Game Running", width / 2, height / 2);
    }
}
