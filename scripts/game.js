import { global } from "./global.js";
import { Character } from "./gameObjects/character.js";
import { 
    Collectible,
} from "./gameObjects/collectible.js";
import { Wall } from "./gameObjects/wall.js";
import { GameObject } from "./gameObjects/gameObject.js"
import { Map } from "./gameObjects/map.js"


function gameLoop(totalTime) {
    global.deltaTime = (totalTime - global.previousTotalTime) / 1000;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    GameObject.drawAll(global.allGameObjects)
    
    
    packMan.move();
    packMan.checkAllCollisions();
        
    global.previousTotalTime = totalTime;

    requestAnimationFrame(gameLoop);
}

const map = new Map(["../images/wall.jpg"]);
map.buildMap();

const characterSize = map.wallSize * 0.90;

const packMan = new Character({
  x: 100,
  y: 400,
  width: characterSize,
  height: characterSize,
  pathToImages: [
      "./images/PacMan0.png",
      "./images/PacMan1.png",
      "./images/PacMan2.png"
    ]
});

global.allGameObjects.push(packMan);

console.log(map.wallSize)
console.log(map.canvaSideSize)
console.log(global.allGameObjects)

requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
            packMan.setBufferedDirection("right");
            break;
        
        case "ArrowLeft":
            packMan.setBufferedDirection("left");
            break;

        case "ArrowUp":
            packMan.setBufferedDirection("up");
            break;

        case "ArrowDown":
            packMan.setBufferedDirection("down");
            break;
    }
    
    if(packMan.moveData.previousDirection != packMan.moveData.direction) {
        packMan.moveData.previousDirection = packMan.moveData.direction
    }
})
