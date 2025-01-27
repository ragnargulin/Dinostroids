class RegularAsteroid extends MoveableObject {
  private spawnTimer: number;

  constructor() {
    super(random(width), -100, 50, 90, 0, 3, imageAssets.astro);
    this.spawnTimer = random(2000, 5000);
  }

  public updateSpawnTimer(deltaTime: number): boolean {
    this.spawnTimer -= deltaTime;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = random(2000, 5000);
      return true;
    }
    return false;
  }

  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }
}
