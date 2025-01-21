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

        this.backgroundImage = imageAssets.background;
        this.moveImage = imageAssets.moveImage;
        this.shootImage = imageAssets.shootImage;

        // popup box 
        this.popupX = width * 0.05;
        this.popupY = height * 0.20;
        this.popupW = width * 0.90;
        this.popupH = height * 0.60;

        // Create an array of multiple pages of text
        this.textParts = [
            "Controls:\nArrow keys to move right and left. Space to shoot laser.\n\nPowerups:\nShield: A power-up that falls from the sky. The shield protects the player from an asteroid. If the shield is hit by an asteroid, it disappears, but the player remains unharmed. Only one shield can be carried at a time.\n\nSuperlaser: A power-up that falls from the sky.\n\nLives: Hearts in the form of lives fall from the sky. The full health is five hearts. When lives run out, the player dies.",
            "Characters:\nDinosaur (player's character): If the dinosaur is hit by an object, it can take damage (if the object is an asteroid). The dinosaur can pick up power-ups (to increase its vitality).\n\nAsteroids (enemy): Fall from the sky. Their position on the x-axis is randomly generated. Depending on the asteroid type that hits the player, it causes varying amounts of damage.",
            "Regular Asteroid: Disappears when hit by a laser shot. \n\n Big Asteroid: Breaks into two regular asteroids when hit by a laser shot or destroyed by a superlaser shot.\nSuper Asteroid: Requires five laser shots to be destroyed or one superlaser shot. Grants extra points."
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

        if (this.nextPageBtn.isClicked()) {
            soundeffects.buttonClick.play();

            this.currentPage = (this.currentPage + 1) % 4;
        }
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
        textFont("Pixelify Sans");
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

        image(this.moveImage, width * 0.3, height * 0.45, width * 0.3, height * 0.25);

        image(this.shootImage, width * 0.7, height * 0.45, width * 0.3, height * 0.25);
    }
}