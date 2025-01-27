class SuperLaser extends MoveableObject {
    constructor() {
      super(random(width), -80, 40, 80, 0, 3, imageAssets.superLaser);
    }
  
    public isOffCanvas(): boolean {
      return this.position.y < -100 || this.position.y > height;
    }
  }
  