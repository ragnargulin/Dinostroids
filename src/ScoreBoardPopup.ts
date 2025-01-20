class ScoreBoardPopup implements IScene {
    private backgroundImage: p5.Image;
    private returnBtn: Button;
    private dinoStroids: IChangeableScene;

    constructor(dinoStroids: IChangeableScene) {
        this.backgroundImage = loadImage("../assets/images/background.png");
        this.dinoStroids = dinoStroids;
        this.returnBtn = new Button('X', createVector(width * 0.715, height * 0.25), 40);
    }

    update(): void {
        // Update logic here...
    }

    draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        fill("lightgrey");
        rect(width * 0.25, height * 0.20, width * 0.5, height * 0.6);

        this.drawText();
        this.returnBtn.draw();
    }

    private getTopScores(): { name: string; score: number }[] {
        // For now, we use the global topScores array
        return topScores.sort((a, b) => b.score - a.score).slice(0, 10);
    }

    public drawText() {
        // Title
        push();
        fill("black");
        textStyle("bold");
        textFont("Pixelify Sans", width * 0.07);
        textAlign("center");
        text("SCOREBOARD", width * 0.5, height * 0.35);
        pop();
        

        // Draw top scores
        const topScoresList = this.getTopScores();
        if (topScoresList.length === 0) {
            // Display a message if no scores exist
            push();
            fill("black");
            textFont("Pixelify Sans", width * 0.04);
            textAlign("center");
            text("No scores available", width * 0.5, height * 0.4);
            pop();
        } else {
            // Render scores
            topScoresList.forEach((entry, index) => {
                push();
                fill("black");
                textFont("Pixelify Sans", width * 0.035);
                textAlign("left");
                text(
                    `${index + 1}. ${entry.name}: ${entry.score}`,
                    width * 0.3,
                    height * 0.45 + index * 30
                );
                pop();
            });
        }
        push();
        fill("black");
        textFont("Pixelify Sans", width * 0.04);
        textStyle("bold");
        textAlign("center");
        text(`Latest score: ${latestScore}`, width * 0.5, height * 0.73);

        pop();
    }
}