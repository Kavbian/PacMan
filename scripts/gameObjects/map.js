import { Wall } from "./wall.js";
import { global } from "../global.js";
import { Collectible } from "./collectible.js";
import { Enemy } from "./enemy.js";
import { Crossroad } from "./crossroad.js";

class Map {
    constructor(
        wallImage,
        collectibleImage,
        mapInfo = [
        [1, 4, 1, 1, 6, 7, 1, 1, 4, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 2, 3, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1]
        ],
        x = 0,
        y = 0,
        scoreCounter1 = null,
        scoreCounter2 = null,
        lifeCounter1 = null,
        lifeCounter2 = null,
    ) {
        this.x = x;
        this.y = y;

        this.mapInfo = mapInfo;
        this.height = mapInfo.length;
        this.width = mapInfo[0].length;
        this.size = Math.max(this.height, this.width);

        this.canvaSideSize = Math.min(global.canvas.width, global.canvas.height);

        this.elementSize = Math.floor(this.canvaSideSize / this.size)

        this.imagePath = {
            wall: wallImage,
            collectible: collectibleImage,
        }

        this.scoreCounter1 = scoreCounter1;
        this.scoreCounter2 = scoreCounter2;

        this.lifeCounter1 = this.lifeCounter1;
        this.lifeCounter2 = this.lifeCounter2;

        this.crossroads = [];
        this.crossroadNum = 0;
    }

    setupCrossroads() {
        let left, top, right, bottom;
        for (let y = 0; y < this.height; y++) {
            for(let x = 0; x < this.width; x++) {
                if (this.mapInfo[y][x] == 0) {
                    left = [x - 1, y];
                    top = [x, y - 1];
                    right = [x + 1, y];
                    bottom = [x, y + 1];

                    if (left[0] < 0 || left[1] < 0) {
                        if (left[0] < 0) {
                            left[0] = this.width - 1;
                        }
                        else {
                            left[1] = this.height - 1;
                        }
                    }
                    else if (left[0] >= this.width) {
                        if (left[0] >= this.width) {
                            left[0] = 0;
                        }
                        else {
                            left[1] = 0;
                        }
                    }

                    if (top[0] < 0 || top[1] < 0) {
                        if (top[0] < 0) {
                            top[0] = this.width - 1;
                        }
                        else {
                            top[1] = this.height - 1;
                        }
                    }
                    else if (top[0] >= this.width) {
                        if (top[0] >= this.width) {
                            top[0] = 0;
                        }
                        else {
                            top[1] = 0;
                        }
                    }

                    if (right[0] < 0 || right[1] < 0) {
                        if (right[0] < 0) {
                            right[0] = this.width - 1;
                        }
                        else {
                            right[1] = this.height - 1;
                        }
                    }
                    else if (right[0] >= this.width) {
                        if (right[0] >= this.width) {
                            right[0] = 0;
                        }
                        else {
                            right[1] = 0;
                        }
                    }

                    if (bottom[0] < 0 || bottom[1] < 0) {
                        if (bottom[0] < 0) {
                            bottom[0] = this.width - 1;
                        }
                        else {
                            bottom[1] = this.height - 1;
                        }
                    }
                    else if (bottom[0] >= this.width || bottom[1] >= this.height) {
                        if (bottom[0] >= this.width) {
                            bottom[0] = 0;
                        }
                        else {
                            bottom[1] = 0;
                        }
                    }

                    let paths = 0;
                    let crossroadLeft = false;
                    let crossroadTop = false;
                    let crossroadRight = false;
                    let crossroadBottom = false;

                    if (this.mapInfo[left[1]][left[0]] == 0) {
                        paths++;
                        crossroadLeft = true;
                    }
                    if (this.mapInfo[top[1]][top[0]] == 0) {
                        paths++;
                        crossroadTop = true;
                    }
                    if (this.mapInfo[right[1]][right[0]] == 0) {
                        paths++;
                        crossroadRight = true;
                    }
                    if (this.mapInfo[bottom[1]][bottom[0]] == 0) {
                        paths++;
                        crossroadBottom = true;
                    }

                    if (paths >= 3) {
                        this.mapInfo[y][x] = 5;

                        const crossroad = new Crossroad({
                            width: this.elementSize,
                            height: this.elementSize,
                            left: crossroadLeft,
                            top: crossroadTop,
                            right: crossroadRight,
                            bottom: crossroadBottom,
                        })

                        this.crossroads.push(crossroad);
                    }
                }
            }
        }

        console.log(this.mapInfo);
    }

    buildMap() {
        this.setupCrossroads();

        let elSpawnPositionY = this.y;
        for (const row of this.mapInfo) {
            let elSpawnPositionX = this.x;
            for (const el of row) {
                if (el == 1){
                    global.allGameObjects.push(new Wall({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.wall,
                    }))
                }
                else if (el == 0) {
                    global.allGameObjects.push(new Collectible({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.collectible,
                    }))
                }
                else if (el == 2 && this.scoreCounter1) {
                    global.allGameObjects.push(new Wall({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.wall,
                    }))
                    
                    this.scoreCounter1.x = elSpawnPositionX + this.elementSize / 3;
                    this.scoreCounter1.y = elSpawnPositionY + this.elementSize / 1.5;
                    global.allGameObjects.push(this.scoreCounter1);
                }
                else if (el == 3 && this.scoreCounter2) {
                    global.allGameObjects.push(new Wall({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.wall,
                    }))

                    this.scoreCounter2.x = elSpawnPositionX + this.elementSize / 3;
                    this.scoreCounter2.y = elSpawnPositionY + this.elementSize / 1.5;
                    global.allGameObjects.push(this.scoreCounter2);
                }
                else if (el == 4) {
                    const enemy = new Enemy({
                        x: elSpawnPositionX,
                        y: elSpawnPositionY,
                        width: global.characterSize,
                        height: global.characterSize,
                        pathToImages: ["../../images/RedGhostRight.png", ],
                    })

                    global.allGameObjects.push(new Collectible({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.collectible,
                    }))

                    global.allGameObjects.push(enemy);
                    global.allMovingObjects.push(enemy);
                }
                else if(el == 5) {
                    global.allGameObjects.push(new Collectible({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.collectible,
                    }))

                    this.crossroads[this.crossroadNum].x = elSpawnPositionX;
                    this.crossroads[this.crossroadNum].y = elSpawnPositionY;

                    this.crossroadNum++;
                }
                else if (el == 6 && this.lifeCounter1) {
                    global.allGameObjects.push(new Wall({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.wall,
                    }))
                    
                    this.lifeCounter1.x = elSpawnPositionX + this.elementSize / 3;
                    this.lifeCounter1.y = elSpawnPositionY + this.elementSize / 1.5;
                    global.allGameObjects.push(this.lifeCounter1);
                }
                else if (el == 7 && this.lifeCounter2) {
                    global.allGameObjects.push(new Wall({
                        x: elSpawnPositionX, 
                        y: elSpawnPositionY, 
                        width: this.elementSize,
                        height: this.elementSize,
                        pathToImages: this.imagePath.wall,
                    }))
                    
                    this.lifeCounter2.x = elSpawnPositionX + this.elementSize / 3;
                    this.lifeCounter2.y = elSpawnPositionY + this.elementSize / 1.5;
                    global.allGameObjects.push(this.lifeCounter2);
                }

                elSpawnPositionX += this.elementSize;
            }
            elSpawnPositionY += this.elementSize;
        }

        global.allGameObjects.push(...this.crossroads);
    }
}

export { Map };