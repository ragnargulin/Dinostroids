class Button {
    private label: string;
    private color: string;
    private position: p5.Vector;
    private width: number = 200;
    private height: number = 40;

    constructor(label: string, position: p5.Vector, width: number = 200, height: number = 40, color: string = "Maroon") {
        this.label = label;
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
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
        rectMode(CENTER); // Börjar rita från mitten av knappen
    
        const isMouseOver =
            mouseX > this.position.x - this.width / 2 &&
            mouseX < this.position.x + this.width / 2 &&
            mouseY > this.position.y - this.height / 2 &&
            mouseY < this.position.y + this.height / 2;
    
        if (this.label === "START GAME") {
            // Background styling for startBtn
            fill("darkgreen");
            rect(this.position.x, this.position.y, this.width + 10, this.height - 10);
    
            fill("darkgreen");
            rect(this.position.x, this.position.y, this.width - 10, this.height + 10);
    
            // Primary colour and hover effect
            const hoverColor = isMouseOver ? "lightgreen" : "green";
            fill(hoverColor);
            rect(this.position.x, this.position.y, this.width, this.height);
        } else {

            // Styling for standardBtns
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