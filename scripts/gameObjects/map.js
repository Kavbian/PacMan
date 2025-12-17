import { Wall } from "./wall.js";
import { global } from "../global.js";

class Map {
    constructor(wallImage,
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

        this.wallSize = Math.floor(this.canvaSideSize / this.size)

        this.imagePath = {
            wall: wallImage,
        }
    }

    buildMap() {
        let wallY = this.y;
        for (const row of this.mapInfo) {
            let wallX = this.x;
            for (const el of row) {
                if (el != 0){
                    global.allGameObjects.push(new Wall(
                        wallX, 
                        wallY, 
                        this.wallSize,
                        this.wallSize,
                        this.imagePath.wall,
                    ))
                }


                wallX += this.wallSize;
            }
            wallY += this.wallSize;
        }
    }
}

export { Map };