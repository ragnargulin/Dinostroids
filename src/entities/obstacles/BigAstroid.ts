class BigAsteroid extends MoveableObject {
  private spawnTimer: number;

  constructor() {
    super(random(width), -75, 75, 75, 0, 3, imageAssets.bigAstro);
    this.spawnTimer = random(3000, 7000);
  }

  public updateSpawnTimer(deltaTime: number): boolean {
    this.spawnTimer -= deltaTime;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = random(3000, 7000);

      return true;
    }
    return false;
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
