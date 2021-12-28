let canvas = finds(".gameArea")[0];
let context = canvas.getContext("2d");

const WIDTH = canvas.width = 1280;
const HEIGHT = canvas.height = 720;

let highScore = localStorage.highScore || 0;


class Car {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vehicle = available[Math.floor(Math.random() * 3)];
        this.direction = 1;
        this.userControllable = 0;
    }

    start() {
        context.drawImage(this.vehicle, this.x, this.y, VEHICLESIZE[0], VEHICLESIZE[1]);
    }

    drive() {
        if (!this.userControllable) {
            this.y += speed;
            if (this.y >= BOUNDARYY[1]) {
                this.y = BOUNDARYY[0];
                score += 1;
            }
        }
    }
}

class User extends Car {
    constructor(x, y) {
        super(x, y);
        this.direction = 0;
        this.vehicle = userCar;
        this.userControllable = 1;
    }
}

class Automated extends Car {
    constructor(x, y, z) {
        super(x, y);
        this.originY = y;
        this.direction = z;
        this.speed = 1;
        this.vehicle = (this.direction) ? available[Math.floor(Math.random() * 3)] : availableN[Math.floor(Math.random() * 3)];
    }

    start() {
        context.drawImage(this.vehicle, this.x, this.y, VEHICLESIZE[0], VEHICLESIZE[1]);
    }

    drive() {
        if (this.direction == 1) this.y += this.speed;
        else this.y -= this.speed;
        if (this.y >= BOUNDARYY[1] || (this.y + VEHICLESIZE[1]) <= BOUNDARYY[0]) {
            this.y = (this.direction) ? BOUNDARYY[0] : BOUNDARYY[1];
        }
    }
}


let startGame = () => {
    changeBody(0);
    gameStarted = true;
    score = DEFAULTSCORE;
    speed = DEFAULTSPEED;
    speedBoost = [];

    collisionDetection = () => {
        [car1, car2, car3].forEach(element => {
            if (element.x == user.x && (user.y - element.y) <= VEHICLESIZE[1]) {
                accident();
            }
        })
    }

    accident = () => {
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

    document.addEventListener("keydown", function (e) {
        switch (e.key) {
            case "ArrowLeft":
            case "a":
                if (user.x - HORIZONTALDIFFERENCE >= BOUNDARYX[0]) user.x -= HORIZONTALDIFFERENCE;
                break;
            case "ArrowRight":
            case "d":
                if (user.x + HORIZONTALDIFFERENCE <= BOUNDARYX[1]) user.x += HORIZONTALDIFFERENCE;
                break;
        }
    })

    /* Game Lane Vehicles */
    let car1 = new Car(BOUNDARYX[0], 260);
    let car2 = new Car(INITIALX, 16);
    let car3 = new Car(BOUNDARYX[1], 500);
    let user = new User(INITIALX, 600);
    let gameLaneCars = [car1, car2, car3, user];

    /* Automated Lane Vehicles */
    let carAUTO = [];
    carAUTO.push(new Automated(AUTOPOSSIBLEX[0], AUTOPOSSIBLEY[0], 1));
    carAUTO.push(new Automated(AUTOPOSSIBLEX[0], AUTOPOSSIBLEY[3], 1));
    carAUTO.push(new Automated(AUTOPOSSIBLEX[1], AUTOPOSSIBLEY[4], 0));
    carAUTO.push(new Automated(AUTOPOSSIBLEX[1], AUTOPOSSIBLEY[1], 0));
    carAUTO.push(new Automated(AUTOPOSSIBLEX[2], AUTOPOSSIBLEY[2], 1));
    carAUTO.push(new Automated(AUTOPOSSIBLEX[2], AUTOPOSSIBLEY[5], 1));

    allCars = gameLaneCars.concat(carAUTO);
    allCars.forEach(element => {
        element.start();
    })

    gameAnimation = () => {
        if (!gameStarted) return;
        context.clearRect(0, 0, WIDTH, HEIGHT);
        context.fillStyle = "#072540";
        context.fillRect(WIDTH / 2 - 84, 48, 160, 72);
        context.fillStyle = "#ffffff";
        context.font = "24px 'Segoe UI'";
        context.fillText("Score", WIDTH / 2 - 32, 76);
        context.fillText(`|  ${score}  |`, WIDTH / 2 - 28, 108, 48)
        allCars.forEach(element => {
            element.drive();
            element.start();
        });
        collisionDetection();
        if (score % SPEEDTHRESHOLD == 0 && score != 0 && !speedBoost.includes(score)) {
            speed += 0.5
            speedBoost.push(score);
        }
        requestAnimationFrame(gameAnimation);
    }

    gameAnimation();
}