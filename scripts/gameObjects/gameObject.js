import { global } from "../global.js";

class GameObject {
    constructor({x = 0, y = 0, width = 100, height = 100, pathToImages = [], hitBoxReduction = 0} = {})
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
            firstSpriteIndex: 0,
            lastSpriteIndex: 0,
        };

        this.hitBoxReduction = hitBoxReduction;

        this.hitBox = {
            x: x - this.hitBoxReduction,
            y: y - this.hitBoxReduction,
            width: width - this.hitBoxReduction * 2,
            height: height - this.hitBoxReduction * 2,
        }

        this.visible = true;
        this.active = true;
    }

    nextAnimationSprite() {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;
    
        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) { 
            this.animationData.currentSpriteIndex++;
    
            if (this.animationData.currentSpriteIndex >= this.animationData.lastSpriteIndex) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex;
            }
    
            this.animationData.currentSpriteElapsedTime = 0;
        }
    }

    setAnimationSprite(firstSpriteIndex, lastSpriteIndex) {
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
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

    static drawAll(list = null) {
        const drawList = list ?? global.allGameObjects;

        for (const obj of drawList) {
            if (obj.name != "crossroad"){
                try {
                    obj.draw();
                } catch (e) {
                    console.log(e);
                    console.log(obj);
                }
            }
        }
    }
}

export { GameObject };