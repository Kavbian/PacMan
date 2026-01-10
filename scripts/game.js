import { global } from "./global.js";
import { Character } from "./gameObjects/character.js";
import { Collectible } from "./gameObjects/collectible.js";
import { Wall } from "./gameObjects/wall.js";
import { GameObject } from "./gameObjects/gameObject.js"
import { Map } from "./gameObjects/map.js"
import { Enemy } from "./gameObjects/enemy.js";
import { ScoreCounter } from "./gameObjects/scoreCounter.js";
import { MovingObject } from "./gameObjects/movingObject.js";
import { LifeCounter } from "./gameObjects/lifeCounter.js";
import { GameOverScreen } from "./gameObjects/gameOverScreen.js";
import { GameWonScreen } from "./gameObjects/gameWonScreen.js";

function gameLoop(totalTime) {
    global.deltaTime = (totalTime - global.previousTotalTime) / 1000;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);

    GameObject.drawAll(global.allGameObjects)
    MovingObject.checkAllCollisionsArray();
    MovingObject.moveArray();
        
    global.previousTotalTime = totalTime;

    const hasCollectibles = global.allGameObjects.some(
        o => o instanceof Collectible
    );

    // if (!hasCollectibles) {
    //   global.victoryEl.style.display = "flex";
    //   global.canvas.style.filter = "blur(6px)";
    // }

    requestAnimationFrame(gameLoop);
}

function initializeGame() {
    const map = new Map(
        ["../images/wall.jpg"],
        ["../images/candy.png"],
    )
    
    global.map = map;
    
    const characterSize = global.map.elementSize * 0.9;
    global.characterSize = characterSize;
    
    const packManYellow = new Character({
      x: 90,
      y: 400,
      width: global.characterSize,
      height: global.characterSize,
      pathToImages: ["./images/spritesheet.png"],
    });
    
    const packManBlue = new Character({
        x: 80,
        y: 720,
        width: global.characterSize,
        height: global.characterSize,
        pathToImages: ["./images/spritesheetBlue.png"],
    });
    
    const scoreCounterYellow = new ScoreCounter({color: "yellow"});
    scoreCounterYellow.linkCharacter(packManYellow);
    
    const scoreCounterBlue = new ScoreCounter({color: "blue"});
    scoreCounterBlue.linkCharacter(packManBlue);

    const lifeCounterYellow = new LifeCounter({color: "yellow"});
    lifeCounterYellow.linkCharacter(packManYellow);

    const lifeCounterBlue = new LifeCounter({color: "blue"});
    lifeCounterBlue.linkCharacter(packManBlue);
    
    global.map.scoreCounter1 = scoreCounterYellow;
    global.map.scoreCounter2 = scoreCounterBlue;

    global.map.lifeCounter1 = lifeCounterYellow;
    global.map.lifeCounter2 = lifeCounterBlue;
    
    console.log(global.map.scoreCounter1);
    console.log(global.map.scoreCounter2);
    
    global.packManYellow = packManYellow;
    global.packManBlue = packManBlue;
    
    global.packManYellow.useImagesAsSpritesheet(3, 4);
    
    global.packManBlue.useImagesAsSpritesheet(3, 4);
    
    global.map.buildMap();

    
    global.allMovingObjects.push(packManBlue, packManYellow);
    global.allGameObjects.push(...global.allMovingObjects, global.packManYellow, global.packManBlue);

    global.allGameObjects.push(new GameOverScreen());
    global.allGameObjects.push(new GameWonScreen());
}    



initializeGame();
requestAnimationFrame(gameLoop);



document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
            global.packManYellow.setBufferedDirection("right");
            global.packManYellow.setAnimationSprite(0, 2);
            break;
        
        case "ArrowLeft":
            global.packManYellow.setBufferedDirection("left");
            global.packManYellow.setAnimationSprite(6, 8);
            break;

        case "ArrowUp":
            global.packManYellow.setBufferedDirection("up");
            global.packManYellow.setAnimationSprite(9, 11);
            break;

        case "ArrowDown":
            global.packManYellow.setBufferedDirection("down");
            global.packManYellow.setAnimationSprite(3, 5);
            break;
        case "q":
            global.allGameObjects = global.allGameObjects.filter(
                o => !(o instanceof Collectible)
            );
            break;
        case "e":
            global.packManYellow.active = false;
            global.packManBlue.active = false;
        case "d":
            global.packManBlue.setBufferedDirection("right");
            global.packManBlue.setAnimationSprite(0, 2);
            break;
        
        case "a":
            global.packManBlue.setAnimationSprite(6, 8);
            global.packManBlue.setBufferedDirection("left");
            break;

        case "w":
            global.packManBlue.setAnimationSprite(9, 11);
            global.packManBlue.setBufferedDirection("up");
            break;

        case "s":
            global.packManBlue.setAnimationSprite(3, 5);
            global.packManBlue.setBufferedDirection("down");
            break;
    }
    
    // if(packMan.moveData.previousDirection != packMan.moveData.direction) {
    //     packMan.moveData.previousDirection = packMan.moveData.direction
    // }
})
