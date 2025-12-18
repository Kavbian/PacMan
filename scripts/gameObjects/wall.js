import { global } from "../global.js";
import { GameObject } from "./gameObject.js";

class Wall extends GameObject {
    constructor({x = 0, y = 0, width = 80, height = 80, pathToImages = []} = {})
    {
        super({x, y, width, height, pathToImages});
        this.name = "wall";
    }
}

export { Wall };