let canvas = document.querySelector("#collisionArea");
let context = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let ants = document.querySelector("ants");
let antCount = ants.getAttribute("data-count");

let directions = [1, -1];

let randomNumber = function (max) {
    return Math.floor(Math.random() * parseInt(max));
}

let randomIntensity = function () {
    return Math.floor(Math.random() * 256);
}

let ant = new Image();
ant.src = "./images/ant.gif";

let death = new Image();
death.src = "./images/death.png";

canvas.addEventListener("click", function(e){
    console.log(e);
})

let Ant = function (x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = directions[randomNumber(2)];
    this.dy = directions[randomNumber(2)];
    this.alive = true;
    this.image = ant;

    this.draw = function () {
        if(!this.alive) this.image = death;
        context.rotate(Math.atan2(this.dy, this.dx)*Math.PI);
        context.drawImage(this.image, this.x, this.y, size, size);
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
}


let antElements = [];

for (let i = 0; i < antCount; i++) {
    antElements[i] = new Ant(randomNumber(width), randomNumber(height), randomNumber(32));
    antElements[i].draw();
}

let collisionAnimation = function () {
    context.clearRect(0, 0, width, height);
    antElements.forEach(element => {
        element.move();
            element.draw();
    })
    setTimeout(function(){
        requestAnimationFrame(collisionAnimation);
    }, 200);
}

collisionAnimation()