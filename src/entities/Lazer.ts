class Laser extends MoveableObject {
    constructor(x: number, y: number, image: p5.Image) {
      super(x, y, 20, 60, 0, -10, image); 
    }  

    public isOffCanvas(): boolean {
      return this.position.y < -150 || this.position.y > height;
    }
}