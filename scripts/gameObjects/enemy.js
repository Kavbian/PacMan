import { MovingObject } from "./movingObject.js";

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
        
        
                console.log(this.x, this.y, "changed direction to", this.moveData.direction);
                console.log(obj.x, obj.y);
                console.log("possible directions:", this.possibleDirections);
                console.log("previous position", this.previousX, this.previousY)
                break;
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