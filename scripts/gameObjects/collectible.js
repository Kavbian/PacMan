import { global } from "../global.js";
import { GameObject } from "./gameObject.js";

class Collectible extends GameObject {
    constructor(x = 0, y = 0, width = 25, height = 25, pathToImages = []) {
        super(x, y, width, height, pathToImages);
        
        this.name = "collectible";
    }

    collision(character) {
        if ((character.x + character.width > this.x && character.x < this.x + this.width) &&
            (character.y + character.height > this.y && character.y < this.y + this.height)
        ) {
            this.visible = false;
        }
    }
}

export { Collectible};