const global = {
    canvas: document.querySelector("#canvas"),
    ctx: canvas.getContext("2d"),
    victoryEl: document.querySelector(".victory"),
    deltaTime: 0,
    previousTotalTime: 0,
    allGameObjects: [],
}

export { global };