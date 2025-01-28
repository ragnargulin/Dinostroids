class BigAsteroid extends MoveableObject {
  private spawnTimer: number;
  private speed: number;

  constructor() {
      const speed = random(2, 3); // Random speed for big asteroid
      super(random(width), -75, 75, 150, 0, speed, imageAssets.bigAstro);
      this.spawnTimer = random(3000, 7000);
      this.speed = speed; // Store the speed for inheritance to small asteroids
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
    const asteroid1 = new RegularAsteroid(this.speed);
    const asteroid2 = new RegularAsteroid(this.speed);

    // Set positions
    asteroid1.position = createVector(this.position.x - 10, this.position.y);
    asteroid2.position = createVector(this.position.x + 40, this.position.y);

    const horizontalSpread = 2;
    
    // Use setVelocity instead of direct velocity assignment
    asteroid1.setVelocity(-horizontalSpread, this.speed);
    asteroid2.setVelocity(horizontalSpread, this.speed);

    return [asteroid1, asteroid2];
}
}
