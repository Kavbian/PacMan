import { global } from "./global.js";
import { Character } from "./gameObjects/character.js";
import { 
    drawAllCollectibles, 
    checkAllCollisions, 
    spawnCollectible 
} from "./gameObjects/collectible.js";


let image;


function gameLoop(totalTime) {
    global.deltaTime = (totalTime - global.previousTotalTime) / 1000;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
    
    drawAllCollectibles(collectibles);
    packMan.draw(global.deltaTime);


    packMan.move();
    checkAllCollisions(packMan, collectibles);


    global.previousTotalTime = totalTime;

    requestAnimationFrame(gameLoop);
}

const packMan = new Character(100, 400)
const collectibles = [];

setInterval(() => spawnCollectible(collectibles, global.canvas), 2000);

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
