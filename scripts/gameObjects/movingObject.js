import { GameObject } from "./gameObject.js";
import { global } from "../global.js";

class MovingObject extends GameObject {
    constructor({ x = 0, y = 0, width = 80, height = 80, pathToImages = [] } = {}) {
        super(x, y, width, height, pathToImages);
        this.name = "movingObject";

        this.previousX = x;
        this.previousY = y;

        this.moveData = {
            speed: 300,
            speedMultiplier: 1,
            direction: "right",
            moving: true,
        };
    }

    collisionInteraction(obj) {
        switch (obj.name) {
            case "wall":
                this.moveData.moving = false;

                this.x = this.previousX;
                this.y = this.previousY;

                break;
        }
    }

    move() {    
        if (!this.moveData.moving) return;

        this.previousX = this.x;
        this.previousY = this.y;

        let distance = this.moveData.speed * this.moveData.speedMultiplier * global.deltaTime;
        switch (this.moveData.direction) {
            case "right":
                this.x += distance;
                break;
            case "left":
                this.x -= distance;
                break;
            case "up":
                this.y -= distance;
                break;
            case "down":
                this.y += distance;
                break;
        }

        if (this.x + this.width < 0) {    
            this.x = canvas.width;
        }
        else if (this.y + this.height < 0) {
            this.y = canvas.height - this.height;
        }
        else if (this.x > canvas.width) {
            this.x = -this.width;
        }
        else if (this.y > canvas.height) {
            this.y = -this.height;
        }
    }
    
    checkAllCollisions() {
        for (let obj of global.allGameObjects) {
            if (obj == this) continue;
            
            if (this.detectCollision(obj)) {
                this.collisionInteraction(obj);
            }
        }
    }

    detectCollision(obj) {
        if ((this.x + this.width > obj.x && this.x < obj.x + obj.width) && 
        this.y + this.height > obj.y && this.y < obj.y + obj.height) {
            console.log("This left upper corner:", this.x, this.y, "object left upper corner:", obj.x, obj.y);
            console.log("This right upper corner:", this.x + this.width, this.y, "object right upper corner:", obj.x + obj.width, obj.y);
            console.log("This right bottom corner:", this.x + this.width, this.y + this.height, "object right bottom corner:", obj.x + obj.width, obj.y + obj.height);
            console.log("This left bottom corner:", this.x, this.y + this.height, "object left bottom corner:", obj.x, obj.y + obj.height);

            return true;
        }
        return false;
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

export { MovingObject };