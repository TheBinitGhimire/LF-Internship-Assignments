let userOrientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

if (!userOrientation.includes("landscape")) {
    alert("Please switch your screen to Landscape mode!");
}

find("audio").play();
find("audio").loop = true;

let gameStarted = false;

let startScreen = finds(".startScreen")[0];
let gameScreen = finds(".gameScreen")[0];
let gameOverScreen = finds(".gameOverScreen")[0];

show(startScreen);
Array.from(finds(".highScore")).forEach(e => {
    e.innerHTML = localStorage.highScore || 0;
})

let gameStopped = () => {
    hide(gameScreen) || hide(startScreen);
    show(gameOverScreen);
    finds(".yourScore")[0].innerHTML = localStorage.latestScore;
    Array.from(finds(".highScore")).forEach(e => {
        e.innerHTML = localStorage.highScore || 0;
    })
}

Array.from(finds(".startGame")).forEach(e => {
    e.addEventListener("click", ()=>{
        hide(startScreen);
        show(gameScreen);
        startGame();
    })
});

Array.from(finds(".mainScreen")).forEach(e => {
    e.addEventListener("click", ()=>{
        hide(gameOverScreen);
        show(startScreen);
    })
});