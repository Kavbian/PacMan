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
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
    }
}

class Character {
    constructor(x = 0, y = 0, width = 80, height = 80)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        const moveData = {
            speed: 5,
            speedMultiplier: 1,
            direction: "right",
        };
    }

    move() {
        switch (this.moveData.direction) {
            case "right":
                this.x += this.moveData.speed * this.moveData.speedMultiplier;
                break;
            case "left":
                this.x -= this.moveData.speed * this.moveData.speedMultiplier;
                break;
            case "up":
                this.y -= this.moveData.speed * this.moveData.speedMultiplier;
                break;
            case "down":
                this.y += this.moveData.speed * this.moveData.speedMultiplier;
                break;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // if (pointA.visible) {
    //     if ((x + width > pointA.x && x < pointA.x + pointA.width) &&
    //         (y + height > pointA.y && y < pointA.y + pointA.height)
    //     ) {
    //         pointA.visible = false;
    //     }
    //     ctx.fillStyle = "#000000ff";
    //     ctx.fillRect(pointA.x, pointA.y, pointA.width, pointA.height);
    // }

    packMan.move();
    draw();



    requestAnimationFrame(gameLoop);
}

function draw() {
    if (x < 0) {
        x = canvas.width - width;
    }
    else if (y < 0) {
        y = canvas.height - height;
    }
    else if (x + width > canvas.width) {
        x = 0;
    }
    else if (y + height > canvas.height) {
        y = 0;
    }


    let singleRectHeight = height / 2;
    let halfGapSize = animationData.currentGapSize / 2;
    let reducedRectHeight = singleRectHeight - halfGapSize;
    animationData.currentGapSize += 
        animationData.gapIncrement * animationData.gapIncrementMultiplier;

    if (animationData.currentGapSize >= animationData.maxGapSize) {
        animationData.gapIncrementMultiplier = -1;
    }
    else if (animationData.currentGapSize == 0) {
        animationData.gapIncrementMultiplier = 1;
    }

    ctx.fillStyle = "#00ff00";
    ctx.fillRect(x, y, width, reducedRectHeight);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(x, y + singleRectHeight * 2, width, reducedRectHeight * -1);
}

const setVelocity = () => {
    xVelocity = 1;
}

const clearVelocity = () => {
    xVelocity = 0;
}

const packMan = new Character(100, 400)
requestAnimationFrame(gameLoop);

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowRight":
            moveData.direction = "right";
            break;
        
        case "ArrowLeft":
            moveData.direction = "left";
            break;

        case "ArrowUp":
            moveData.direction = "up";
            break;

        case "ArrowDown":
            moveData.direction = "down";
            break;
    }
})
