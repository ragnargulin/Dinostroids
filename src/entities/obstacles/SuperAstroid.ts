class SuperAstro extends MoveableObject {
  private spawnTimer: number;
  public hitsLeft: number;

  constructor() {
    super(random(width), -100, 100, 200, 0, 3, imageAssets.superAstro);
    this.spawnTimer = random(5000, 10000); // Spawn-intervall
    this.hitsLeft = 5;
  }

  public updateSpawnTimer(deltaTime: number): boolean {
    this.spawnTimer -= deltaTime;
    if (this.spawnTimer <= 0) {
      this.spawnTimer = random(5000, 10000);
      return true;
    }
    return false;
  }

  public takeDamage(): boolean {
    this.hitsLeft--;
    return this.hitsLeft <= 0;
  }

  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }
}
