class MainMenu implements IScene {
    private backgroundImage: p5.Image;
    private backgroundMusic: p5.SoundFile;
    private gameTitle: p5.Image;
    private aboutBtn: Button;
    private howToPlayBtn: Button;
    private dinoStroids: IChangeableScene;
    private scoreBoardBtn: Button;
    private startGameBtn: Button;
    private buttonClickedSound: p5.SoundFile;
    private musicOnOffBtn: Button;
    private isMusicPlaying: boolean;

    constructor(dinoStroids: IChangeableScene) {
        this.backgroundImage = loadImage("../assets/images/background.png");
        this.gameTitle = loadImage("assets/images/gameTitle.png");
        this.buttonClickedSound = loadSound("../assets/soundeffects/buttonClick.mp3");
        this.backgroundMusic = loadSound("../assets/music/backgroundMusic.mp3");

       

        this.dinoStroids = dinoStroids;
        console.log("MainMenu created");

        this.aboutBtn = new Button("ABOUT", createVector(width * 0.5, height * 0.40));
        this.howToPlayBtn = new Button("HOW TO PLAY", createVector(width * 0.5, height * 0.50));
        this.scoreBoardBtn = new Button("SCOREBOARD", createVector(width * 0.5, height * 0.60));
        this.musicOnOffBtn = new Button("MUSIC ON", createVector(width * 0.5, height * 0.70));
        this.isMusicPlaying = false;
        this.startGameBtn = new Button("START GAME", createVector(width * 0.5, height * 0.80), 200, 40, "green");
    }

    public update(): void {
        if (this.aboutBtn.isClicked()) {
            this.buttonClickedSound.play();
            this.dinoStroids.changeActiveScene(new AboutPopup(this.dinoStroids));
        }

        if (this.howToPlayBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new HowToPlayPopup(this.dinoStroids));
        }

        if (this.scoreBoardBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new ScoreBoardPopup(this.dinoStroids));
        }

        if (this.startGameBtn.isClicked()) {
            soundeffects.buttonClick.play();
            this.dinoStroids.changeActiveScene(new InputNamePopup(this.dinoStroids));
        }
        if (this.musicOnOffBtn.isClicked()) {
            this.shiftMusicOnOff();
        }
    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        // Larger grey box
        fill("lightgrey");
        rect(width * 0.25, height * 0.15, width * 0.5, height * 0.7);

        imageMode(CENTER);
        image(this.gameTitle, width / 2, height * 0.17, 566, 275);

        push();
        textAlign(CENTER, CENTER);
        textSize(35);
        textFont("Pixelify Sans", width * 0.04);
        fill("black");
        text("DINOSTROIDS", width / 2, height * 0.25);
        pop();


        // Draw buttons
        this.aboutBtn.draw();
        this.howToPlayBtn.draw();
        this.scoreBoardBtn.draw();
        this.musicOnOffBtn.draw();
        this.musicOnOffBtn.draw();
        this.startGameBtn.draw();
    }
    private shiftMusicOnOff(): void {
        if (this.isMusicPlaying) {
            this.backgroundMusic.pause();
            //this.musicOnOffBtn.setLabel("MUSIC ON"); //Uppdatera knappens text
        } else {
            this.backgroundMusic.loop(); //Loopa musiken
            //this.musicOnOffBtn.setLabel("MUSIC OFF"); //Uppdatera knappens text
        }

        //Växlar musiken
        if (this.isMusicPlaying) {
            this.isMusicPlaying = false;
        } else {
            this.isMusicPlaying = true;
        }
    }

}