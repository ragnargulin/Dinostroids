class DinoStroids implements IChangeableScene {
    private activeScene: IScene;
    public memory: GameMemory;

    constructor() {
        this.activeScene = new MainMenu(this); //ändra scene här för att starta på den scenen. Bra om man ska jobba i specifik scen MainMenu är default
        
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
}
