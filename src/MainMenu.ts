class MainMenu implements IScene {
    private aboutBtn: Button;
    private howToPlayBtn: Button;
    private dinoStroids: IChangeableScene;
    private scoreBoardBtn: Button;
    private startGameBtn: Button;

    constructor(dinoStroids: IChangeableScene) {
        this.dinoStroids = dinoStroids;
        console.log('MainMenu created');
        this.aboutBtn = new Button('ABOUT', createVector(width * 0.5, height * 0.45)),
        this.howToPlayBtn = new Button('HOW TO PLAY',  createVector(width * 0.5, height * 0.50)),
        this.scoreBoardBtn = new Button('SCOREBOARD', createVector(width * 0.5, height * 0.55)),
        this.startGameBtn = new Button('START GAME', createVector(width * 0.5, height * 0.60))
    }
    
    public update(): void {
        if (this.aboutBtn.isClicked()) {
            // soundeffects.buttonClick.play()
            this.dinoStroids.changeActiveScene(new AboutPopup(this.dinoStroids))
        }
        if (this.howToPlayBtn.isClicked()) {
            // soundeffects.buttonClick.play()
            this.dinoStroids.changeActiveScene(new HowToPlayPopup(this.dinoStroids))
        }
        if (this.scoreBoardBtn.isClicked()) {
            // soundeffects.buttonClick.play()
            this.dinoStroids.changeActiveScene(new ScoreBoardPopup(this.dinoStroids))
        }
        if (this.startGameBtn.isClicked()) {
            // soundeffects.buttonClick.play()
            this.dinoStroids.changeActiveScene(new GameBoard(this.dinoStroids))
        } 
    }
    
    public draw(): void {
        // CSS
        fill("grey");

        // HTML
        rect(width * 0.25 , height * 0.25 , width * 0.5, height * 0.5)

        this.aboutBtn.draw();
        this.howToPlayBtn.draw();
        this.scoreBoardBtn.draw();
        this.startGameBtn.draw();
    }  
}