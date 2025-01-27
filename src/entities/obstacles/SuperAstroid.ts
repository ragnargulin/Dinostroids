class SuperAsteroid extends MoveableObject {
    constructor() {
      super(random(width), -150, 100, 150, 0, 3, imageAssets.superAstro);
    }
  
    public isOffCanvas(): boolean {
      return this.position.y < -100 || this.position.y > height;
    }
  }
  