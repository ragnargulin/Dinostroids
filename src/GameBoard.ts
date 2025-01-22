class GameBoard implements IScene {
    private score: number = 999;
    private lives: number = 5;
    private backgroundImage: p5.Image;
    private heartImage: p5.Image;
  
    private menuButton: Button;
    private dinoStroids: IChangeableScene;
  
    private moveableObjects: MoveableObject[];
  
    constructor(dinoStroids: IChangeableScene) {
      this.dinoStroids = dinoStroids;
  
      this.backgroundImage = imageAssets.background;
      this.heartImage = imageAssets.hearts;
  
      this.menuButton = new Button(
        "MENU",
        createVector(width * 0.1, height * 0.06),
        100,
        40,
        "maroon"
      );
  
      this.moveableObjects = [new Player(this)];
    }
  
    public update(): void {
      if (this.menuButton.isClicked()) {
        console.log("Menu button clicked. (Add code to open a menu/popup here.)");
        this.dinoStroids.changeActiveScene(new InGameMenuPopup(this.dinoStroids));
      }
      for (const gameObject of this.moveableObjects) {
        gameObject.update();
      }
  
      this.moveableObjects = this.moveableObjects.filter((gameObject) => {
        if (gameObject.isOffCanvas()) {
          return false; // Remove the object from the array
        }
        return true; // Keep the object in the array
      });
  
      console.log(`Remaining moveable objects: ${this.moveableObjects.length}`);
    }
  
    public addGameObject(SomeMoveableObjects: MoveableObject) {
      this.moveableObjects.push(SomeMoveableObjects);
    }
  
    public draw(): void {
      imageMode(CORNER);
      image(this.backgroundImage, 0, 0, width, height);
  
      this.menuButton.draw();
  
      this.drawPlayerInfo();
  
      this.drawLives();
  
      //KEVIN
      for (const gameObject of this.moveableObjects) {
        gameObject.draw();
      }
    }
  
    private drawPlayerInfo(): void {
      push();
      fill("white");
      textAlign(CENTER, TOP);
      textFont("Pixelify Sans", 24);
      textStyle(BOLD);
  
      const playerInfoX = width * 0.5;
      const playerInfoY = height * 0.03;
  
      text(`Score: ${this.score}`, playerInfoX, playerInfoY);
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
  