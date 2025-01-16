class MainMenu implements IScene {
    constructor() {
        console.log('MainMenu created');
    }

    update(): void {
        // Implement logic for updating the MainMenu scene.
        console.log('MainMenu updating...');
    }

    draw(): void {
        // Implement logic for rendering the MainMenu scene.
        background('pink');
        createButton('About').position(19, 19);
        createButton('How to play').position(19, 40);
        createButton('Scoreboard').position(19, 60);
        createButton('Start game').position(19, 80);
    }
}