import { global } from "../global.js";
import { GameObject } from "./gameObject.js";
import { MovingObject } from "./movingObject.js";

class Character extends MovingObject {
    constructor(args = {}) {
        super(args);
        this.name = "character";

        this.moveData = {
            ...this.moveData,
            previousDirection: "right",
            bufferedDirection: null,
            angle: 0,
            moving: true,
        };
    }

    move() {
        this.tryApplyBufferedDirection();

        if (!this.moveData.moving) return;

        this.previousX = this.x;
        this.previousY = this.y;

        super.move();
    }

    collisionInteraction(obj) {
        switch (obj.name) {
            case "wall":
                this.moveData.moving = false;

                super.collisionInteraction(obj);

                break;
            
            case "collectible":
                const indexOfCollected = global.allGameObjects.indexOf(obj);
                global.allGameObjects.splice(indexOfCollected, 1)

                break;

        }
    }

    setBufferedDirection(dir) {
        this.moveData.bufferedDirection = dir;
        
        if (!this.willCollideWith(dir)) {
            this.moveData.direction = dir;
            this.moveData.bufferedDirection = null;
            this.moveData.moving = true;
        }
    }

    tryApplyBufferedDirection() {
        const d = this.moveData.bufferedDirection;
        if (!d) return false;
        if (d === this.moveData.direction) {
            this.moveData.bufferedDirection = null;
            return false;
        }

        if (!this.willCollideWith(d)) {
            this.moveData.direction = d;
            this.moveData.bufferedDirection = null;
            this.moveData.moving = true;
            return true;
        }
        return false;
    }

    draw() {
        this.nextAnimationSprite();

        switch (this.moveData.direction) {
            case "right": this.angle = 0; break;
            case "left":  this.angle = Math.PI; break;
            case "up":    this.angle = -Math.PI / 2; break;
            case "down":  this.angle = Math.PI / 2; break;
        }

        global.ctx.save();
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        global.ctx.translate(cx, cy);
        global.ctx.rotate(this.angle);
        global.ctx.drawImage(this.animationData.animationSprites[this.animationData.currentSpriteIndex], -this.width / 2, -this.height / 2, this.width, this.height);
        global.ctx.restore();
    }

    willCollideWith(dir, step = this.width * 0.5) {
        let nextX = this.x;
        let nextY = this.y;

        switch (dir) {
          case "right": nextX += step; break;
          case "left":  nextX -= step; break;
          case "up":    nextY -= step; break;
          case "down":  nextY += step; break;
        }
    
        for (const obj of global.allGameObjects) {
          if (obj === this) continue;
          if (obj.name !== "wall") continue;

          if ((nextX + this.width > obj.x && nextX < obj.x + obj.width) && 
             nextY + this.height > obj.y && nextY < obj.y + obj.height) {
                return true;
          }
        }

        return false;
      }
}

export { Character };