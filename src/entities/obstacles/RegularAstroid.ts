class RegularAsteroid extends MoveableObject {

  constructor(localScore: number = 0) {
    // Calculate speed based on localScore
    const baseSpeed = random(2, 4);
    const speedIncrease = localScore * 0.004; // Här justeras hur mkt hastigheten ökas i relation till score
    const finalSpeed = baseSpeed + speedIncrease;
    
    super(random(width), -50, 50, 90, 0, finalSpeed, imageAssets.astro, {
      position: createVector(5,42),
      size: createVector(40,45)
    });
  }

  public isOffCanvas(): boolean {
      return this.position.y < -100 || this.position.y > height;
  }
}