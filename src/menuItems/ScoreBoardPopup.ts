class ScoreBoardPopup implements IScene {
  private backgroundImage: p5.Image;
  private dinoStroids: IChangeableScene;

  // Popup box coordinates
  private popupX: number;
  private popupY: number;
  private popupW: number;
  private popupH: number;

  // Close button ("X")
  private closeButton: Button;

  constructor(dinoStroids: IChangeableScene) {
    this.dinoStroids = dinoStroids;
    // Same background as the main menu
    this.backgroundImage = imageAssets.background;

    // Popup box dimensions (similar to HowToPlayPopup)
    this.popupX = width * 0.25;
    this.popupY = height * 0.20;
    this.popupW = width * 0.50;
    this.popupH = height * 0.60;

    // Create the close ("X") button at the top-right corner of the popup
    const xButtonSize = 40;
    const closeButtonX = (this.popupX + this.popupW) - (xButtonSize / 2);
    const closeButtonY = this.popupY + (xButtonSize / 2);
    this.closeButton = new Button("X", createVector(closeButtonX, closeButtonY), xButtonSize, xButtonSize);
  }

  public update(): void {
    // If user clicks the "X" button, go back to MainMenu
    if (this.closeButton.isClicked()) {
      soundeffects.buttonClick.play();
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
    rect(this.popupX, this.popupY, this.popupW, this.popupH);
    pop();

    // 4) Draw the scoreboard text/content
    this.drawScoreBoardContent();

    // 5) Draw the close button
    this.closeButton.draw();
  }

  /**
   * Helper: get top 10 scores sorted descending
   * (Assumes you have a global topScores array)
   */
  private getTopScores(): { name: string; score: number }[] {
    return topScores.sort((a, b) => b.score - a.score).slice(0, 10);
  }

  /**
   * Draw the scoreboard content (title, top scores, latest score).
   */
  private drawScoreBoardContent(): void {
    // 1) Title: "SCOREBOARD"
    push();
    fill("black");
    textStyle(BOLD);
    textFont("Pixelify Sans", width * 0.07);
    textAlign(CENTER, CENTER);

    const titleX = this.popupX + (this.popupW / 2);
    const titleY = this.popupY + (this.popupH * 0.15);
    text("SCOREBOARD", titleX, titleY);
    pop();

    // 2) Draw the top scores
    const topScoresList = this.getTopScores();
    if (topScoresList.length === 0) {
      // Show "No scores available"
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
      // Render each score
      topScoresList.forEach((entry, index) => {
        push();
        fill("black");
        textFont("Pixelify Sans", width * 0.035);
        textAlign(LEFT, TOP);

        const scoreX = this.popupX + this.popupW * 0.2;
        const scoreY = this.popupY + this.popupH * 0.3 + (index * 30);
        text(`${index + 1}. ${entry.name}: ${entry.score}`, scoreX, scoreY);
        pop();
      });
    }

    // 3) Display the "Latest score" near the bottom of the box
    push();
    fill("black");
    textFont("Pixelify Sans", width * 0.04);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);

    text(
      `Latest score: ${latestScore}`,
      this.popupX + this.popupW / 2,
      this.popupY + this.popupH * 0.8
    );
    pop();
  }
}
