const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;
const explosion = [];

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
    }
    update() {
        this.frame++;
    }
    draw() {
        ctx.drawImage(this.image, sx, sy , sw , )
    }
}