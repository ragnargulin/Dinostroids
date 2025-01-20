class HowToPlayPopup implements IScene {
  // Background & references
  private backgroundImage: p5.Image;
  private dinoStroids: IChangeableScene;

  private moveImage: p5.Image;
  private shootImage: p5.Image;

  // Multi-page instructions
  private textParts: string[];
  private currentPage: number = 0;

  // Buttons
  private closeButton: Button;
  private nextPageBtn: Button;
  private prevPageBtn: Button;

  // Popup box
  private popupX: number;
  private popupY: number;
  private popupW: number;
  private popupH: number;

  constructor(dinoStroids: IChangeableScene) {
    this.dinoStroids = dinoStroids;

    this.backgroundImage = loadImage("../assets/images/background.png");
    this.moveImage = loadImage("../assets/images/Frame-17.png");
    this.shootImage = loadImage("../assets/images/Frame-19.png");

    // popup box 
    this.popupX = width * 0.05;
    this.popupY = height * 0.20; 
    this.popupW = width * 0.90; 
    this.popupH = height * 0.60;

    // Create an array of multiple pages of text
    this.textParts = [
      "Controls:\nArrow keys to move left/right. Space to shoot.\n\nPowerups:\nShield, Superlaser, Lives, etc.",
      "Characters:\nDinosaur (player), picks up power-ups.\nAsteroids (enemy), fall randomly.\nAvoid or destroy them!",
      "Regular Asteroid: Destroyed by 1 laser.\nBig Asteroid: Splits into 2 small ones.\nSuper Asteroid: Needs 5 shots or 1 superlaser.\nGives extra points."
    ];

   
    // Close (X) button
    const xButtonSize = 40;
    const closeButtonX = (this.popupX + this.popupW) - (xButtonSize / 2);
    const closeButtonY = this.popupY + (xButtonSize / 2);
    this.closeButton = new Button("X", createVector(closeButtonX, closeButtonY), xButtonSize, xButtonSize);

    // Next button
    this.nextPageBtn = new Button("Next", createVector(width * 0.8, height * 0.7));
    // Prev button
    this.prevPageBtn = new Button("Prev", createVector(width * 0.2, height * 0.7));
  }

  public update(): void {
    // Close button
    if (this.closeButton.isClicked()) {
      soundeffects.buttonClick.play();
      this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
    }

    // Next page
    if (this.nextPageBtn.isClicked()) {
      soundeffects.buttonClick.play();
      this.currentPage++;
      if (this.currentPage > 3) {
        this.currentPage = 3;
      }
    }

    // Previous page
    if (this.prevPageBtn.isClicked()) {
      soundeffects.buttonClick.play();
      this.currentPage--;
      if (this.currentPage < 0) {
        this.currentPage = 0;
      }
    }
  }

  public draw(): void {
    imageMode(CORNER);
    image(this.backgroundImage, 0, 0, width, height);

    // Dim the background with a transparent overlay
    push();
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
    pop();

    // popup box
    push();
    fill("lightgrey");
    rect(this.popupX, this.popupY, this.popupW, this.popupH);
    pop();

    // Draw the current page (either text or images)
    this.drawCurrentPage();

    // Draw buttons
    this.closeButton.draw();
    this.nextPageBtn.draw();
    this.prevPageBtn.draw();
  }

  private drawCurrentPage(): void {
    push();
    fill("black");
    textSize(width * 0.02); // scale text
    textAlign(CENTER, TOP);

    // Where we place text inside the popup
    const textX = this.popupX + (this.popupW * 0.05); 
    const textY = this.popupY + (this.popupH * 0.05);
    const boxW = this.popupW * 0.90;
    const boxH = this.popupH * 0.90;

    if (this.currentPage < 3) {
      textWrap(WORD);
      text(this.textParts[this.currentPage], textX, textY, boxW, boxH);
    } else {
      this.drawImages();
    }
    pop();
  }

  private drawImages(): void {
    imageMode(CENTER);

    let centerY = this.popupY + (this.popupH / 2);

    image(
      this.moveImage, 
      width * 0.35, 
      centerY, 
      width * 0.3, 
      height * 0.25
    );

    image(
      this.shootImage, 
      width * 0.65, 
      centerY, 
      width * 0.3, 
      height * 0.25
    );
  }
}
