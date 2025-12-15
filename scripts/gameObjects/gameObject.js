import { global } from "../global.js";

class GameObject {
    constructor(x = 0, y = 0, width = 100, height = 100, pathToImages = [])
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.animationData = {
            animationSprites: this.convertPathToImages(pathToImages),
            timePerSprite: 0.1,
            currentSpriteElapsedTime: 0,
            currentSpriteIndex: 0,
        };
    }

    nextAnimationSprite() {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;
    
        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) { 
            this.animationData.currentSpriteIndex++;
    
            if (this.animationData.currentSpriteIndex >= this.animationData.animationSprites.length) {
                this.animationData.currentSpriteIndex = 0;
            }
    
            this.animationData.currentSpriteElapsedTime = 0;
        }
    }

    draw() {
        this.nextAnimationSprite();
        global.ctx.drawImage(this.animationData.animationSprites[this.animationData.currentSpriteIndex], this.x, this.y, this.width, this.height);
    }

    convertPathToImages(arr) {
        const newArr = [];
        for (let i of arr) {
            let img = new Image();
            img.src = i;
            newArr.push(img);
        }

        return newArr;
    }

    detectCollision(obj) {
        if ((this.x + obj.width > obj.x && obj.x < this.x + this.width) &&
            (this.y + obj.height > obj.y && obj.y < this.y + this.height)
        ) {
            return true;
        }
        return false;
    }
}

export { GameObject };