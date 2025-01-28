class SuperAstro extends MoveableObject {
  private spawnTimer: number;
  public hitsLeft: number = 5;

  constructor(localScore: number = 0) {
    const baseSpeed = 3;
    const speedIncrease = localScore * 0.001;  
    const finalSpeed = baseSpeed + speedIncrease;
    super(random(width), -100, 100, 200, 0, finalSpeed, imageAssets.superAstro);
    this.hitsLeft = 5;

    
    // Decrease spawn time based on localScore
    const baseSpawnTime = random(5000, 10000);
    const spawnTimeReduction = Math.floor(localScore / 300) * 500; // Reduce spawn time every 300 points
    this.spawnTimer = Math.max(baseSpawnTime - spawnTimeReduction, 3000); // Minimum spawn time of 3000
    
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
