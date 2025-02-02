class DinoStroids implements IChangeableScene {
    private activeScene: IScene;
    public memory: GameMemory;
    public isMusicPlaying: boolean = true;

    constructor() {
        this.activeScene = new MainMenu(this); // Start on the main menu
        this.memory = new GameMemory();

        this.updateMusicState(); // Ensure music starts/stops correctly at initialization
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

    // Method to toggle music on/off
    public setMusicPlaying(state: boolean): void {
        this.isMusicPlaying = state;
        this.updateMusicState();
    }

    // Toggle method for convenience
    public toggleMusic(): void {
    this.isMusicPlaying = !this.isMusicPlaying;

    if (this.isMusicPlaying) {
      music.backgroundMusic.loop();
    } else {
      music.backgroundMusic.pause();
    }
  }

    // Handles the actual music playback logic
    private updateMusicState(): void {
        if (this.isMusicPlaying) {
            if (!music.backgroundMusic.isPlaying()) {
                music.backgroundMusic.loop();
            }
        } else {
            if (music.backgroundMusic.isPlaying()) {
                music.backgroundMusic.pause();
            }
        }
    }
}
