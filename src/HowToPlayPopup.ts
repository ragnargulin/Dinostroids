class HowToPlayPopup implements IScene {
    private backgroundImage: p5.Image;
    private returnBtn: Button;
    private dinoStroids: IChangeableScene;
    private moveImage: p5.Image;
    private shootImage: p5.Image;

    // Array to hold three parts of the text
    private textParts: string[];
    private currentPage: number = 0; // Tracks the current page (0-3, where 3 is the image page)
    private nextPageBtn: Button; // Button to switch between pages
    private prevPageBtn: Button;

    constructor(dinoStroids: IChangeableScene) {
        this.backgroundImage = loadImage("../assets/images/background.png");
        this.moveImage = loadImage("../assets/images/Frame-17.png");
        this.shootImage = loadImage("../assets/images/Frame-19.png");

        this.dinoStroids = dinoStroids;
        this.returnBtn = new Button('X', createVector(width * 0.85, height * 0.25));

        // Initialize the textParts array with 3 sections of text
        this.textParts = [
            "Controls:\nArrow keys to move right and left. Space to shoot laser.\n\nPowerups:\nShield: A power-up that falls from the sky. The shield protects the player from an asteroid. If the shield is hit by an asteroid, it disappears, but the player remains unharmed. Only one shield can be carried at a time.\n\nSuperlaser: A power-up that falls from the sky.\n\nLives: Hearts in the form of lives fall from the sky. The full health is five hearts. When lives run out, the player dies.",
            "Characters:\nDinosaur (player's character): If the dinosaur is hit by an object, it can take damage (if the object is an asteroid). The dinosaur can pick up power-ups (to increase its vitality).\n\nAsteroids (enemy): Fall from the sky. Their position on the x-axis is randomly generated. Depending on the asteroid type that hits the player, it causes varying amounts of damage.",
            "Regular Asteroid: Disappears when hit by a laser shot. \n\n Big Asteroid: Breaks into two regular asteroids when hit by a laser shot or destroyed by a superlaser shot.\nSuper Asteroid: Requires five laser shots to be destroyed or one superlaser shot. Grants extra points."
        ];

        // Create the button to switch between pages
        this.nextPageBtn = new Button('Next Page', createVector(width * 0.8, height * 0.7));
        this.prevPageBtn = new Button('Prev Page', createVector(width * 0.2, height * 0.7));
    }

    update(): void {
        if (this.returnBtn.isClicked()) {
            soundeffects.buttonClick.play()
            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids))
        }

       
        if (this.nextPageBtn.isClicked()) {
            this.currentPage = (this.currentPage + 1) % 4; // Cycle through 4 pages
        }
        if (this.prevPageBtn.isClicked()) {
            // Decrement page, wrap around if needed
            this.currentPage--;
            if (this.currentPage < 0) {
              this.currentPage = 0; 
              // or loop to last page if you want: this.currentPageIndex = this.instructions.length - 1;
            }
        }
    }

    draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        fill("lightgrey");
        // Draw a box for the content
        rect(width * 0.05 , height * 0.20 , width * 0.9, height * 0.6);

        // Draw the current page content
        this.drawCurrentPage();

        // Draw the return button
        this.returnBtn.draw();

        // Draw the switch page button
        this.nextPageBtn.draw();
        this.prevPageBtn.draw();
    }

    // Method to draw content based on the current page
    private drawCurrentPage() {
        push();
        fill("black");

        let textSizeValue = width * 0.02; // Adjust text size based on the width
        textSize(textSizeValue);

        textAlign("center", "top");

        // Set the box where the text will be drawn
        let textX = width * 0.1;
        let textY = height * 0.25;
        let boxWidth = width * 0.8;
        let boxHeight = height * 0.6;

        // Decide what to draw based on the current page
        if (this.currentPage < 3) {
            // Draw the text for pages 0-2
            textWrap(WORD);
            text(this.textParts[this.currentPage], textX, textY, boxWidth, boxHeight);
        } else {
            // Draw the images for page 3
            this.drawImages();
        }

        pop();
    }

    // Method to draw the images (moveImage and shootImage)
    private drawImages() {
        imageMode(CENTER);

        // Draw moveImage
        image(this.moveImage, width * 0.3, height * 0.45, width * 0.3, height * 0.25);

        // Draw shootImage below the moveImage
        image(this.shootImage, width * 0.7, height * 0.45, width * 0.3, height * 0.25);
    }
}
