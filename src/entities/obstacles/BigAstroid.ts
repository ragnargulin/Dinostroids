class BigAsteroid extends MoveableObject {
    private speed: number;
  
    constructor(localScore: number = 0) {
      const baseSpeed = random(2, 3);
      const speedIncrease = localScore * 0.002; // Här justeras hur mkt hastigheten ökas i relation till score
      const finalSpeed = baseSpeed + speedIncrease;
      
      super(random(width), -75, 75, 150, 0, finalSpeed, imageAssets.bigAstro,{
        position: createVector(5,70),
        size: createVector(65,75)
      });
    
      this.speed = finalSpeed;
    }
  
  
    public split(): RegularAsteroid[] {
      // Pass the current speed to the small asteroids
      const asteroid1 = new RegularAsteroid(this.speed); 
      const asteroid2 = new RegularAsteroid(this.speed);
  
      // Set positions
      asteroid1.position = createVector(this.position.x - 10, this.position.y);
      asteroid2.position = createVector(this.position.x + 40, this.position.y);
  
      const horizontalSpread = 2;
      
      asteroid1.setVelocity(-horizontalSpread, this.speed);
      asteroid2.setVelocity(horizontalSpread, this.speed);
  
      return [asteroid1, asteroid2];
    }
  }