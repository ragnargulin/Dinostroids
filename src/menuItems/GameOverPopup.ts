class GameOverPopup implements IScene {
    private backgroundImage: p5.Image;
    private dinoStroids: IChangeableScene;
    private memory: GameMemory;
  
    // Popup box coordinates
    private popupX: number;
    private popupY: number;
    private popupW: number;
    private popupH: number;
  
    private tryAgainBtn: Button;
    private homeBtn: Button;
  
    constructor(dinoStroids: IChangeableScene) {
      this.dinoStroids = dinoStroids;
      this.memory = this.dinoStroids.getMemory();
      // Same background as the main menu
      this.backgroundImage = imageAssets.background;
  
      // Popup box dimensions
      this.popupX = width * 0.25;
      this.popupY = height * 0.20;
      this.popupW = width * 0.50;
      this.popupH = height * 0.60;
  
      // Initialize buttons
      this.tryAgainBtn = new Button("TRY AGAIN", createVector(this.popupX + this.popupW * 0.25, this.popupY + this.popupH * 0.95), 200, 40, "green");
      this.homeBtn = new Button("HOME", createVector(this.popupX + this.popupW * 0.75, this.popupY + this.popupH * 0.95));
    }
  
    public update(): void {
      // Add button click logic
      if (this.tryAgainBtn.isClicked()) {
        soundeffects.buttonClick.play();

        // this.memory.addScore(this.memory.playerName, this.memory.playerScore);
        // Restart the game 
        this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids));
      }
  
      if (this.homeBtn.isClicked()) {
        soundeffects.buttonClick.play();

        // this.memory.addScore(this.memory.playerName, this.memory.playerScore);
        // Go back to the main menu
        this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
      }
    }
  
    public draw(): void {
      // 1) Draw the background image
      imageMode(CORNER);
      image(this.backgroundImage, 0, 0, width, height);
  
      // 2) Dim the background with a transparent overlay
      push();
      fill(0, 0, 0, 100);
      rect(0, 0, width, height);
      pop();
  
      // 3) Draw the popup box
      push();
      fill("lightgrey");
      rect(width * 0.25, height * 0.15, width * 0.5, height * 0.7);
      pop();
  
      // 4) Draw the scoreboard content
      this.drawScoreBoardContent();
    }
  
    private getTopScores(): { name: string; score: number }[] {
      return this.memory.topScores.sort((a, b) => b.score - a.score).slice(0, 5);
    }
  
    private drawScoreBoardContent(): void {
      // Title: "GAME OVER"
      push();
      fill("red");
      textStyle(BOLD);
      textFont("Pixelify Sans", width * 0.07);
      textAlign(CENTER, CENTER);
  
      const titleX = this.popupX + this.popupW / 2;
      const titleY = this.popupY + this.popupH * 0.1;
      text("GAME OVER", titleX, titleY);
      pop();
  
      // Display the "Your score" at the top of the box
      push();
      fill("black");
      textFont("Pixelify Sans", width * 0.04);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
  
      text(`Your score: ${this.memory.playerScore}`, this.popupX + this.popupW / 2, this.popupY + this.popupH * 0.3);
  
      // Draw the top scores
      const topScoresList = this.getTopScores();
      if (topScoresList.length === 0) {
        push();
        fill("black");
        textFont("Pixelify Sans", width * 0.04);
        textAlign(CENTER, CENTER);
        text(
          "No scores available",
          this.popupX + this.popupW / 2,
          this.popupY + this.popupH * 0.4
        );
        pop();
      } else {
        topScoresList.forEach((entry, index) => {
          push();
          fill("black");
          textFont("Pixelify Sans", width * 0.035);
          textAlign(LEFT, TOP);
  
          const scoreX = this.popupX + this.popupW * 0.3;
          const scoreY = this.popupY + this.popupH * 0.45 + (index * 30);
          text(`${index + 1}. ${entry.name}: ${entry.score}`, scoreX, scoreY);
          pop();
        });
      }
  
      // Draw buttons
      this.tryAgainBtn.draw();
      this.homeBtn.draw();
  
      pop();
    }
  }
  