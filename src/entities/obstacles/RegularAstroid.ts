class RegularAsteroid extends MoveableObject {
  constructor() {
    super(random(width), -50, 50, 50, 0, 3, imageAssets.astro);
  }

  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }
}
