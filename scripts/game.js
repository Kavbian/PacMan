import { global } from "./global.js";
import { Character } from "./gameObjects/character.js";
import { 
    Collectible,
} from "./gameObjects/collectible.js";
import { Wall } from "./gameObjects/wall.js";


let image;


function gameLoop(totalTime) {
    global.deltaTime = (totalTime - global.previousTotalTime) / 1000;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    wall.draw();
    
    candy.draw();
    packMan.draw(global.deltaTime);


    packMan.move();
        
    global.previousTotalTime = totalTime;

    requestAnimationFrame(gameLoop);
}

// const collectibles = [];

// setInterval(() => spawnCollectible(collectibles, global.canvas), 2000);

const packMan = new Character(100, 400)
const candy = new Collectible(200, 200, 50, 50, ["../images/candy.png"]);
const wall = new Wall(300, 300, 100, 100, ["../images/wall.jpg"]);

global.allGameObjects.push(candy);
global.allGameObjects.push(wall);
global.allGameObjects.push(packMan);

packMan.loadImages();
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
            packMan.moveData.direction = "right";
            break;
        
        case "ArrowLeft":
            packMan.moveData.direction = "left";
            break;

        case "ArrowUp":
            packMan.moveData.direction = "up";
            break;

        case "ArrowDown":
            packMan.moveData.direction = "down";
            break;
    }
})
