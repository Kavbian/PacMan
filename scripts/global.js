import { Character } from "./gameObjects/character.js";
import { Map } from "./gameObjects/map.js";

const global = {
    canvas: document.querySelector("#canvas"),
    ctx: canvas.getContext("2d"),
    victoryEl: document.querySelector(".victory"),
    deltaTime: 0,
    previousTotalTime: 0,
    allGameObjects: [],
    map: null,
    characterSize: null,
    packManYellow: null,
    packManBlue: null,
    allMovingObjects: [],
}

export { global };