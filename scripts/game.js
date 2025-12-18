import { global } from "./global.js";
import { Character } from "./gameObjects/character.js";
import { Collectible } from "./gameObjects/collectible.js";
import { Wall } from "./gameObjects/wall.js";
import { GameObject } from "./gameObjects/gameObject.js"
import { Map } from "./gameObjects/map.js"
import { Enemy } from "./gameObjects/enemy.js";


function gameLoop(totalTime) {
    global.deltaTime = (totalTime - global.previousTotalTime) / 1000;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    GameObject.drawAll(global.allGameObjects)
    
    
    packMan.checkAllCollisions();
    packMan.move();

    enemy.checkAllCollisions();
    enemy.move();
        
    global.previousTotalTime = totalTime;

    const hasCollectibles = global.allGameObjects.some(
        o => o instanceof Collectible
    );

    if (!hasCollectibles) {
      global.victoryEl.style.display = "flex";
      global.canvas.style.filter = "blur(6px)";
    }

    requestAnimationFrame(gameLoop);
}

const map = new Map(
    ["../images/wall.jpg"],
    ["../images/candy.png"],
);
map.buildMap();

const characterSize = map.elementSize * 0.90;

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

const enemy = new Enemy({
    x: 81,
    y: 85,
    width: characterSize,
    height: characterSize,
    pathToImages: ["../images/RedGhostRight.png", ],
})

console.log(enemy)

global.allGameObjects.push(enemy);

global.allGameObjects.push(packMan);

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
        case "q":
            global.allGameObjects = global.allGameObjects.filter(
                o => !(o instanceof Collectible)
            );
            break;
    }
    
    if(packMan.moveData.previousDirection != packMan.moveData.direction) {
        packMan.moveData.previousDirection = packMan.moveData.direction
    }
})
