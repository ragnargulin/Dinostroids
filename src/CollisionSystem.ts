class CollisionSystem {
    public checkCollisions(
        player: Player,
        moveableObjects: MoveableObject[],
        onCollision: {
            removeObject: (obj: MoveableObject) => void;
            addObject: (obj: MoveableObject) => void;
            decreaseLives: (amount: number) => void;
            increaseScore: (amount: number) => void;
            addExplosion: (position: p5.Vector) => void;
            handleGameOver: () => void;
        }
    ): void {
        this.checkPlayerCollisions(player, moveableObjects, onCollision);
        this.checkLaserCollisions(moveableObjects, onCollision);
    }

    private checkPlayerCollisions(
        player: Player,
        moveableObjects: MoveableObject[],
        onCollision: {
            removeObject: (obj: MoveableObject) => void;
            decreaseLives: (amount: number) => void;
            handleGameOver: () => void;
        }
    ): void {
        for (const obj of moveableObjects) {
            if (obj instanceof RegularAsteroid || obj instanceof BigAsteroid) {
                if (player.collidesWith(obj)) {
                    console.log("Player collided with asteroid!");
                    if (player.isShieldActive) {
                        onCollision.removeObject(obj);
                        console.log("Shield took the damage!");
                        continue;
                    }
                    onCollision.removeObject(obj);
                    onCollision.decreaseLives(1);
                    soundeffects.playerHit.play();
                }
            } else if (obj instanceof SuperAstro) {
                if (player.collidesWith(obj)) {
                    console.log("Player collided with SuperAstro!");
                    if (player.isShieldActive) {
                        onCollision.removeObject(obj);
                        console.log("Shield took the damage!");
                        continue;
                    }
                    onCollision.removeObject(obj);
                    onCollision.decreaseLives(4);
                    soundeffects.playerHit.play();
                }
            } else if (obj instanceof Heart || obj instanceof Sheild || obj instanceof SuperLaser) {
                if (player.collidesWith(obj)) {
                    if (obj instanceof Sheild) {
                        console.log("Dino picked up shield");
                        player.activateShield(5000, imageAssets.dinoWithSheild);
                        soundeffects.powerupSound.play();
                    } else if (obj instanceof Heart) {
                        console.log("Player picked up a heart");
                        onCollision.decreaseLives(-1); // Increase lives by 1
                    } else if (obj instanceof SuperLaser) {
                        console.log("Player picked up Super Laser");
                        soundeffects.powerupSound.play();
                        onCollision.removeObject(obj);
                    }
                }
                onCollision.removeObject(obj);
            }
        }
    }
  
    private checkLaserCollisions(
            moveableObjects: MoveableObject[],
            onCollision: {
                removeObject: (obj: MoveableObject) => void;
                addObject: (obj: MoveableObject) => void;
                increaseScore: (amount: number) => void;
                addExplosion: (position: p5.Vector) => void;
            }
        ): void {
        for (const laser of moveableObjects) {
            if (laser instanceof Laser) {
                for (const asteroid of moveableObjects) {
                    if (
                        asteroid instanceof RegularAsteroid ||
                        asteroid instanceof BigAsteroid ||
                        asteroid instanceof SuperAstro
                    ) {
                        if (laser.collidesWith(asteroid)) {
                            console.log("Laser hit an asteroid!");
                            onCollision.removeObject(laser);

                            if (asteroid instanceof SuperAstro) {
                                if (asteroid.takeDamage()) {
                                    console.log("SuperAstro destroyed!");
                                    onCollision.removeObject(asteroid);
                                    onCollision.increaseScore(20);
                                } else {
                                    console.log(`SuperAstro hit! Hits left: ${asteroid.hitsLeft}`);
                                }
                            } else if (asteroid instanceof BigAsteroid) {
                                const newAsteroids = asteroid.split();
                                for (const newAsteroid of newAsteroids) {
                                    onCollision.addObject(newAsteroid);
                                }
                                onCollision.removeObject(asteroid);
                                onCollision.increaseScore(15);
                            } else {
                                onCollision.removeObject(asteroid);
                                onCollision.increaseScore(5);
                            }

                            soundeffects.explosion?.play();
                            onCollision.addExplosion(asteroid.position);
                        }
                    }
                }
            }
        }
    }
}