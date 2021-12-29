let mainScreen = finds(".mainScreen")[0];
let gameScreen = finds(".gameScreen")[0];
let gameOverScreen = finds(".gameOverScreen")[0];

let gameStarted = false;

find("audio").play();
find("audio").loop = true;

show(mainScreen);

Array.from(finds(".highScore")).forEach(e => {
    e.innerHTML = localStorage.highScore || 0;
})

let gameStopped = () => {
    hide(gameScreen) || hide(mainScreen);
    show(gameOverScreen);
    finds(".yourScore")[0].innerHTML = localStorage.latestScore;
    Array.from(finds(".highScore")).forEach(e => {
        e.innerHTML = localStorage.highScore || 0;
    })
}

finds(".startGame").forEach(e => {
    e.addEventListener("click", () => {
        hide(gameOverScreen);
        hide(mainScreen);
        show(gameScreen);
        startGame();
    })
});

Array.from(finds(".initializer")).forEach(e => {
    e.addEventListener("click", () => {
        hide(gameScreen) || hide(gameOverScreen);
        show(mainScreen);
    })
});

let seeInstructions = finds(".seeInstructions")[0];
let instructionsBox = find(".gameInstructions");

seeInstructions.addEventListener("click", () => {
    if (instructionsBox.style.display != "block") show(instructionsBox);
    else hide(instructionsBox);
})