const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let deltaTime = 0;
let previousTotalTime = 0;

let image;

class Collectibles {
    constructor(x = 0, y = 0, width = 25, height = 25) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
    }

    draw() {
        if(this.visible) {
            ctx.fillStyle = "#000000"
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    collision(character) {
        if (this.visible) {
            if ((character.x + character.width > this.x && character.x < this.x + this.width) &&
                (character.y + character.height > this.y && character.y < this.y + this.height)
            ) {
                this.visible = false;
            }
        }
    }
}

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
        };

        this.animationData = {
            animationSprites: [],
            timePerSprite: 0.1,
            currentSpriteElapsedTime: 0,
            currentSpriteIndex: 0,
        };
    }

    move() {
        let distance = this.moveData.speed * this.moveData.speedMultiplier * deltaTime;
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

    draw(deltaTime) {
        this.animationData.currentSpriteElapsedTime += deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) { 
            this.animationData.currentSpriteIndex++;

            if (this.animationData.currentSpriteIndex >= this.animationData.animationSprites.length) {
                this.animationData.currentSpriteIndex = 0;
            }

            this.animationData.currentSpriteElapsedTime = 0;
        }

        ctx.drawImage(this.animationData.animationSprites[this.animationData.currentSpriteIndex], this.x, this.y, this.width, this.height);
    }

    loadImages(){
        // for (let i = 0; i < this.animationData.animationSprites.length; i++) {

        // }

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

const drawAllCollectibles = (collectibles) => {
    collectibles.forEach(collectible => collectible.draw())
}

const checkAllCollisions = (character, collectibles) => {
    collectibles.forEach(collectible => collectible.collision(character))
}

const spawnCollectible = () => {
    let x = Math.random() * (canvas.width - 25);
    let y = Math.random() * (canvas.height - 25);
    collectibles.push(new Collectibles(x, y));
}

function gameLoop(totalTime) {
    deltaTime = (totalTime - previousTotalTime) / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawAllCollectibles(collectibles);
    packMan.draw(deltaTime);


    packMan.move();
    checkAllCollisions(packMan, collectibles);


    previousTotalTime = totalTime;

    requestAnimationFrame(gameLoop);
}



const packMan = new Character(100, 400)

const collectibles = [];

setInterval(spawnCollectible, 2000);

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
