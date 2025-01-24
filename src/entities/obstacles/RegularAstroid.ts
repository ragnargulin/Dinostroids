class RegularAsteroid extends MoveableObject {
  constructor() {
    super(random(width), -95, 60, 95, 0, 3, imageAssets.astro);
  }

  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }
}
