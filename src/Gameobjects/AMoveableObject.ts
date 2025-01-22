class GameObject {
  public position: p5.Vector;
  public size: p5.Vector;
  public image: p5.Image;
  public velocity: p5.Vector;

  // x, y, width, height
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    velocityX: number,
    velocityY: number,
    image: p5.Image
  ) {
    this.position = createVector(x, y);
    this.size = createVector(width, height);
    this.velocity = createVector(velocityX, velocityY);
    this.image = image;
  }

  public update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // this.position.add(this.velocity);
  }
  

  public draw() {
    push();
    image(
      this.image,
      this.position.x,
      this.position.y,
      this.size.x,
      this.size.y
    );
    pop();
  }

  public isOffCanvas(): boolean {
    return this.position.y <- 100 || this.position.y > height;
  }

  public collidesWith(other: GameObject): boolean {
    const left = this.position.x;
    const right = this.position.x + this.size.x;
    const top = this.position.y;
    const bottom = this.position.y + this.size.y;

    const otherLeft = other.position.x;
    const otherRight = other.position.x + other.size.x;
    const otherTop = other.position.y;
    const otherBottom = other.position.y + other.size.y;

    // Check if bounding boxes overlap
    return !(right < otherLeft || left > otherRight || bottom < otherTop || top > otherBottom);
  }

}
