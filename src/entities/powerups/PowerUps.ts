class PowerUp extends MoveableObject {
    //private powerupType: string;         //Typ av PowerUp
    private heartSpawnTimer: number;
    private isPowerupActive: boolean;      //Om PowerUpen är aktiv
    private isSoundPlaying: boolean;

    //private heartImage: p5.Image;
    private hearts: Heart[] = [];

    constructor(
        //powerupType: string,
        x: number,
        y: number,
        width: number,
        height: number,
        velocityX: number,
        velocityY: number,
        image: p5.Image
    ) {
        //this.powerupType = powerupType;
        super(x, y, width, height, velocityX, velocityY, image);
        this.isPowerupActive = false; //powerupen inaktiv tills spelaren aktiverar den
        this.isSoundPlaying = false;
        this.heartSpawnTimer = 0;
        //this.heartImage = imageAssets.hearts;
    }

    public update(): void {
        if (!this.isPowerupActive) {
            super.update(); //super anges för att kunna uppdaterar positionen via MoveableObject
        }
        if (this.position.y > height) { //gör powerupen inaktiv om den lämnar skärmen
            this.deactivate();
        }
        this.spawnHeart();
    }

    private spawnHeart() {
        if (this.heartSpawnTimer <= 0) {
            //this.PowerUp.push(new hearts());
            //this.heartImage = imageAssets.hearts;
            const newHeart = new Heart(random(width), -50, 200, 200, 0, random(3, 5), imageAssets.hearts);
            this.hearts.push(newHeart);
            this.heartSpawnTimer = 400;
        }

        this.heartSpawnTimer -= deltaTime
    }

    public draw(): void {
        if (!this.isPowerupActive) {
            super.draw(); //samma här, super angivit för att använda MoveableObjects draw metod
        }
    }

    public activate(): void {
        this.isPowerupActive = true;
        this.playSound();       //aktivering av powerupen och ljudeffekt
    }

    // Deaktiverar PowerUp
    public deactivate(): void { //inaktivera powerupen
        this.isPowerupActive = false;
    }

    public isActive(): boolean { //kolla om powerupen är aktiv
        return this.isPowerupActive;
    }

    private playSound(): void {
        if (!this.isSoundPlaying) { //Ljudeffekt ska spelas när powerupen aktiveras, != Om ljudet inte spelas, kör koden i if-satsen
            soundeffects.powerupSound.play();
            this.isSoundPlaying = true;
        }
    }
}
