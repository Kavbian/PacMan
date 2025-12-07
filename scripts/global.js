const global = {
    canvas: document.querySelector("#canvas"),
    ctx: canvas.getContext("2d"),
    deltaTime: 0,
    previousTotalTime: 0,
}

export { global };