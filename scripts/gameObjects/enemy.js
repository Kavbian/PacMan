import { MovingObject } from "./movingObject.js";
import { global } from "../global.js";

class Enemy extends MovingObject {
    constructor({ x = 0, y = 0, width = 80, height = 80, pathToImages = [] } = {}) {
        super({x, y, width, height, pathToImages});
        this.name = "enemy";

        this.previousX = x;
        this.previousY = y;

        this.moveData = {
            ...this.moveData,
            previousDirection: "right",
        };

        this.directions = ["right", "left", "up", "down"];
        this.possibleDirections = [];
        this.previousCrossroad = 0;
        this.crossroadInteraction = 0;
    }

    collisionInteraction(obj) {
        super.collisionInteraction(obj);

        switch (obj.name) {
            case "wall":
                this.possibleDirections = [];

                for (const direction of this.directions) {
                    if (!this.willCollideWith(direction, 8) && 
                    direction !== this.moveData.direction) {
                        this.possibleDirections.push(direction);
                    }
                }
        
                
                if(this.possibleDirections) {
                    const randomIndex = Math.floor(Math.random() * this.possibleDirections.length);
                    
                    this.moveData.direction = this.possibleDirections[randomIndex];
                    this.moveData.moving = true;
                }
        
                break;

            case "crossroad":
                if (this.previousCrossroad == 0 && this.crossroadInteraction == 1) {
                    this.moveData.bufferedDirection = obj.randomDirection();
                }
        }


    }

    checkAllCollisions() {
        let crossroadAppearance = 0;
        for (let obj of global.allGameObjects) {
            if (obj == this) continue;
            
            if (this.detectCollision(obj)) {
                if(obj.name == "crossroad") crossroadAppearance = 1;

                this.collisionInteraction(obj);
            }

            
        }

        if(crossroadAppearance) {
            this.previousCrossroad = this.crossroadInteraction;
            this.crossroadInteraction = 1;
        }
        else {
            this.previousCrossroad = this.crossroadInteraction;
            this.crossroadInteraction = 0;
        }
    }

    getOpositeDirection(direction) {
        switch (direction) {
            case "right":
                return "left";
            case "left":
                return "right";
            case "up":
                return "down";
            case "down":
                return "up";
        }
    }
}

export { Enemy };