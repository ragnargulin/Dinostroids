class Laser extends GameObject {
    constructor(x: number, y: number, image: p5.Image) {
      super(x, y, 20, 40, 0, -10, image); // Moves upwards
    }
  
    // No need to update the position other than moving upwards, the base class handles that
  }
  