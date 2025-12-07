import { global } from "../global.js";

class Collectible {
    constructor(x = 0, y = 0, width = 25, height = 25) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
    }

    draw() {
        if(this.visible) {
            global.ctx.fillStyle = "#000000"
            global.ctx.fillRect(this.x, this.y, this.width, this.height)
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

const drawAllCollectibles = (collectibles) => {
    collectibles.forEach(collectible => collectible.draw())
}

const checkAllCollisions = (character, collectibles) => {
    collectibles.forEach(collectible => collectible.collision(character))
}

const spawnCollectible = (collectibles) => {
    let x = Math.random() * (canvas.width - 25);
    let y = Math.random() * (canvas.height - 25);
    collectibles.push(new Collectible(x, y));
}

export { Collectible, drawAllCollectibles, checkAllCollisions, spawnCollectible };