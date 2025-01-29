class RegularAsteroid extends MoveableObject {
  private spawnTimer: number;

  constructor(localScore: number = 0) {
    // Calculate speed based on localScore
    const baseSpeed = random(2, 4);
    const speedIncrease = localScore * 0.004; // Här justeras hur mkt hastigheten ökas i relation till score
    const finalSpeed = baseSpeed + speedIncrease;
    
    super(random(width), -50, 50, 90, 0, finalSpeed, imageAssets.astro);
    
    const baseSpawnTime = random(3000, 7000);
    const spawnTimeReduction = localScore * 4000; // Justera spawn time baserat på score
    this.spawnTimer = baseSpawnTime - spawnTimeReduction; // Justera spawntime baserat på score
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