const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let x = 100;
let y = 400;
let width = 80;
let height = 80;
let xVelocity = 0;
let animationData = {
    currentGapSize: 10,
    maxGapSize: 30,
    gapIncrement: 1,
    gapIncrementMultiplier: 1,
};

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
            if ((character.x + character.width > this.x && x < this.x + this.width) &&
                (character.y + character.height > this.y && y < this.y + this.height)
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
            speed: 5,
            speedMultiplier: 1,
            direction: "right",
        };

        this.animationData = {
            currentGapSize: 10,
            maxGapSize: 30,
            gapIncrement: 1,
            gapIncrementMultiplier: 1,
        };
    }

    move() {
        let distance = this.moveData.speed * this.moveData.speedMultiplier;
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
            this.animationData.gapIncrement * this.animationData.gapIncrementMultiplier;

        if (this.animationData.currentGapSize >= this.animationData.maxGapSize) {
            this.animationData.gapIncrementMultiplier = -1;
        }
        else if (this.animationData.currentGapSize == 0) {
            this.animationData.gapIncrementMultiplier = 1;
        }

        ctx.fillStyle = "#00ff00";
        ctx.fillRect(this.x, this.y, this.width, reducedRectHeight);
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y + singleRectHeight * 2, this.width, reducedRectHeight * -1);
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    


    packMan.move();
    packMan.draw();

    point_one.draw(packMan);
    point_one.collision(packMan);

    point_two.collision(packMan);
    point_two.draw(packMan);

    requestAnimationFrame(gameLoop);
}

const packMan = new Character(100, 400)
const point_one = new Collectibles(canvas.width / 2 - 100, canvas.height / 2);
const point_two = new Collectibles(canvas.width / 2 + 100, canvas.height / 2);
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
