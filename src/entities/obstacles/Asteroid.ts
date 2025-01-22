class Asteroid extends MoveableObject {
  public health: number;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    velocityX: number,
    velocityY: number,
    image: p5.Image,
    health: number
  ) {
    super(x, y, width, height, velocityX, velocityY, image);
    this.health = health;
  }

  public isOffCanvas(): boolean {
    return this.position.y <- 100 || this.position.y > height;
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
    console.log(`Asteroid health: ${this.health}`);
  }
}