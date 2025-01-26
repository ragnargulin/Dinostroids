class BigAsteroid extends MoveableObject {
  constructor() {
    super(random(width), -75, 75, 75, 0, 3, imageAssets.bigAstro);
  }

  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }

  public split(): RegularAsteroid[] {
    const asteroid1 = new RegularAsteroid();
    const asteroid2 = new RegularAsteroid();

    // New astroids position
    asteroid1.position = createVector(this.position.x - 10, this.position.y);
    asteroid2.position = createVector(this.position.x + 40, this.position.y);

    return [asteroid1, asteroid2];
  }
}
