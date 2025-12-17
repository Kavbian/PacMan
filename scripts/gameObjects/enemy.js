import { GameObject } from "./gameObject";

class Enemy extends GameObject {
    constructor({ x = 0, y = 0, width = 80, height = 80, pathToImages = [] } = {}) {
        super(x, y, width, height, pathToImages);
        this.name = "enemy";

        this.previousX = x;
        this.previousY = y;

        this.moveData = {
            speed: 300,
            speedMultiplier: 1,
            direction: "right",
            previousDirection: "right",
            bufferedDirection: null,
            angle: 0,
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
}