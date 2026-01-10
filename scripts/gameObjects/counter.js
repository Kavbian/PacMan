import { GameObject } from "./gameObject.js";
import { global } from "../global.js";

class Counter extends GameObject {
  constructor ({color = "black", x = global.canvas.width/2, y = global.canvas.height/2, ...parentArg} = {}) {
    super({x, y, ...parentArg});
    this.name = "counter";
    
    this.color = color;
    this.linkedCharacterObject = null;
  }

  linkCharacter(obj) {
    this.linkedCharacterObject = obj;
  }
}

export { Counter };