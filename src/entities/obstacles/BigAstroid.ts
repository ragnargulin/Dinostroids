class BigAsteroid extends MoveableObject {
    private spawnTimer: number;
    private speed: number;
  
    constructor(localScore: number = 0) {
      const baseSpeed = random(2, 3);
      const speedIncrease = localScore * 0.002; // Här justeras hur mkt hastigheten ökas i relation till score
      const finalSpeed = baseSpeed + speedIncrease;
      
      super(random(width), -75, 75, 150, 0, finalSpeed, imageAssets.bigAstro);
      
      // Decrease spawn time based on localScore
      const baseSpawnTime = random(3000, 7000);
      const spawnTimeReduction = localScore * 4000; // Justera spawn time baserat på score
      this.spawnTimer = baseSpawnTime - spawnTimeReduction; // Justera spawntime baserat på score
      
      this.speed = finalSpeed;
    }
  
    public updateSpawnTimer(deltaTime: number): boolean {
      this.spawnTimer -= deltaTime;
      if (this.spawnTimer <= 0) {
        const baseSpawnTime = random(3000, 7000);
        this.spawnTimer = baseSpawnTime;
        return true;
      }
      return false;
    }
  
    public split(): RegularAsteroid[] {
      // Pass the current speed to the small asteroids
      const asteroid1 = new RegularAsteroid(0, this.speed); 
      const asteroid2 = new RegularAsteroid(0, this.speed);
  
      // Set positions
      asteroid1.position = createVector(this.position.x - 10, this.position.y);
      asteroid2.position = createVector(this.position.x + 40, this.position.y);
  
      const horizontalSpread = 2;
      
      asteroid1.setVelocity(-horizontalSpread, this.speed);
      asteroid2.setVelocity(horizontalSpread, this.speed);
  
      return [asteroid1, asteroid2];
    }
  }