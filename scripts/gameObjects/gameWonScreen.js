import { GameObject } from "./gameObject.js";
import { global } from "../global.js";
import { Collectible } from "./collectible.js";

class GameWonScreen extends GameObject {
  constructor(args = {})
  {
    super(args);
  }

  draw() {
    if (!global.allGameObjects.some(o => o instanceof Collectible)) {
      global.ctx.fillStyle = 'black';
      global.ctx.fillRect(0, 0, global.canvas.width, global.canvas.height);
      
      global.ctx.fillStyle = 'green';
      global.ctx.font = '72px Arial';
      global.ctx.textAlign = 'center';
      global.ctx.fillText('You did it! :)', global.canvas.width / 2, global.canvas.height / 2 - 50);

      let winnerText = '';
      if (global.packManYellow.score > global.packManBlue.score) {
        winnerText = 'The winner is the YELLOW PacMan';
      } else if (global.packManBlue.score > global.packManYellow.score) {
        winnerText = 'The winner is the BLUE PacMan';
      } else {
        winnerText = 'It\'s a tie!';
      }

      global.ctx.font = '50px Arial';
      global.ctx.fillText(winnerText, global.canvas.width / 2, global.canvas.height / 2 + 50);
    }
  }
}

export { GameWonScreen };