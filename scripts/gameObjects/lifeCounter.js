import { GameObject } from "./gameObject.js";
import { global } from "../global.js";
import { Counter } from "./counter.js";

class LifeCounter extends Counter {
  constructor ({color = "black", x = global.canvas.width/2, y = global.canvas.height/2, ...parentArg} = {}) {
    super({x, y, ...parentArg});
    this.name = "lifeCounter";
    
    this.color = color;
    this.linkedCharacterObject = null;
  }

  draw() {
    global.ctx.fillStyle = this.color;
    global.ctx.font = "bold 48px cursive";
    global.ctx.fillText(`${this.linkedCharacterObject.lifes.toString()}❤️`, this.x, this.y);
  }
}

export { LifeCounter };