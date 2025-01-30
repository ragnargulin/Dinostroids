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
            // Player collides with an Asteroid
            if (obj instanceof RegularAsteroid || obj instanceof BigAsteroid) {
                if (player.collidesWith(obj)) {
                    console.log("Player collided with asteroid!");
                    if (player.isShieldActive) {
                        onCollision.removeObject(obj);
                        console.log("Shield took the damage from the asteroid!");
                        continue;
                    }
                    // If no shield, remove the asteroid and damage the player
                    onCollision.removeObject(obj);
                    onCollision.decreaseLives(1);
                    soundeffects.playerHit.play();
                }
                // Player collides with a SuperAstro
            } else if (obj instanceof SuperAstro) {
                if (player.collidesWith(obj)) {
                    console.log("Player collided with SuperAstro!");
                    if (player.isShieldActive) {
                        onCollision.removeObject(obj);
                        console.log("Shield took the damage from SuperAstro!");
                        continue;
                    }
                    // If no shield, remove SuperAstro and deal heavy damage
                    onCollision.removeObject(obj);
                    onCollision.decreaseLives(4);
                    soundeffects.playerHit.play();
                }

                // Player collides with a Power-up
            } else if (obj instanceof Heart || obj instanceof Sheild || obj instanceof SuperLaser) {
                // Only remove the power-up if the player actually collides with it
                if (player.collidesWith(obj)) {

                    if (player.isSuperLaserActive || player.isShieldActive) {
                        return;
                    }

                    else if (obj instanceof Sheild) {
                        console.log("Player picked up Shield");
                        player.activateShield(7000, imageAssets.dinoWithSheild);
                        soundeffects.powerupSound.play();
                    } else if (obj instanceof Heart) {
                        console.log("Player picked up a Heart");
                        onCollision.decreaseLives(-1);
                    } else if (obj instanceof SuperLaser) {
                        console.log("Player picked up Super Laser");
                        player.activateSuperLaser(10000, imageAssets.rampageDino);
                        soundeffects.powerupSound.play();
                    }
                    onCollision.removeObject(obj);
                }
            }
        }
    }

    /**
     * Checks collisions between Lasers and Asteroids (Regular, Big, SuperAstro).
     * If a laser hits an asteroid, remove laser; handle asteroid destruction/splitting.
     */
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
            // Check for both regular Laser and SuperLaserBeam
            if (laser instanceof Laser || laser instanceof SuperLaserBeam) {
                for (const asteroid of moveableObjects) {
                    if (
                        asteroid instanceof RegularAsteroid ||
                        asteroid instanceof BigAsteroid ||
                        asteroid instanceof SuperAstro
                    ) {
                        if (laser.collidesWith(asteroid)) {
                            console.log("Laser hit an asteroid!");
    
                            // If it's a SuperAstro
                            if (asteroid instanceof SuperAstro) {
                                if (asteroid.takeDamage()) {
                                    console.log("SuperAstro destroyed!");
                                    onCollision.removeObject(asteroid);
                                    onCollision.increaseScore(20);
                                } else {
                                    console.log(`SuperAstro hit! Hits left: ${asteroid.hitsLeft}`);
                                }
                            }
                            // If it's a BigAsteroid
                            else if (asteroid instanceof BigAsteroid) {
                                const newAsteroids = asteroid.split();
                                for (const newAsteroid of newAsteroids) {
                                    onCollision.addObject(newAsteroid);
                                }
                                onCollision.removeObject(asteroid);
                                onCollision.increaseScore(15);
                            }
                            else {
                                onCollision.removeObject(asteroid);
                                onCollision.increaseScore(5);
                            }
    
                            // Only remove regular laser on first hit
                            if (laser instanceof Laser) {
                                onCollision.removeObject(laser);
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
