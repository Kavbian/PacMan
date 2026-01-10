import { global } from "../global.js";
import { GameObject } from "./gameObject.js";
import { MovingObject } from "./movingObject.js";

class Character extends MovingObject {
    constructor(args = {}) {
        super(args);
        this.name = "character";
        this.score = 0;
        this.lifes = 3;

        this.moveData = {
            ...this.moveData,
            angle: 0,
        };

        this.animationData = {
            ...this.animationData,
            timePerSprite: 0.3,
        }
    }

    draw() {
        if (this.visible) {
            super.draw();
        }
    }

    collisionInteraction(obj) {
        super.collisionInteraction(obj);
        if (this.active && obj.active) {
            switch (obj.name) {
                case "wall":
                    this.moveData.moving = false;
    
                    super.collisionInteraction(obj);
    
                    console.log("collided with wall at", this.x, this.y);
                    break;
                
                case "collectible":
                    this.score += 1;
                    const indexOfCollected = global.allGameObjects.indexOf(obj);
                    global.allGameObjects.splice(indexOfCollected, 1)
    
                    break;
    
                case "enemy":
                    if (this.lifes == 1) {
                        this.visible = false;
                        this.moveData.moving = false;
                        this.moveData.speedMultiplier = 0;
                        this.active = false;
                    }
                    this.lifes--;
                    this.x = this.initialPositionX;
                    this.y = this.initialPositionY;
    
            }
        }
    }

    tryApplyBufferedDirection() {
        const direction = this.moveData.direction;
        if (this.moveData.bufferedDirection == direction) {
            this.moveData.bufferedDirection = null;
            return false;
        }

        super.tryApplyBufferedDirection();
    }



    // draw() {
    //     this.nextAnimationSprite();

    //     switch (this.moveData.direction) {
    //         case "right": this.angle = 0; break;
    //         case "left":  this.angle = Math.PI; break;
    //         case "up":    this.angle = -Math.PI / 2; break;
    //         case "down":  this.angle = Math.PI / 2; break;
    //     }

    //     global.ctx.save();
    //     const cx = this.x + this.width / 2;
    //     const cy = this.y + this.height / 2;
    //     global.ctx.translate(cx, cy);
    //     global.ctx.rotate(this.angle);
    //     global.ctx.drawImage(this.animationData.animationSprites[this.animationData.currentSpriteIndex], -this.width / 2, -this.height / 2, this.width, this.height);
    //     global.ctx.restore();
    // }

    useImagesAsSpritesheet(cols, rows) {
        const that = this;
        const totalSprites = cols * rows;
        const allSprites = this.animationData.animationSprites.length * totalSprites;
        const originalSprites = this.animationData.animationSprites.slice();
        this.animationData.animationSprites = Array.from({ length: allSprites }, () => new Image());

        for (var i = 0; i < originalSprites.length; i++){
            let currentImage = originalSprites[i];
            if (currentImage.complete && currentImage.naturalWidth !== 0) {
            // already loaded
                loaded.call(currentImage, totalSprites * i );
            } else {
                currentImage.onload = function () {
                    let spriteIndex = totalSprites * i;
                    return function () {
                        loaded.call(this, spriteIndex);
                    };
                }();
            }
        }
        
        let loaded = function (spriteIndexOffset) {
            const spritesheetWidth = this.width;
            const spritesheetHeight = this.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);

            // Create a temporary canvas to extract sprites from the spritesheet
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            // Loop through each sprite's row and column position
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        this,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );

                    // assign it to the corresponding Image object
                    const index = row * cols + col;
                    that.animationData.animationSprites[index + spriteIndexOffset].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        };
    }
}

export { Character };