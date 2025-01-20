class Player extends GameObject {
    
    constructor() {
      super(width * 0.5, height - 120, 100, 120, 0, 0, images.player);
    }
  
    public update() {
      super.update();
  
      if (keyIsDown(LEFT_ARROW)) {
        this.velocity.x = -5;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.velocity.x = 5;
      } else {
        this.velocity.x = 0;
      }
    }
  }
  