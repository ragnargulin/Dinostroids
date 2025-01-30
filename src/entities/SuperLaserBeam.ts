class SuperLaserBeam extends MoveableObject {
    private player: Player;

    constructor(x: number, y: number, image: p5.Image, player: Player) {
        super(x, y, 84, 650, 0, 0, image); 
        this.player = player;
    }  

    public update() {
        // Follow the player's horizontal position
        this.position.x = this.player.position.x + 
            (this.player.isFacingRight ? 53 : -17);
        this.position.y = -10;
    }

 
}