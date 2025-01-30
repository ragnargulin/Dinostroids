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
        this.isMusicPlaying = this.backgroundMusic.isPlaying(); //Changed from boolean value false cause it caused the game to think the music wasnt playing although it was

        // Coordinates for the popuop box
        this.popupX = width * 0.25;
        this.popupY = height * 0.20;
        this.popupW = width * 0.5;
        this.popupH = height * 0.6;

        if (!music.menuMusic.isPlaying() && !music.mystery.isPlaying()) { //ser till att musiken inte startas om i onödan när man öppnar menyn
            music.menuMusic.setVolume(1);
            music.menuMusic.loop();
        }


<
    public update(): void {
        if (this.quitBtn.isClicked()) {
            soundeffects.buttonClick.play();

            //Checks that the menu music is playing and the in game music is stopped 
            if (!music.menuMusic.isPlaying()) {
                music.menuMusic.setVolume(1);
                music.menuMusic.loop();
            }
            if (music.mystery.isPlaying()) {
                music.mystery.pause();
            }

            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
        if (this.restartBtn.isClicked()) {
            soundeffects.buttonClick.play();

            //Stops all music if the game is stopped
            if (music.menuMusic.isPlaying()) {
                music.menuMusic.pause();
            }
            if (music.mystery.isPlaying()) {
                music.mystery.pause();
            }
            this.dinoStroids.getMemory().playerScore = 0;
            this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids));
        }
        if (this.continueBtn.isClicked()) {
            soundeffects.buttonClick.play();

            //Stops menu music when the game continues
            if (music.menuMusic.isPlaying()) {
                music.menuMusic.pause();
            }

            this.pausedBoard.resumeGame();
            this.dinoStroids.changeActiveScene(this.pausedBoard);
        }
        if (this.musicOnOffBtn.isClicked()) {
            this.shiftMusicOnOff();
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
    


    private shiftMusicOnOff(): void {
        if (this.isMusicPlaying) {
            this.backgroundMusic.pause();
            this.musicOnOffBtn.setLabel("MUSIC ON");
        } else {
            this.backgroundMusic.loop();
            this.musicOnOffBtn.setLabel("MUSIC OFF");
        }
        this.isMusicPlaying = !this.isMusicPlaying;

    }
  }
}
