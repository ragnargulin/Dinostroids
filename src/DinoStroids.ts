class DinoStroids {
    private activeScene: IScene;

    public update() {
        this.activeScene.update();
    }

    public draw() {
        this.activeScene.draw();
    }

    public changeActiveScene(scene: IScene) {
        this.activeScene = scene;
    }

    constructor(initialScene: IScene) {
        this.activeScene = initialScene;
        this.draw();
        this.update();
    }
}
