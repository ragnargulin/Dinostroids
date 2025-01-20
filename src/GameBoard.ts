class GameBoard implements IScene {
    private backgroundImage: p5.Image;
    private returnBtn: Button;
    private dinoStroids: IChangeableScene;
    
    constructor(dinoStroids: IChangeableScene) {
        this.backgroundImage = loadImage("../assets/images/background.png");

        this.dinoStroids = dinoStroids;
        this.returnBtn = new Button('Return', createVector(width * 0.5, height * 0.37));
    }
    update(): void {
        throw new Error("Method not implemented.");
        if (this.returnBtn.isClicked()) {
            // soundeffects.buttonClick.play()
            this.dinoStroids.changeActiveScene(new HowToPlayPopup(this.dinoStroids))
        }
    }
    draw(): void {
        // throw new Error("Method not implemented.");
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);
        
        fill("lightgrey");
        // HTML
        rect(width * 0.25 , height * 0.20 , width * 0.5, height * 0.6)
        this.drawText();
        this.returnBtn.draw();
    }
    public drawText() {
        push();
        fill("black");
        textSize(width * 0.1);
        textStyle("bold");
        textAlign("center");
        text("Hello world", width * 0.5, height * 0.5);
        pop();
    }
}