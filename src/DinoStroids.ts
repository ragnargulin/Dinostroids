class DinoStroids implements IChangeableScene {
    private activeScene: IScene;
    public memory: GameMemory;

    constructor() {

        this.activeScene = new MainMenu(this); //ändra scene här för att starta på den scenen. Bra om man ska jobba i specifik scen MainMenu är default
        // spela menymusiken
        
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
        
        // Byter till GameBoard
        if (scene instanceof GameBoard) {
            // pausa menymusiken
            // spela in-game-musiken
        }

        // Byter bort GameBoard
        if (this.activeScene instanceof GameBoard) {
            // pause in-game-musiken
            // spela menymusiken
        }
    }

    public getMemory(): GameMemory {
        return this.memory;
    }
    
    public getActiveScene(): IScene {
        return this.activeScene;
    }
}
