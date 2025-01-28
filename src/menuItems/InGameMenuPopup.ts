class InGameMenuPopup implements IScene {
    
    private backgroundMusic: p5.SoundFile;
    private dinoStroids: IChangeableScene;
    private quitBtn: Button;
    private restartBtn: Button;
    private continueBtn: Button;
    private musicOnOffBtn: Button;
    private isMusicPlaying: boolean;
    // Popup coordinates
    private popupX: number;
    private popupY: number;
    private popupW: number;
    private popupH: number;

    private pausedBoard: GameBoard;

    constructor(dinoStroids: IChangeableScene, pausedBoard: GameBoard) {

        this.backgroundMusic = music.mystery;
        this.dinoStroids = dinoStroids;
        this.pausedBoard = pausedBoard;

        this.quitBtn = new Button('QUIT', createVector(width * 0.5, height * 0.37));
        this.restartBtn = new Button('RESTART', createVector(width * 0.5, height * 0.48));
        this.continueBtn = new Button('CONTINUE', createVector(width * 0.5, height * 0.59), 200, 40, 'green');
        this.musicOnOffBtn = new Button('MUSIC ON', createVector(width * 0.5, height * 0.70));
        this.isMusicPlaying = false;

        // Coordinates for the popuop box
        this.popupX = width * 0.25;
        this.popupY = height * 0.20;
        this.popupW = width * 0.5;
        this.popupH = height * 0.6;
    }

    public update(): void {
        if (this.quitBtn.isClicked()) {
            soundeffects.buttonClick.play();

            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
        if (this.restartBtn.isClicked()) {
            soundeffects.buttonClick.play();

            this.dinoStroids.getMemory().playerScore = 0;
            this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids));
        }
        if (this.continueBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(this.pausedBoard);
        }
        if (this.musicOnOffBtn.isClicked()) {
            this.shiftMusicOnOff(); //Möjliggör att växla till MUSIC ON/OFF när man klickar
        }
    }

    public draw(): void {
        
        this.pausedBoard.draw();
        
        push();
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        pop();

        //Box Colour and box size
        fill("lightgrey");
        rect(width * 0.25, height * 0.20, width * 0.5, height * 0.6);

        rect(this.popupX, this.popupY, this.popupW, this.popupH);

        this.quitBtn.draw();
        this.restartBtn.draw();
        this.continueBtn.draw();
        this.musicOnOffBtn.draw();
        this.drawTextInsideBox();

        // this.closeButton.draw();
    }

    private drawTextInsideBox(): void {
        push();
        fill("black");
        textStyle(BOLD);
        textAlign("center");
        textFont("Pixelify Sans");
        textSize(width * 0.05);
        text("MENU", width * 0.5, height * 0.3);
        pop();
    }

    private shiftMusicOnOff(): void {
        if (this.isMusicPlaying) {
            this.backgroundMusic.loop();
            this.musicOnOffBtn.setLabel("MUSIC OFF");
        } else {
            this.backgroundMusic.pause();
            this.musicOnOffBtn.setLabel("MUSIC ON"); 
        }

        //Växlar musiken
        if (this.isMusicPlaying) {
            this.isMusicPlaying = false;
        } else {
            this.isMusicPlaying = true;
        }
    }
}