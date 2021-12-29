let canvas = finds(".gameArea")[0];
let context = canvas.getContext("2d");

const WIDTH = canvas.width = window.innerWidth;
const HEIGHT = canvas.height = window.innerHeight;

const PLAYABLEHEIGHT = (HEIGHT - woodsImg.height);

let highScore = localStorage.highScore || 0;

class Tree {
    constructor(x, h) {
        this.x = x;
        this.y = 0;
        this.w = treeImg.width;
        this.h = h[0];
        this.hR = h[1];
        this.yR = (PLAYABLEHEIGHT - this.hR + 10);
        this.struct = available; // Proper Tree and Inverted Tree
    }

    appear() {
        context.drawImage(this.struct[0], this.x, this.y, this.w, this.h);
        context.drawImage(this.struct[1], this.x, this.yR, this.w, this.hR);
    }

    move() {
        this.x -= 0.5 * speed;
    }
}

class Wood {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.struct = woodsImg;
    }

    appear() {
        context.drawImage(this.struct, this.x, this.y, WIDTH, HEIGHT - this.y);
    }
}

class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.struct = birdImg;
    }

    create() {
        context.drawImage(this.struct, this.x, this.y, BIRDSIZE[0], BIRDSIZE[1]);
    }

    fly() {
        this.y += (GRAVITY) / EGRAVITY;
    }
}

let treeGeneration = () => {
    difference = BIRDSIZE[0] * [1.4, 1.5][Math.floor(Math.random() * 2)]; // random constants for separation of two trees!
    emptyArea = PLAYABLEHEIGHT - difference;
    firstHeight = Math.floor((Math.random() * (emptyArea / 1.5 - PLAYABLEHEIGHT / 5))) + PLAYABLEHEIGHT / 5;
    secondHeight = emptyArea - (firstHeight);
    return [firstHeight, secondHeight];
}

let startGame = () => {
    gameStarted = true;
    score = DEFAULTSCORE;
    speed = DEFAULTSPEED;
    startTime = performance.now();

    currentScore = () => {
        return parseInt((performance.now() - startTime) / 10000);
    }

    getSpeed = () => {
        return (1 + parseInt(score / 10));
    }

    collisionDetection = () => {
        score = currentScore();
        if ((bird.y + BIRDSIZE[1]) >= (PLAYABLEHEIGHT + 10) || (bird.y) < 0) {
            score = currentScore();
            endGame();
        }
        trees.forEach(e => {
            if ((((bird.x + BIRDSIZE[0]) >= e.x) && (bird.x <= (e.x + e.w))) && (bird.y <= (e.y + e.h) || (bird.y + BIRDSIZE[1]) >= e.yR)) {
                score = currentScore();
                endGame();
            }
        });
    }

    endGame = () => {
        cancelAnimationFrame(gameAnimation);
        context.clearRect(0, 0, WIDTH, HEIGHT);
        localStorage.setItem("latestScore", score);
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", score);
        }
        gameStarted = false;
        gameStopped();
    }

    refreshLocation = () => {
        trees.forEach(e => {
            if (e.x < -(treeImg.width * 2)) {
                temp = treeGeneration();
                e.x = WIDTH;
                e.h = temp[0];
                e.hR = temp[1];
                e.yR = (PLAYABLEHEIGHT - e.hR + 10);
            }
        })

        requestAnimationFrame(refreshLocation);
    }

    canvas.addEventListener("click", (e) => {
        bird.y -= speed * GRAVITY;
    })

    document.addEventListener("keydown", function (e) {
        switch (e.key) {
            case " ":
                canvas.click();
                break;
        }
    })

    /* Wood */
    let wood = new Wood(0, PLAYABLEHEIGHT);
    wood.appear();

    /* Flappy Bird */
    let bird = new Bird(WIDTH / 8, HEIGHT / 2);
    bird.create();

    /* Tress */
    trees = [];
    treeX = 2 * WIDTH / 5;
    for (i = 0; i < 3; i++) {
        trees[i] = new Tree(treeX, treeGeneration());
        treeX += 2 * WIDTH / 5;
    }

    gameAnimation = () => {
        if (!gameStarted) return;
        context.clearRect(0, 0, WIDTH, HEIGHT);
        context.fillStyle = "#072540";
        context.drawImage(scorecardImg, WIDTH / 2 - 84, 48, 160, 72);
        context.fillStyle = "#072540";
        context.font = "bold 32px 'Segoe UI'";
        context.fillText("Score", WIDTH / 2 - 48, 40);
        context.fillText(`${score}`, WIDTH / 2 - 24, 128, 48);

        speed = getSpeed();

        bird.gravity = GRAVITY / EGRAVITY;
        bird.fly();
        bird.create();
        trees.forEach(e => {
            e.appear();
            e.move();
        });
        wood.appear();
        collisionDetection();
        refreshLocation();

        requestAnimationFrame(gameAnimation);
    }

    gameAnimation();
}