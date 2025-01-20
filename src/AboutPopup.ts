class AboutPopup implements IScene {
    private backgroundImage: p5.Image;
    private returnBtn: Button;
    private dinoStroids: IChangeableScene;

    constructor(dinoStroids: IChangeableScene) {
        // Reuse the exact same image used in MainMenu
        this.backgroundImage = loadImage("../assets/images/background.png");

        this.dinoStroids = dinoStroids;
        this.returnBtn = new Button("Return", createVector(width * 0.5, height * 0.75));
    }

    public update(): void {
        // Return to MainMenu when the button is clicked
        if (this.returnBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        //Dim Background effact
        push();
        fill(0, 0, 0, 100); 
        rect(0, 0, width, height);
        pop();

        //Draw the popup
        push();
        fill("lightgrey");
        rect(width * 0.25, height * 0.20, width * 0.5, height * 0.4);
        pop();

        // Put text inside popup
        this.drawTextInsidePopup();

        this.returnBtn.draw();
    }

    private drawTextInsidePopup(): void {
        push();
        fill("black");
        textSize(24);
        textAlign(CENTER, CENTER);

        text("About Here!", width * 0.5, height * 0.35);
        pop();
    }
}
