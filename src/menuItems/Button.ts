class Button {
    private label: string;
    private color: string;
    private position: p5.Vector;
    private width: number;
    private height: number;
    private wasPressedLastFrame: boolean = false;

    constructor(
        label: string,
        position: p5.Vector,
        buttonWidth: number = 200,
        buttonHeight: number = 40,
        color: string = "Maroon"
    ) {
        this.label = label;
        this.position = position;
        this.width = buttonWidth;
        this.height = buttonHeight;
        this.color = color;
    }


    public isClicked(): boolean {
        const isMouseOver =
            mouseX > this.position.x - this.width / 2 &&
            mouseX < this.position.x + this.width / 2 &&
            mouseY > this.position.y - this.height / 2 &&
            mouseY < this.position.y + this.height / 2;

        let clickedThisFrame = false;
        if (isMouseOver && mouseIsPressed && !this.wasPressedLastFrame) {
            clickedThisFrame = true;
            console.log(this.label, "button clicked");
        }

        this.wasPressedLastFrame = mouseIsPressed;
        return clickedThisFrame;
    }
    public setLabel(newLabel: string): void {
        this.label = newLabel;
    }
    


    public draw(): void {
        this.drawBackground();
        this.drawLabel();
    }

    private drawLabel(): void {
        push();
        textAlign(CENTER, CENTER);
        fill("white");
        textFont("Pixelify Sans", 24);
        textStyle(BOLD);
        text(this.label, this.position.x, this.position.y);
        pop();
    }

    private drawBackground(): void {
        push();
        noStroke();
        rectMode(CENTER);

        const isMouseOver =
            mouseX > this.position.x - this.width / 2 &&
            mouseX < this.position.x + this.width / 2 &&
            mouseY > this.position.y - this.height / 2 &&
            mouseY < this.position.y + this.height / 2;

        if (this.label === "START GAME") {
            // SPECIAL  styling for "START GAME"
            fill("darkgreen");
            rect(this.position.x, this.position.y, this.width + 10, this.height - 10);

            fill("darkgreen");
            rect(this.position.x, this.position.y, this.width - 10, this.height + 10);

            const hoverColor = isMouseOver ? "lightgreen" : this.color;
            fill(hoverColor);
            rect(this.position.x, this.position.y, this.width, this.height);

        } else {
            fill("red");
            rect(this.position.x, this.position.y, this.width + 10, this.height - 10);

            fill("red");
            rect(this.position.x, this.position.y, this.width - 10, this.height + 10);

            fill(isMouseOver ? "crimson" : this.color);
            rect(this.position.x, this.position.y, this.width, this.height);
        }

        pop();
    }
}
