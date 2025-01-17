class MainMenu implements IScene {
    // private startGameButton: Button;
    // private aboutButton: Button;
    // private howToPlayButton: Button;
    // private scoreboardButton: Button;
    private menuBackground: p5.Image;

    constructor() {
        this.menuBackground = loadImage("./assets/images/menuBackground.jpg");
        console.log('MainMenu created');

    }

    update(): void {
        // Implement logic for updating the MainMenu scene.
        console.log('MainMenu updating...');
    }

    draw(): void {
        // Implement logic for rendering the MainMenu scene.
        image(this.menuBackground,0,0,width,height);
        // createButton('About').position(19, 19);
        // createButton('How to play').position(19, 40);
        // createButton('Scoreboard').position(19, 60);
        // createButton('Start game').position(19, 80);
    }
}