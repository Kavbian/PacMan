import { global } from "../global.js";

class Character {
    constructor(x = 0, y = 0, width = 80, height = 80)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.moveData = {
            speed: 500,
            speedMultiplier: 1,
            direction: "right",
            angle: 0,
        };

        this.animationData = {
            animationSprites: [],
            timePerSprite: 0.1,
            currentSpriteElapsedTime: 0,
            currentSpriteIndex: 0,
        };
    }

    move() {
        let distance = this.moveData.speed * this.moveData.speedMultiplier * global.deltaTime;
        switch (this.moveData.direction) {
            case "right":
                this.x += distance;
                break;
            case "left":
                this.x -= distance;
                break;
            case "up":
                this.y -= distance;
                break;
            case "down":
                this.y += distance;
                break;
        }

        if (this.x + this.width < 0) {    
            this.x = canvas.width;
        }
        else if (this.y + this.height < 0) {
            this.y = canvas.height - this.height;
        }
        else if (this.x > canvas.width) {
            this.x = -this.width;
        }
        else if (this.y > canvas.height) {
            this.y = -this.height;
        }
    }

    draw() {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) { 
            this.animationData.currentSpriteIndex++;

            if (this.animationData.currentSpriteIndex >= this.animationData.animationSprites.length) {
                this.animationData.currentSpriteIndex = 0;
            }

            this.animationData.currentSpriteElapsedTime = 0;
        }

        switch (this.moveData.direction) {
            case "right": this.angle = 0; break;
            case "left":  this.angle = Math.PI; break;
            case "up":    this.angle = -Math.PI / 2; break;
            case "down":  this.angle = Math.PI / 2; break;
        }

        global.ctx.save();
        const cx = this.x + this.width / 2;
        const cy = this.y + this.height / 2;
        global.ctx.translate(cx, cy);
        global.ctx.rotate(this.angle);
        global.ctx.drawImage(this.animationData.animationSprites[this.animationData.currentSpriteIndex], -this.width / 2, -this.height / 2, this.width, this.height);
        global.ctx.restore();
    }

    loadImages(){
        let image1 = new Image();
        let image2 = new Image();
        let image3 = new Image();

        image1.src = "./images/PacMan0.png";
        image2.src = "./images/PacMan1.png";
        image3.src = "./images/PacMan2.png";

        this.animationData.animationSprites.push(image1);
        this.animationData.animationSprites.push(image2);
        this.animationData.animationSprites.push(image3);
    }
}

export { Character };