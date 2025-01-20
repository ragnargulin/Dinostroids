class Button {
    private label: string;
    private color: string;
    private position: p5.Vector;
    private width: number = 200;
    private height: number = 40;

    constructor(label: string, position: p5.Vector) {
        this.label = label;
        this.color = "Maroon";
        this.position = position;
    }
    // position: absolut/fixed
    // left: 50%
    // top: 50%
    public isClicked(): boolean {
        const isMouseOver = 
        mouseX > this.position.x - this.width / 2 &&
        mouseX < this.position.x + this.width / 2 &&
        mouseY > this.position.y - this.height / 2 &&
        mouseY < this.position.y + this.height / 2;

        if (isMouseOver && mouseIsPressed) {
            console.log("button clicked");
            return true;
        }
        return false;
    }

   
   
    public draw() {
        this.drawBackground();
        this.drawLabel();

    }
    
    private drawLabel() {
        push();
        // CSS
        textAlign(CENTER, CENTER)
        fill("white");
    
        textFont("Pixelify Sans", 24);
        textStyle(BOLD);
        // HTML
        text(this.label, this.position.x, this.position.y)
        pop();
    }

    private drawBackground() {
        push();
        noStroke();
        rectMode(CENTER);

        const isMouseOver =
            mouseX > this.position.x - this.width / 2 &&
            mouseX < this.position.x + this.width / 2 &&
            mouseY > this.position.y - this.height / 2 &&
            mouseY < this.position.y + this.height / 2;

        // Pixelated Button
        fill("red");
        rect(this.position.x, this.position.y, this.width + 10, this.height - 10);

        fill("red");
        rect(this.position.x, this.position.y, this.width - 10, this.height + 10);

        fill(isMouseOver ? "red" : this.color);
        rect(this.position.x, this.position.y, this.width, this.height);


        pop();
    }
}