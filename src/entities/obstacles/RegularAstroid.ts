class RegularAsteroid extends MoveableObject {
  private spawnTimer: number;

  constructor(inheritedSpeed?: number) {
    const speed = inheritedSpeed ?? random(2, 4);
    super(random(width), -50, 50, 90, 0, speed, imageAssets.astro, {
      position: createVector(0,45),
      size: createVector(50,45)
    });
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