class InputNamePopup implements IScene {
    private dinoStroids: IChangeableScene;
    private memory: GameMemory;

    private playerNameLocal: string = "";
    private isFocused: boolean = false;
    private errorMsg: string = "";

    // Popup box coords
    private boxX: number;
    private boxY: number;
    private boxW: number;
    private boxH: number;

    // Name input box
    private nameBoxX: number;
    private nameBoxY: number;
    private nameBoxW: number;
    private nameBoxH: number;

    // Buttons
    private startButton: Button;
    private cancelButton: Button;

    private backgroundImage: p5.Image;

    constructor(dinoStroids: IChangeableScene) {
        this.dinoStroids = dinoStroids;
        this.memory = this.dinoStroids.getMemory();

        this.backgroundImage = imageAssets.background;

        // Popup dims
        this.boxW = width * 0.6;
        this.boxH = height * 0.4;
        this.boxX = (width - this.boxW) / 2;
        this.boxY = (height - this.boxH) / 2;

        // Name input box inside the popup
        this.nameBoxW = this.boxW * 0.5;
        this.nameBoxH = 40;
        this.nameBoxX = this.boxX + (this.boxW - this.nameBoxW) / 2;
        this.nameBoxY = this.boxY + this.boxH * 0.45;

        // START button
        const startBtnPos = createVector(width * 0.5, this.boxY + this.boxH * 0.75);
        this.startButton = new Button("START GAME", startBtnPos, 200, 40, "green");

        // Cancel (X) button in top-right corner
        const xButtonSize = 40;
        const cancelBtnX = this.boxX + this.boxW - (xButtonSize / 2);
        const cancelBtnY = this.boxY + (xButtonSize / 2);
        this.cancelButton = new Button("X", createVector(cancelBtnX, cancelBtnY), xButtonSize, xButtonSize);
    }

    public update(): void {
        // START
        if (this.startButton.isClicked()) {
            soundeffects.buttonClick.play();

            if (this.playerNameLocal.trim().length === 0) {
                this.errorMsg = "Please enter a name to continue!";
            } else {
                // Store typed name
                this.memory.playerName = this.playerNameLocal.trim();
                this.memory.playerScore = 0;

                this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids));
            }
        }

        // CANCEL
        if (this.cancelButton.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
    }

    public draw(): void {
        // 1) Full background
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        // 2) Dim overlay
        push();
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        pop();

        push();
        fill("lightgrey");
        stroke("black");
        strokeWeight(4);
        rect(this.boxX, this.boxY, this.boxW, this.boxH, 10);
        pop();

        this.drawHeading();

        this.drawNameField();

        this.drawErrorMessage();

        this.startButton.draw();
        this.cancelButton.draw();
    }

    public mousePressed(): void {
        const clickedInsideNameBox =
            mouseX >= this.nameBoxX &&
            mouseX <= this.nameBoxX + this.nameBoxW &&
            mouseY >= this.nameBoxY &&
            mouseY <= this.nameBoxY + this.nameBoxH;

        this.isFocused = clickedInsideNameBox;
    }

    public keyPressed(): void {
        if (!this.isFocused) return;

        if (keyCode === BACKSPACE || keyCode === 8) {
            this.playerNameLocal = this.playerNameLocal.slice(0, -1);
            return;
        }
        if (keyCode === ENTER || keyCode === RETURN) {
            return;
        }
        if (key.length === 1) {
            this.playerNameLocal += key;
        }
    }

    private drawHeading(): void {
        push();
        fill("black");
        textAlign(CENTER, TOP);
        textFont("Pixelify Sans, sans-serif");
        textStyle(BOLD);

        textSize(36);
        text("ENTER YOUR NAME", width * 0.5, this.boxY + this.boxH * 0.1);

        textSize(16);
        fill(50);
        text("This will appear on the scoreboard!", width * 0.5, this.boxY + this.boxH * 0.25);
        pop();
    }

    private drawNameField(): void {
        // The text box
        push();
        stroke("black");
        fill(this.isFocused ? 220 : 200);
        rect(this.nameBoxX, this.nameBoxY, this.nameBoxW, this.nameBoxH);
        pop();

        // The typed text
        push();
        fill("black");
        textAlign(LEFT, CENTER);
        textSize(this.nameBoxH * 0.5);
        textFont("Pixelify Sans, sans-serif");
        textStyle(NORMAL);

        const textX = this.nameBoxX + 10;
        const textY = this.nameBoxY + this.nameBoxH / 2;
        text(this.playerNameLocal, textX, textY);

        if (this.isFocused) {
            const cursorX = textX + textWidth(this.playerNameLocal) + 5;
            if (floor(frameCount / 30) % 2 === 0) {
                stroke("black");
                line(cursorX, this.nameBoxY + 5, cursorX, this.nameBoxY + this.nameBoxH - 5);
            }
        }
        pop();
    }

    private drawErrorMessage(): void {
        if (this.errorMsg.length > 0) {
            push();
            fill("red");
            textAlign(CENTER, TOP);
            textSize(20);
            textFont("Pixelify Sans, sans-serif");

            text(
                this.errorMsg,
                width * 0.5,
                this.boxY + this.boxH * 0.85
            );
            pop();
        }
    }
}
