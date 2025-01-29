class CollisionSystem {
    public checkCollisions(
      player: Player,
      moveableObjects: MoveableObject[],
      onCollision: {
        removeObject: (obj: MoveableObject) => void;
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
            if (player.isShieldActive) {
              onCollision.removeObject(obj);
              continue;
            }
            onCollision.removeObject(obj);
            onCollision.decreaseLives(1);
            soundeffects.playerHit.play();
          }
        } else if (obj instanceof SuperAstro) {
          if (player.collidesWith(obj)) {
            if (player.isShieldActive) {
              onCollision.removeObject(obj);
              continue;
            }
            onCollision.removeObject(obj);
            onCollision.decreaseLives(4);
            soundeffects.playerHit.play();
          }
        } else if (obj instanceof Heart || obj instanceof Sheild) {
          if (player.collidesWith(obj)) {
            if (obj instanceof Sheild) {
              player.activateShield(5000, imageAssets.dinoWithSheild);
              soundeffects.powerupSound.play();
            }
            onCollision.removeObject(obj);
          }
        }
      }
    }
  
    private checkLaserCollisions(
      moveableObjects: MoveableObject[],
      onCollision: {
        removeObject: (obj: MoveableObject) => void;
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
                onCollision.removeObject(laser);
                onCollision.removeObject(asteroid);
                soundeffects.explosion.play();
                onCollision.addExplosion(asteroid.position);
  
                if (asteroid instanceof SuperAstro) {
                  if (asteroid.takeDamage()) {
                    onCollision.increaseScore(20);
                  }
                } else if (asteroid instanceof BigAsteroid) {
                  onCollision.increaseScore(15);
                } else {
                  onCollision.increaseScore(5);
                }
              }
            }
          }
        }
      }
    }
  }