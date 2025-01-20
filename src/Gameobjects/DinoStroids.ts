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
    
        this.spawnAstro();
    }

    private spawnAstro() {
      if (this.astroSpawnTimer <= 0) {
        this.gameObjects.push(new Astro());
        this.astroSpawnTimer = 400;
      }
  
      this.astroSpawnTimer -= deltaTime;

      if (this.astroSpawnTimer <= 0) {
        this.gameObjects.push(new bigAstro());
        this.astroSpawnTimer = 800;
      }
  
      this.astroSpawnTimer -= deltaTime;

      if (this.astroSpawnTimer <= 0) {
        this.gameObjects.push(new superAstroid());
        this.astroSpawnTimer = 1500;
      }
  
      this.astroSpawnTimer -= deltaTime;
    }

    public draw() {
      imageMode(CORNER);
      image(images.background, 0, 0, width, height);

      for (const gameObject of this.gameObjects) {
          gameObject.draw();
        }
    }

    
}
