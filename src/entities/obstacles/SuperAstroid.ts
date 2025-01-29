class SuperAstro extends MoveableObject {
  private spawnTimer: number;
  public hitsLeft: number = 5;

  constructor(localScore: number = 0) {
    const baseSpeed = 3;
    const speedIncrease = localScore * 0.001;  // Här justeras hur mkt hastigheten ökas i relation till score
    const finalSpeed = baseSpeed + speedIncrease;
    super(random(width), -100, 100, 200, 0, finalSpeed, imageAssets.superAstro);

    this.hitsLeft = 5;

    
    const baseSpawnTime = random(3000, 7000);
    const spawnTimeReduction = localScore * 4000; // Justera spawn time baserat på score
    this.spawnTimer = baseSpawnTime - spawnTimeReduction; // Justera spawntime baserat på score
    
  }

  public updateSpawnTimer(deltaTime: number): boolean {
    this.spawnTimer -= deltaTime;
    if (this.spawnTimer <= 0) {
      const baseSpawnTime = random(5000, 10000);
      this.spawnTimer = baseSpawnTime;
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
