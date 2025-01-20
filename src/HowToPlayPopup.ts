class HowToPlayPopup implements IScene {
    private backgroundImage: p5.Image;
    private closeButton: Button;
    private dinoStroids: IChangeableScene;

    // Popup coordinates
    private popupX: number;
    private popupY: number;
    private popupW: number;
    private popupH: number;

    constructor(dinoStroids: IChangeableScene) {
        this.backgroundImage = loadImage("../assets/images/background.png");
        this.dinoStroids = dinoStroids;

        // Coordinates for the popuop box
        this.popupX = width * 0.25;
        this.popupY = height * 0.20;
        this.popupW = width * 0.5;
        this.popupH = height * 0.4;

        const xButtonSize = 40;
        const xButtonCenterX = (this.popupX + this.popupW) - (xButtonSize / 2);
        const xButtonCenterY = this.popupY + (xButtonSize / 2);

        this.closeButton = new Button("X", createVector(xButtonCenterX, xButtonCenterY), 40, 40);
    }

    public update(): void {
        if (this.closeButton.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        // Dim background 
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);

        // Draw the popup box
        fill("lightgrey");
        rect(this.popupX, this.popupY, this.popupW, this.popupH);

        // Draw the text INSIDEteh popup box
        this.drawTextInsideBox();

        this.closeButton.draw();
    }

    private drawTextInsideBox(): void {
        push();
        fill("black");
        textSize(24);
        textAlign(CENTER, CENTER);

        const centerX = this.popupX + this.popupW / 2;
        const centerY = this.popupY + this.popupH / 2;
        text("HOW TO PLAY", centerX, centerY);
        pop();
    }
}
