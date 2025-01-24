class Sheild extends MoveableObject {
    constructor() {
      super(random(width), -50, 30, 55, 0, 3, imageAssets.sheild);
    }
  
    public isOffCanvas(): boolean {
      return this.position.y < -100 || this.position.y > height;
    }
  }
  