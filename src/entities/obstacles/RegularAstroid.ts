class RegularAsteroid extends MoveableObject {
  private spawnTimer: number;

  constructor(localScore: number = 0) {
    // Calculate speed based on localScore
    const baseSpeed = random(2, 4);
    const speedIncrease = localScore * 0.002; 
    const finalSpeed = baseSpeed + speedIncrease;
    
    super(random(width), -50, 50, 90, 0, finalSpeed, imageAssets.astro);
    
    // Decrease spawn time based on localScore
    const baseSpawnTime = random(2000, 5000);
    const spawnTimeReduction = Math.floor(localScore / 200) * 300; // Reduce spawn time every 200 points
    this.spawnTimer = Math.max(baseSpawnTime - spawnTimeReduction, 1000); // Minimum spawn time of 1000
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