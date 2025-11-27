const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

let deltaTime = 0;
let previousTime = 0;

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
            currentGapSize: 10,
            maxGapSize: 30,
            gapIncrement: 10,
            gapIncrementMultiplier: 1,
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

        if (this.x < 0) {    
            this.x = canvas.width - this.width;
        }
        else if (this.y < 0) {
            this.y = canvas.height - this.height;
        }
        else if (this.x + this.width > canvas.width) {
            this.x = 0;
        }
        else if (this.y + this.height > canvas.height) {
            this.y = 0;
        }
    }

    draw() {
        let singleRectHeight = this.height / 2;
        let halfGapSize = this.animationData.currentGapSize / 2;
        let reducedRectHeight = singleRectHeight - halfGapSize;
        this.animationData.currentGapSize += 
            this.animationData.gapIncrement * this.animationData.gapIncrementMultiplier * deltaTime;

        if (this.animationData.currentGapSize >= this.animationData.maxGapSize) {
            this.animationData.gapIncrementMultiplier *= -1;
        }
        else if (this.animationData.currentGapSize <= 0) {
            this.animationData.currentGapSize = 0;
            this.animationData.gapIncrementMultiplier *= -1;
        }

        ctx.fillStyle = "#00ff00";
        ctx.fillRect(this.x, this.y, this.width, reducedRectHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y + singleRectHeight * 2, this.width, reducedRectHeight * -1);
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
    deltaTime = (totalTime - previousTime) / 1000;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawAllCollectibles(collectibles);
    packMan.draw();


    packMan.move();
    checkAllCollisions(packMan, collectibles);


    previousTime = totalTime;
    requestAnimationFrame(gameLoop);
}

const packMan = new Character(100, 400)

const collectibles = [];

setInterval(spawnCollectible, 2000);

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
