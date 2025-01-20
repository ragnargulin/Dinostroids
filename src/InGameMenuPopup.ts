class InGameMenuPopup implements IScene {
    private backgroundImage: p5.Image;
    //private buttonClickedSound: p5.SoundFile;
    private backgroundMusic: p5.SoundFile;
    private dinoStroids: IChangeableScene;
    private quitBtn: Button;
    private restartBtn: Button;
    private continueBtn: Button;
    private musicOnOffBtn: Button;
    private isMusicPlaying: boolean;

    constructor(dinoStroids: IChangeableScene) {

        this.backgroundImage = loadImage("../assets/images/background.png");
        //this.buttonClickedSound = loadSound("../assets/soundeffects/buttonClick.mp3");
        this.backgroundMusic = loadSound("../assets/music/backgroundMusic.mp3");
        this.dinoStroids = dinoStroids;

        this.quitBtn = new Button('QUIT', createVector(width * 0.5, height * 0.37));
        this.restartBtn = new Button('RESTART', createVector(width * 0.5, height * 0.48));
        this.continueBtn = new Button('CONTINUE', createVector(width * 0.5, height * 0.59));
        this.musicOnOffBtn = new Button('MUSIC ON', createVector(width * 0.5, height * 0.70));
        this.isMusicPlaying = false;
    }

    public update(): void {
        if (this.quitBtn.isClicked()) {
            //this.buttonClickedSound.play();
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new MainMenu(this.dinoStroids));
        }
        if (this.restartBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids));
        }
        if (this.continueBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids));
        }
        if (this.musicOnOffBtn.isClicked()) {
            this.shiftMusicOnOff(); //Möjliggör att växla till MUSIC ON/OFF när man klickar
        }
    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);
        push();
        fill(0, 0, 0, 100);
        rect(0, 0, width, height);
        pop();

        //Box Colour and box size
        fill("lightgrey");
        rect(width * 0.25, height * 0.20, width * 0.5, height * 0.6)

        this.quitBtn.draw();
        this.restartBtn.draw();
        this.continueBtn.draw();
        this.musicOnOffBtn.draw();
        this.drawTextInsideBox();
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
            this.backgroundMusic.pause();
            this.musicOnOffBtn.setLabel("MUSIC ON"); //Uppdatera knappens text
        } else {
            this.backgroundMusic.loop(); //Loopa musiken
            this.musicOnOffBtn.setLabel("MUSIC OFF"); //Uppdatera knappens text
        }

        //Växlar musiken
        if (this.isMusicPlaying) {
            this.isMusicPlaying = false;
        } else {
            this.isMusicPlaying = true;
        }
    }
}