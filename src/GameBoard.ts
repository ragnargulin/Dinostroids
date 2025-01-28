class GameBoard implements IScene {
    private dinoStroids: IChangeableScene;
    private memory: GameMemory;

    private localScore: number = 0;
    private secondTicker: number = 0;
    private lives: number = 5;

    private backgroundImage: p5.Image;
    private heartImage: p5.Image;
    private explosionImage: p5.Image;
    private explosions: { position: p5.Vector, frameCount: number }[] = [];

    private menuButton: Button;

    private powerSpawnTimer: number;

    private astroSpawnTimer: number;

    private moveableObjects: MoveableObject[];

    constructor(dinoStroids: IChangeableScene) {
        this.dinoStroids = dinoStroids;
        this.memory = this.dinoStroids.getMemory();

        this.backgroundImage = imageAssets.background;
        this.heartImage = imageAssets.hearts;
        this.explosionImage = imageAssets.explosion;

        this.menuButton = new Button(
            "| |",
            createVector(width * 0.1, height * 0.06),
            40,
            40,
            "maroon"
        );

        this.moveableObjects = [new Player(this)];
        this.explosions = [];
        this.astroSpawnTimer = 0;
        this.powerSpawnTimer = 0;
    }

    public update(): void {
        this.spawnAstro();

        this.secondTicker++;

        if (this.secondTicker >= 60) {

            this.localScore++;
            this.secondTicker = 0;
        }

        if (this.menuButton.isClicked()) {
            console.log("Menu button => pause game)");
            this.memory.playerScore = this.localScore;
            this.dinoStroids.changeActiveScene(
                new InGameMenuPopup(this.dinoStroids, this)
            );
        }

        for (const gameObject of this.moveableObjects) {
            gameObject.update();
        }

        // Update explosions and remove finished ones
        this.explosions = this.explosions.filter(explosion => {
            explosion.frameCount++;
            return explosion.frameCount < 30; // Adjust based on your gif length
        });
    }

    public draw(): void {
        imageMode(CORNER);
        image(this.backgroundImage, 0, 0, width, height);

        for (const gameObject of this.moveableObjects) {
            gameObject.draw();
        }

        // Draw explosions
        for (const explosion of this.explosions) {
            image(
                this.explosionImage,
                explosion.position.x - 15, // Center the explosion
                explosion.position.y + 30,
                100, // width of explosion
                100  // height of explosion
            );
        }

        this.menuButton.draw();
        this.drawPlayerInfo();
        this.drawLives();
        this.PowerSpawnTimer();
        this.spawnAstro();
        this.checkCollisions();
    }

    private PowerSpawnTimer() {
        if (this.powerSpawnTimer <= 0) {
            const index = floor(random(0, 3));
            const powerUps = [new Heart(), new Sheild(), new SuperLaser()];
            this.moveableObjects.push(powerUps[index]);
            this.powerSpawnTimer = 10000;
        }

        this.powerSpawnTimer -= deltaTime;

        this.moveableObjects = this.moveableObjects.filter((gameObject) => {
            return !gameObject.isOffCanvas();
        });
    }

    private spawnAstro() {
        if (this.astroSpawnTimer <= 0) {
            const index = floor(random(0, 3)); // Uppdaterat för 3 alternativ
            if (index === 0) {
                this.moveableObjects.push(new RegularAsteroid());
            } else if (index === 1) {
                this.moveableObjects.push(new BigAsteroid());
            } else {
                this.moveableObjects.push(new SuperAstro()); // Lägg till SuperAstro
            }
            this.astroSpawnTimer = random(2000, 5000);
        }

        this.astroSpawnTimer -= deltaTime;
    }

    public addGameObject(SomeMoveableObjects: MoveableObject) {
        this.moveableObjects.push(SomeMoveableObjects);
    }

    private drawPlayerInfo(): void {
        push();
        fill("white");
        textAlign(CENTER, TOP);
        textFont("Pixelify Sans", 24);
        textStyle(BOLD);

        const playerInfoX = width * 0.5;
        const playerInfoY = height * 0.03;

        text(
            `${this.memory.playerName} | Score: ${this.localScore}`,
            playerInfoX,
            playerInfoY
        );
        pop();
    }

    private drawLives(): void {
        push();
        imageMode(CORNER);

        const heartWidth = 35;
        const heartHeight = 30;
        const spacing = 5;

        let heartPositionX = width * 0.9;
        let heartPositionY = height * 0.02;

        for (let i = 0; i < this.lives; i++) {
            image(
                this.heartImage,
                heartPositionX - i * (heartWidth + spacing),
                heartPositionY,
                heartWidth,
                heartHeight
            );
        }
        pop();
    }

    private checkCollisions() {

        const player = this.moveableObjects.find(
            (obj) => obj instanceof Player
        ) as Player;
        if (!player) return;

        for (const obj of this.moveableObjects) {
            if (obj instanceof RegularAsteroid || obj instanceof BigAsteroid) {
                if (player.collidesWith(obj)) {
                    console.log("Player collided with asteroid!");
                    this.removeGameObject(obj);
                    this.lives -= 1;
                    if (this.lives == 0) {
                        this.memory.addScore(
                            this.memory.playerName,
                            this.memory.playerScore
                        );
                        this.dinoStroids.changeActiveScene(
                            new GameOverPopup(this.dinoStroids)
                        );
                    }
                    soundeffects.playerHit.play();
                }
            }
        }

        for (const obj of this.moveableObjects) {
            if (obj instanceof SuperAstro) {
                if (player.collidesWith(obj)) {
                    console.log("Player collided with asteroid!");
                    this.removeGameObject(obj);
                    this.lives -= 4;
                    if (this.lives <= 0) {
                        this.memory.addScore(this.memory.playerName, this.memory.playerScore);
                        this.dinoStroids.changeActiveScene(new GameOverPopup(this.dinoStroids));
                    }
                    soundeffects.playerHit.play();
                }
            }
        }

        for (const obj of this.moveableObjects) {
            if (obj instanceof Heart || obj instanceof Sheild) {
                if (player.collidesWith(obj)) {
                    console.log("Player picked up a heart");
                    this.removeGameObject(obj);
                    if (this.lives < 5) {
                        this.lives += 1;
                    }
                    else if (this.lives == 5) {
                        this.localScore += 10;
                    }
                }
            }
        }

        for (const laser of this.moveableObjects) {
            if (laser instanceof Laser) {
                for (const asteroid of this.moveableObjects) {
                    if (
                        asteroid instanceof RegularAsteroid ||
                        asteroid instanceof BigAsteroid ||
                        asteroid instanceof SuperAstro
                    ) {
                        if (laser.collidesWith(asteroid)) {
                            console.log("Laser hit an asteroid!");
                            this.removeGameObject(laser);

                            if (asteroid instanceof SuperAstro) {
                                if (asteroid.takeDamage()) {
                                    console.log("SuperAstro destroyed!");
                                    this.removeGameObject(asteroid);
                                } else {
                                    console.log(
                                        `SuperAstro hit! Hits left: ${asteroid.hitsLeft}`
                                    );
                                }
                            } else if (asteroid instanceof BigAsteroid) {
                                const newAsteroids = asteroid.split();
                                this.moveableObjects.push(...newAsteroids);
                                this.removeGameObject(asteroid);
                            } else {
                                this.removeGameObject(asteroid);
                            }
                            this.localScore += 5;
                            soundeffects.explosion?.play();
            
                            if (asteroid instanceof BigAsteroid) {
                                this.localScore += 10;
                                const newAsteroids = asteroid.split();
                                this.moveableObjects.push(...newAsteroids);

                            }
                            if (asteroid instanceof SuperAstro) {
                                this.localScore += 20;
                            }
                            this.explosions.push({
                                position: createVector(asteroid.position.x, asteroid.position.y),
                                frameCount: 0
                            });
                        }
                    }
                }
            }
        }
    }

    private removeGameObject(moveableObjects: MoveableObject) {
        const index = this.moveableObjects.indexOf(moveableObjects);
        if (index !== -1) {
            this.moveableObjects.splice(index, 1);
        }
    }
}