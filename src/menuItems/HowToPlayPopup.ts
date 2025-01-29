class HowToPlayPopup implements IScene {
    private backgroundImage: p5.Image;
    private dinoStroids: IChangeableScene;
    private moveImage: p5.Image;
    private shootImage: p5.Image;
    private powerupImage: p5.Image;
    private asteroidtypeImage: p5.Image;
    private dino: p5.Image;

    private currentPage: number = 0;
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
        this.powerupImage = imageAssets.powerupImage;
        this.asteroidtypeImage = imageAssets.asteroidtypeImage;
        this.dino = imageAssets.dino;

        //Popup box 
        this.popupX = width * 0.05;
        this.popupY = height * 0.20;
        this.popupW = width * 0.90;
        this.popupH = height * 0.60;

        //Close (X) button
        const xButtonSize = 40;
        const closeButtonX = (this.popupX + this.popupW) - (xButtonSize / 2);
        const closeButtonY = this.popupY + (xButtonSize / 2);
        this.closeButton = new Button("X", createVector(closeButtonX, closeButtonY), xButtonSize, xButtonSize);
        //Next button
        this.nextPageBtn = new Button("Next", createVector(width * 0.8, height * 0.7));
        //Prev button
        this.prevPageBtn = new Button("Prev", createVector(width * 0.2, height * 0.7));
    }

    public update(): void {
        if (this.closeButton.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
        if (this.nextPageBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.currentPage = (this.currentPage + 1) % 4;
        }
        if (this.currentPage > 0 && this.prevPageBtn.isClicked()) { //Här kontrolleras att currentPage inte är 0 och om Prev-btn blivit klickad. Villkoret bara sant om båda är sanna samtidigt &&. currentPage--, innebär att värdet minskas med 1, så om vi är på sida två och klickar på Prev, minskar this.currentPage till 1. 
            soundeffects.buttonClick.play();
            this.currentPage--;
        }
    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);
        //Dim the background with a transparent overlay
        push();
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        pop();

        //Popup box
        push();
        fill("lightgrey");
        rect(this.popupX, this.popupY, this.popupW, this.popupH);
        pop();

        //Draw the current page (either text or images)
        this.drawCurrentPage();

        //Draw buttons
        this.closeButton.draw();
        this.nextPageBtn.draw();

        if (this.currentPage > 0) { //Ritar bara ut Prev-btn när currentPage inte är 0
            this.prevPageBtn.draw();
        }
    }

    private drawCurrentPage(): void {
        push();
        fill("black");
        textFont("Pixelify Sans");

        //Placering och mått för textblocken, nu samma som i AboutPopup
        const textX = this.popupX + (this.popupW * 0.05); // Flytta texten lite från popup-kanten
        const textY = this.popupY + (this.popupH * 0.27); // Skapa mellanrum under popup-rubrik
        const textBlockWidth = this.popupW * 0.9;        // Textbredd justeras efter popup-bredd
        const textBlockHeight = this.popupH * 0.7;       // Höjdbegränsning för text

        switch (this.currentPage) {
            case 0: //Sida 1: Controls
                textSize(width * 0.05); //Rubrikstorlek
                textStyle(BOLD);
                textAlign(CENTER);
                text("Controls", width * 0.5, this.popupY + 65); //+75 flyttar ner rubriken från popup-kanten

                textSize(width * 0.02); //Brödtextens storlek
                textStyle(NORMAL);
                textAlign(CENTER);
                const page1Text =
                    "\n\n\nArrow keys to move right and left. Space to shoot laser."
                text(page1Text, textX, textY, textBlockWidth, textBlockHeight);

                imageMode(CENTER);
                image(this.moveImage, width * 0.3, this.popupY + this.popupH * 0.5 - 20, width * 0.2, height * 0.2); //Lagt till - 20 för att kunna flytta ner bilderna 20px ner från deras tidigare position
                image(this.shootImage, width * 0.7, this.popupY + this.popupH * 0.5 - 20, width * 0.2, height * 0.2);
                break;

            case 1: //Sida 2: Powerups
                textSize(width * 0.05);
                textStyle(BOLD);
                textAlign(CENTER);
                text("Powerups", width * 0.5, this.popupY + 65);

                textSize(width * 0.017);
                textStyle(NORMAL);
                textAlign(LEFT, TOP);
                const page2Text =
                    "Shield: Falls from the sky and protects the player from an asteroid. If the shield is hit by an asteroid, it disappears, but the player remains unharmed. Only one shield can be carried at a time.\n\nSuperlaser: Falls from the sky, one shot with the superlaser\n can destroy the Superasteroid.\n\nHearts: Lives in the form of hearts fall from the sky.\nFull health is five hearts, when lives run out, the player dies."
                text(page2Text, textX, textY, textBlockWidth, textBlockHeight);

                imageMode(CENTER);
                image(this.powerupImage, width * 0.3 + 410, this.popupY + this.popupH * 0.5 + 30, width * 0.2, height * 0.2); //Lagt till +410 för att flytta bilden mer åt höger
                break;

            case 2: //Sida 3: Characters
                textSize(width * 0.05);
                textStyle(BOLD);
                textAlign(CENTER);
                text("Characters", width * 0.5, this.popupY + 65);

                textSize(width * 0.017);
                textStyle(NORMAL);
                textAlign(LEFT, TOP);
                const page3Text =
                    "Dino: The dinousaur, the player's character. When hit by an asteroid, Dino can take damage. Dino can pick up powerups to increase vitality.\n\nAsteroids: The enemy, falls from the sky and their position on the x-axis is randomly generated. Depending on the asteroid type that hits the player, it causes varying amounts of damage."
                text(page3Text, textX, textY, textBlockWidth, textBlockHeight);

                imageMode(CENTER);
                image(this.dino, width * 0.3 + 200, this.popupY + this.popupH * 0.5 + 95, width * 0.2, height * 0.2);
                break;

            case 3: //Sida 4: Asteroid Types
                textSize(width * 0.05);
                textStyle(BOLD);
                textAlign(CENTER);
                text("Asteroid Types", width * 0.5, this.popupY + 65);

                textSize(width * 0.017);
                textStyle(NORMAL);
                textAlign(LEFT, TOP);
                const page4Text =
                    "Regular Asteroid: Disappears when hit by a laser shot. \n\n Big Asteroid: Breaks into two regular asteroids when hit\n by a laser shot or destroyed by a superlaser shot.\n\nSuper Asteroid: Requires five laser shots to be destroyed\n or one superlaser shot. Grants extra points."
                text(page4Text, textX, textY, textBlockWidth, textBlockHeight);

                imageMode(CENTER);
                image(this.asteroidtypeImage, width * 0.3 + 410, this.popupY + this.popupH * 0.5, width * 0.2, height * 0.2);
                break;
        }
        pop();
    }
}


