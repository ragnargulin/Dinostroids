class SuperAstro extends MoveableObject {
  public hitsLeft: number = 5;

  constructor(localScore: number = 0) {
    const baseSpeed = 3;
    const speedIncrease = localScore * 0.001;  // Här justeras hur mkt hastigheten ökas i relation till score
    const finalSpeed = baseSpeed + speedIncrease;
    super(random(width), -100, 100, 200, 0, finalSpeed, imageAssets.superAstro, {
      position: createVector(10,90),
      size: createVector(80,100)
    });

    this.hitsLeft = 5;
  }

  public takeDamage(): boolean {
    this.hitsLeft--;
    return this.hitsLeft <= 0;
  }

  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }
}
