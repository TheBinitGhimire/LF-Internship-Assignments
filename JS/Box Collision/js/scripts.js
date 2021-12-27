let canvas = document.querySelector("#collisionArea");
let context = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let balls = document.querySelector("balls");
let ballCount = balls.getAttribute("data-count");

let directions = [1, -1];

let randomNumber = function (max) {
    return Math.floor(Math.random() * parseInt(max));
}

let randomIntensity = function () {
    return Math.floor(Math.random() * 256);
}

let Ball = function (x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = directions[randomNumber(2)];
    this.dy = directions[randomNumber(2)];

    this.draw = function () {
        context.beginPath();
        context.fillStyle = "rgb(" + randomIntensity() + "," + randomIntensity() + "," + randomIntensity() + ")"; // dynamic coloring; i.e. place this value inside "this.color" above and use: context.fillStyle = this.color; to have a single color for one ball.
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
        context.fill();
        context.closePath();
    }

    this.move = function () {
        if ((this.x + this.dx) > (width - this.size) || (this.x + this.dx) < this.size) {
            this.dx = -(this.dx);
        }
        if ((this.y + this.dy) > (height - this.size) || (this.y + this.dy) < this.size) {
            this.dy = -(this.dy);
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    this.collisionDetection = function () {
        ballElements.forEach(element => {
            if (element != this) {
                var totalSize = (this.size + element.size);
                var dx = Math.pow((this.x - element.x), 2);
                var dy = Math.pow((this.y - element.y), 2);
                if ((dx + dy) < Math.pow(totalSize, 2)) {
                    switchDirection(this, element, totalSize - Math.sqrt(dx+dy));
                }
            }
        });
    }
}

function switchDirection(first, second, diff){
	var changes = (Math.max(diff - 0.01, 0) / (1/first.size + 1/second.size)) * 0.2;
	var normalize = [second.x - first.x, second.y - first.y];
	var magnitude = Math.sqrt(normalize[0]*normalize[0] + normalize[1]*normalize[1]);
	normalize = [normalize[0]/magnitude,normalize[1]/magnitude];
	changes = [changes*normalize[0],changes*normalize[1]];
	first.x -= 1/first.size * changes[0];
	first.y -= 1/first.size * changes[1];
	second.x += 1/second.size * changes[0];
	second.y += 1/second.size * changes[1];
    
	var relativeVelocity = [second.dx - first.dx,second.dy - first.dy];
	normalize = [second.x - first.x, second.y - first.y];
	var magnitude = Math.sqrt(normalize[0]*normalize[0] + normalize[1]*normalize[1]);
	normalize = [normalize[0]/magnitude,normalize[1]/magnitude];
	
	var normalVelocity = relativeVelocity[0]*normalize[0] + relativeVelocity[1]*normalize[1];
	if(normalVelocity > 0) return;
	var jump = -(1 + 0.7) * normalVelocity;
	jump /= 1/first.size + 1/second.size;	
	var impulse = [jump*normalize[0],jump*normalize[1]];
	first.dx -= 1/first.size * impulse[0];
	first.dy -= 1/first.size * impulse[1];
	second.dx += 1/second.size * impulse[0];
	second.dy += 1/second.size * impulse[1];
}

let ballElements = [];

for (let i = 0; i < ballCount; i++) {
    ballElements[i] = new Ball(randomNumber(width), randomNumber(height), randomNumber(20));
    ballElements[i].draw();
}

let collisionAnimation = function () {
    context.clearRect(0, 0, width, height);
    ballElements.forEach(element => {
        element.move();
        element.draw();
        element.collisionDetection();
    })
    requestAnimationFrame(collisionAnimation);
}

collisionAnimation()