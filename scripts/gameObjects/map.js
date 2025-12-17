import { Wall } from "./wall.js";
import { global } from "../global.js";
import { Collectible } from "./collectible.js";

class Map {
    constructor(
        wallImage,
        collectibleImage,
        mapInfo = [
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1]
    ], x = 0, y = 0) {
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
    }

    buildMap() {
        let elSpawnPositionY = this.y;
        for (const row of this.mapInfo) {
            let elSpawnPositionX = this.x;
            for (const el of row) {
                if (el != 0){
                    global.allGameObjects.push(new Wall(
                        elSpawnPositionX, 
                        elSpawnPositionY, 
                        this.elementSize,
                        this.elementSize,
                        this.imagePath.wall,
                    ))
                }
                else {
                    global.allGameObjects.push(new Collectible(
                        elSpawnPositionX, 
                        elSpawnPositionY, 
                        this.elementSize,
                        this.elementSize,
                        this.imagePath.collectible,
                    ))
                }

                elSpawnPositionX += this.elementSize;
            }
            elSpawnPositionY += this.elementSize;
        }
    }
}

export { Map };