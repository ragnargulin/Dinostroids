class Button {
    private label: string;
    private color: string;
    private position: p5.Vector;

    constructor(label: string, position: p5.Vector, onClick: () => void) {
        this.label = label;
        this.color = "blue";
        this.position = position;
    }
    // position: absolut/fixed
    // left: 50%
    // top: 50%
    
    public draw() {
        this.drawBackground();
        this.drawLabel();
    }
    
    private drawLabel() {
        push();
        // CSS
        textAlign(CENTER, CENTER)
        fill("black");
        textFont("Arial", 24);
        textStyle(BOLD);
    
        // HTML
        text(this.label, this.position.x, this.position.y)
        pop();
    }

    private drawBackground() {
        push();
        noStroke();
        rectMode(CENTER)
        fill("#88F");
        rect(this.position.x, this.position.y, 210, 30)
        rect(this.position.x, this.position.y, 190, 50)
        
        fill(this.color);
        rect(this.position.x, this.position.y, 200, 40)
        pop();
    }
}
