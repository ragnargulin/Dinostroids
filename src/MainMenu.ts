class MainMenu implements IScene {
    private buttons: Button[] = [];
    private background: p5.Image;

    constructor() {
        console.log('MainMenu created');
        this.buttons.push(
            new Button('ABOUT', createVector(width * 0.5, height * 0.40), () => console.log('About selected')),
            new Button('HOW TO PLAY',  createVector(width * 0.5, height * 0.48), () => console.log('How to Play selected')),
            new Button('SCOREBOARD', createVector(width * 0.5, height * 0.56), () => console.log('Scoreboard selected')),
            new Button('START GAME', createVector(width * 0.5, height * 0.64), () => console.log('Game started'))
        );

        // this.background = loadImage('../assets/images/background.png');
        this.background = loadImage('../assets/images/mainBackground.jpg');


    }
    
    public update(): void {}
    
    public draw(): void {
        image(this.background, 0, 0, width, height);
        imageMode(CORNER);
        // CSS
        fill("lightgrey");
        // HTML
        rect(width * 0.25 , height * 0.25 , width * 0.5, height * 0.5)

        for(const button of this.buttons) {
            button.draw();
        }
    }  
}