class MainMenu implements IScene {
  private backgroundImage: p5.Image;
  private logoSign: p5.Image;
  private logoDino: p5.Image;
  private aboutBtn: Button;
  private howToPlayBtn: Button;
  private dinoStroids: IChangeableScene;
  private scoreBoardBtn: Button;
  private startGameBtn: Button;
  private musicOnOffBtn: Button;
  private buttonClickedSound: p5.SoundFile;

  constructor(dinoStroids: IChangeableScene) {
    this.dinoStroids = dinoStroids;
    this.backgroundImage = imageAssets.background;
    this.logoSign = imageAssets.logoSign;
    this.logoDino = imageAssets.logoDino;
    this.buttonClickedSound = soundeffects.buttonClick;

    console.log("MainMenu created");
    this.aboutBtn = new Button(
      "ABOUT",
      createVector(width * 0.5, height * 0.38)
    );
    (this.howToPlayBtn = new Button(
      "HOW TO PLAY",
      createVector(width * 0.5, height * 0.48)
    )),
      (this.scoreBoardBtn = new Button(
        "SCOREBOARD",
        createVector(width * 0.5, height * 0.58)
      )),
      this.musicOnOffBtn = new Button("MUSIC ON", createVector(width * 0.5, height * 0.68));

    this.startGameBtn = new Button(
      "START GAME",
      createVector(width * 0.5, height * 0.8),
      250,
      60,
      "green"
    );
  }

  public update(): void {
    if (this.aboutBtn.isClicked()) {
      console.log("aboutBtn");
      this.buttonClickedSound.play();
      this.dinoStroids.changeActiveScene(new AboutPopup(this.dinoStroids));
    }
    if (this.howToPlayBtn.isClicked()) {
      this.buttonClickedSound.play();
      this.dinoStroids.changeActiveScene(new HowToPlayPopup(this.dinoStroids));
    }
    if (this.scoreBoardBtn.isClicked()) {
      this.buttonClickedSound.play();
      this.dinoStroids.changeActiveScene(new ScoreBoardPopup(this.dinoStroids));
    }
    if (this.startGameBtn.isClicked()) {
      this.buttonClickedSound.play();

      this.dinoStroids.changeActiveScene(new InputNamePopup(this.dinoStroids));
    }
    if (this.musicOnOffBtn.isClicked()) {
      this.buttonClickedSound.play();
      this.shiftMusicOnOff();
    }
    if (this.dinoStroids.isMusicPlaying) {
      this.musicOnOffBtn.setLabel("MUSIC OFF");
    } else {
      this.musicOnOffBtn.setLabel("MUSIC ON");
    }
  }

  public draw(): void {
    imageMode(CORNER);
    image(this.backgroundImage, 0, 0, width, height);

    push();
    stroke("#3b3b3b"); 
    strokeWeight(8); // Thicker outline
    fill("lightgrey");
    // HTML
    rect(width * 0.3, height * 0.15, width * 0.4, height * 0.75);
    pop();

    imageMode(CENTER);
    image(this.logoDino, width / 5, height * 0.94, 320, 320);
    image(this.logoSign, width / 2, height * 0.47, 500, 500);

    textAlign(CENTER, CENTER);
    textSize(35);
    textFont("Pixelify Sans", width * 0.06);
    fill("black");
    text("DINOSTROIDS", width / 2, height * 0.22);

    this.aboutBtn.draw();
    this.howToPlayBtn.draw();
    this.scoreBoardBtn.draw();
    this.startGameBtn.draw();
    this.musicOnOffBtn.draw();
  }

  //checks so the music isnt trying to restart if its already been started
  private shiftMusicOnOff(): void {
    // Toggle music using DinoStroids method
    this.dinoStroids.toggleMusic();

    // Update button text
    if (this.dinoStroids.isMusicPlaying) {
      this.musicOnOffBtn.setLabel("MUSIC OFF");
    } else {
      this.musicOnOffBtn.setLabel("MUSIC ON");
    }
}
}
