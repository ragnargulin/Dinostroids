interface Hitbox {
  position: p5.Vector;
  size: p5.Vector;
}

class MoveableObject {
  public position: p5.Vector;
  protected size: p5.Vector;
  protected image: p5.Image;
  private hitbox: Hitbox;
  protected velocity: p5.Vector;
  public setVelocity(x: number, y: number) {
    this.velocity = createVector(x, y);
}
  public isOffCanvas(): boolean {
    return this.position.y < -100 || this.position.y > height;
  }

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    velocityX: number,
    velocityY: number,
    image: p5.Image,
    hitbox?: Hitbox
  ) {
    this.position = createVector(x, y);
    this.size = createVector(width, height);
    this.velocity = createVector(velocityX, velocityY);
    this.image = image;
    this.hitbox = hitbox || {
      position: createVector(0,0),
      size: this.size
    }
  }


  public update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
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

  public collidesWith(other: MoveableObject): boolean {
    const pos = p5.Vector.add(this.position, this.hitbox.position)
    const otherPos = p5.Vector.add(other.position, other.hitbox.position)
    const left = pos.x;
    const right = pos.x + this.hitbox.size.x;
    const top = pos.y;
    const bottom = pos.y + this.hitbox.size.y;

    const otherLeft = otherPos.x;
    const otherRight = otherPos.x + other.hitbox.size.x;
    const otherTop = otherPos.y;
    const otherBottom = otherPos.y + other.hitbox.size.y;

    // Check if bounding boxes overlap
    return !(
      right < otherLeft ||
      left > otherRight ||
      bottom < otherTop ||
      top > otherBottom
    );
  }
}
