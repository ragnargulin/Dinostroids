class AboutPopup implements IScene {
    private backgroundImage: p5.Image;
    private returnBtn: Button;
    private dinoStroids: IChangeableScene;

    constructor(dinoStroids: IChangeableScene) {
        this.backgroundImage = loadImage("../assets/images/background.png");

        this.dinoStroids = dinoStroids;
        this.returnBtn = new Button('Return', createVector(width * 0.5, height * 0.37));
    }
    update(): void {
        //throw new Error("Method not implemented.");
        //if (this.returnBtn.isClicked()) {
        // soundeffects.buttonClick.play()
        // this.dinoStroids.changeActiveScene(new HowToPlayPopup(this.dinoStroids))
        //}
    }
    draw(): void {
        // throw new Error("Method not implemented.");
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        fill("lightgrey");
        // HTML
        rect(width * 0.25, height * 0.20, width * 0.5, height * 0.6)
        this.drawText();
        //this.returnBtn.draw();
    }
    public drawText() {
        push();
        fill("black");
        //textSize(width * 0.1);
        textStyle(BOLD);
        textAlign("center");
        textFont("Pixelify Sans");
        textSize(width * 0.05);
        text("About", width * 0.5, height * 0.3);

        //Brödtexten
        textSize(width * 0.014);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        const textX = width * 0.28; //Flyttar texten lite mot mitten
        const textY = height * 0.33; //Ändrar utrymmet mellan rubrik och brödtext
        const textBlockWidth = width * 0.45; //Minskad bredd för smalare textblock
        const textBlockHeight = height * 0.3; //Höjdbegränsning (valfritt)

        const textBlock = "Long before humans even could spell space travel, the dinosaurs saw the disaster coming in the form of a giant asteroid heading towards Earth. With their super secret technology, the dinosaurs built spaceships and escaped from Earth at the very last second, to head towards their new home destination - Mars.";
        text(textBlock, textX, textY, textBlockWidth, textBlockHeight);
        const textBlock2 = "On the red planet, they didn't just become survivors - they became kings! They build mighty cities of stone and laser with lava fountains and floating mountains. Life here was epic! Until now..."
        text(textBlock2, textX, textY + 105, textBlockWidth, textBlockHeight);
        const textBlock3 = "Asteroids are raining down again! But this time over planet Mars. Now it's up to the dinosaurs to bring out their inner T-rex and fight for their survival, because no asteroid shall win over the dinosaurs!"
        text(textBlock3, textX, textY + 195, textBlockWidth, textBlockHeight);
        const textBlock4 = "Upload! Fight back! Save Mars!"
        text(textBlock4, textX, textY + 275, textBlockWidth, textBlockHeight);
        pop();
    }
}