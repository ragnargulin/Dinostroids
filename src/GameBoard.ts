class GameBoard implements IScene {
    private dinoStroids: IChangeableScene;
    private playerName: string;
  
    constructor(dinoStroids: IChangeableScene, playerName: string) {
      this.dinoStroids = dinoStroids;
      this.playerName = playerName;
      console.log("Player name:", this.playerName);
      // ...
    }
  
    public update(): void {
      // ...
    }
  
    public draw(): void {
      background(0);
      // Show name somewhere
      fill(255);
      textAlign(CENTER, TOP);
      textSize(24);
      text("Welcome, " + this.playerName, width / 2, 50);
      // ...
    }
  }
  