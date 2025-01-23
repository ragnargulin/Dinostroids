class HowToPlayPopup implements IScene {
    // Background & references
    private backgroundImage: p5.Image;
    private dinoStroids: IChangeableScene;

    private moveImage: p5.Image;
    private shootImage: p5.Image;

    // Multi-page instructions
    //private textParts: string[];
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
        //this.textParts = [
        //"Controls:\nArrow keys to move right and left. Space to shoot laser.\n\nPowerups:\nShield: A power-up that falls from the sky. The shield protects the player from an asteroid. If the shield is hit by an asteroid, it disappears, but the player remains unharmed. Only one shield can be carried at a time.\n\nSuperlaser: A power-up that falls from the sky.\n\nLives: Hearts in the form of lives fall from the sky. The full health is five hearts. When lives run out, the player dies.",
        //"Characters:\nDinosaur (player's character): If the dinosaur is hit by an object, it can take damage (if the object is an asteroid). The dinosaur can pick up power-ups (to increase its vitality).\n\nAsteroids (enemy): Fall from the sky. Their position on the x-axis is randomly generated. Depending on the asteroid type that hits the player, it causes varying amounts of damage.",
        //"Regular Asteroid: Disappears when hit by a laser shot. \n\n Big Asteroid: Breaks into two regular asteroids when hit by a laser shot or destroyed by a superlaser shot.\nSuper Asteroid: Requires five laser shots to be destroyed or one superlaser shot. Grants extra points."
        //];


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

        //Placering och mått för textblocken, nu samma som i AboutPopup
        const textX = this.popupX + (this.popupW * 0.05); // Flytta texten lite från popup-kanten
        const textY = this.popupY + (this.popupH * 0.30); // Skapa mellanrum under popup-rubrik
        const textBlockWidth = this.popupW * 0.9;        // Textbredd justeras efter popup-bredd
        const textBlockHeight = this.popupH * 0.7;       // Höjdbegränsning för text

        switch (this.currentPage) {
            case 0: //Sida 1: Controls & Powerups
                textSize(width * 0.05); //Rubrikstorlek
                textStyle(BOLD);
                textAlign(CENTER);
                text("Controls & Powerups", width * 0.5, this.popupY + 75); //+75 flyttar ner rubriken från popup-kanten

                textSize(width * 0.014); //Brödtextens storlek
                textStyle(NORMAL);
                textAlign(LEFT, TOP);
                const page1Text =
                    "Controls:\nArrow keys to move left and right. Space to shoot laser.\n\n" +
                    "Powerups:\nShield: Protects you from one asteroid.\nSuperlaser: Destroys multiple asteroids.\nLives: Gain extra hearts.";
                text(page1Text, textX, textY, textBlockWidth, textBlockHeight);
                break;

            case 1: //Sida 2: Characters
                textSize(width * 0.05);
                textStyle(BOLD);
                textAlign(CENTER);
                text("Characters", width * 0.5, this.popupY + 75);

                textSize(width * 0.014);
                textStyle(NORMAL);
                textAlign(LEFT, TOP);
                const page2Text =
                    "Dinosaur (Player): Can take damage from asteroids or pick up powerups.\n\n" +
                    "Asteroids (Enemy): Fall from the sky, causing damage to the player.";
                text(page2Text, textX, textY, textBlockWidth, textBlockHeight);
                break;

            case 2: //Sida 3: Asteroid Types
                textSize(width * 0.05);
                textStyle(BOLD);
                textAlign(CENTER);
                text("Asteroid Types", width * 0.5, this.popupY + 75);

                textSize(width * 0.014);
                textStyle(NORMAL);
                textAlign(LEFT, TOP);
                const page3Text =
                    "Regular Asteroid: Disappears when hit by a laser.\n\n" +
                    "Big Asteroid: Breaks into two smaller asteroids.\n\n" +
                    "Super Asteroid: Requires five laser shots to destroy.";
                text(page3Text, textX, textY, textBlockWidth, textBlockHeight);
                break;
        }
        pop();
    }
}


