class PowerUp extends MoveableObject {
    private type: string;         //Typ av PowerUp
    private active: boolean;      //Om PowerUpen är aktiv
    private isSoundPlaying: boolean;

    constructor(
        type: string,
        x: number,
        y: number,
        width: number,
        height: number,
        velocityX: number,
        velocityY: number,
        image: p5.Image
    ) {
        super(x, y, width, height, velocityX, velocityY, image);
        this.type = type;
        this.active = false;      //Powerupen inaktiv tills spelaren aktiverar den
        this.isSoundPlaying = false;
    }

}