import { GameObject } from "./gameObject.js";
import { global } from "../global.js";

class Crossroad extends GameObject {
  constructor({left = false, top = false, right = false, bottom = false, ...parentArg} = {}) {
    super({...parentArg});
    this.name = "crossroad";
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  get numberOfDirections() {
    return this.left + this.top + this.right + this.bottom;
  }

  randomDirection() {
    const directions = [];
    if (this.left) directions.push('left');
    if (this.top) directions.push('up');
    if (this.right) directions.push('right');
    if (this.bottom) directions.push('down');
    
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
  }

  draw() {
    global.ctx.fillStyle = "red";
    global.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export {Crossroad};