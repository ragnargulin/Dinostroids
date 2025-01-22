class Game {
  private gameObjects: GameObject[];
  private astroSpawnTimer: number;

  constructor() {
    this.gameObjects = [new Player()];
    this.astroSpawnTimer = 0;
  }

  public update() {
    for (const gameObject of this.gameObjects) {
      gameObject.update();
    }

    this.gameObjects = this.gameObjects.filter((gameObject) => {
      if (gameObject.isOffCanvas()) {
        return false; // Remove the object from the array
      }
      return true; // Keep the object in the array
    });
    this.checkCollisions();

    this.spawnAstro();
  }

  public draw() {
    imageMode(CORNER);
    image(images.background, 0, 0, width, height);

    for (const gameObject of this.gameObjects) {
      gameObject.draw();
    }
  }

  
  public addGameObject(gameObject: GameObject) {
    this.gameObjects.push(gameObject);
  }

  private spawnAstro() {
    if (this.astroSpawnTimer <= 0) {
      this.gameObjects.push(new Astro());
      this.astroSpawnTimer = 400;
    }

    this.astroSpawnTimer -= deltaTime;

    if (this.astroSpawnTimer <= 0) {
      this.gameObjects.push(new bigAstro());
      this.astroSpawnTimer = 1800;
    }

    this.astroSpawnTimer -= deltaTime;

    if (this.astroSpawnTimer <= 0) {
      this.gameObjects.push(new superAstroid());
      this.astroSpawnTimer = 1500;
    }

    this.astroSpawnTimer -= deltaTime;
  }

  private checkCollisions() {
    // Check collisions between player and asteroids
    const player = this.gameObjects.find(obj => obj instanceof Player) as Player;
    if (!player) return;

    for (const obj of this.gameObjects) {
      if (obj instanceof bigAstro || obj instanceof superAstroid || obj instanceof Astro) {
        // Player collides with asteroids
        if (player.collidesWith(obj)) {
          console.log('Player collided with asteroid!');
          // Handle player collision (e.g., decrease life, game over, etc.)
        }
        
      }
    }
    for (const obj of this.gameObjects) {
      if (obj instanceof Laser) {
        for (const asteroid of this.gameObjects) {
          if (asteroid instanceof bigAstro || asteroid instanceof superAstroid || asteroid instanceof Astro) {
            // Logga kollisionspositioner
  
            if (obj.collidesWith(asteroid)) {
              console.log('Laser hit an asteroid!');
              // Ta bort laser och asteroid från spelet
              this.removeGameObject(obj);
              this.removeGameObject(asteroid);
              // Hantera poäng eller annan spel-logik här
            }
          }
        }
      }
    }
  }

  private removeGameObject(gameObject: GameObject) {
    const index = this.gameObjects.indexOf(gameObject);
    if (index !== -1) {
      this.gameObjects.splice(index, 1);
    }
  }
}
