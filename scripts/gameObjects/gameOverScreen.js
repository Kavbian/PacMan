import { GameObject } from "./gameObject.js";
import { global } from "../global.js";

class GameOverScreen extends GameObject {
  constructor(args = {})
  {
    super(args);
  }

  draw() {
    if (!global.packManYellow.active && !global.packManBlue.active) {
      global.ctx.fillStyle = 'black';
      global.ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);
      
      global.ctx.fillStyle = 'red';
      global.ctx.font = '72px Arial';
      global.ctx.textAlign = 'center';
      global.ctx.fillText('Game Over :(', global.canvas.width / 2, global.canvas.height / 2);
    }
  }
}

export { GameOverScreen };