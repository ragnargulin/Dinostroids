class DinoStroids implements IChangeableScene {
    private activeScene: IScene;
    public memory: GameMemory;
    public isMusicPlaying: boolean = false;

    constructor() {
        this.activeScene = new MainMenu(this); // Start on the main menu
        this.memory = new GameMemory();
    }

    public update() {
        this.activeScene.update();
    }

    public draw() {
        this.activeScene.draw();
    }

    public changeActiveScene(scene: IScene): void {
        this.activeScene = scene;
    }

    public getMemory(): GameMemory {
        return this.memory;
    }

    public getActiveScene(): IScene {
        return this.activeScene;
    }

    // Set music state and handle playback
    public setMusicPlaying(state: boolean): void {
        this.isMusicPlaying = state;
        state ? music.backgroundMusic.loop() : music.backgroundMusic.stop();
    }

    // Toggle music state
    public toggleMusic(): void {
        this.setMusicPlaying(!this.isMusicPlaying);
    }
}
