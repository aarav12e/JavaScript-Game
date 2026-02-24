const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
let score = 0;
ctx.font = '50px Impact';


let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
    constructor(){
        this.spritWidth = 271;
        this.spritHeight = 194;
        this.sizeModifer = Math.random() * 0.6 + 0.4;
        this.width = this.spritWidth * this.sizeModifer;
        this.height = this.spritHeight * this.sizeModifer;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;  
        this.markerForDeletion = false; 
        this.image = new Image();
        this.image.src = './raven.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapIntervel = Math.random() * 50 + 50;
        

    }
    update(deltatime){
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY = this.directionY * -1;
        }
        this.x -= this.directionX;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markerForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapIntervel){
        if (this.frame > this.maxFrame) this.frame = 0;
        else this.frame++;
        this.timeSinceFlap = 0;
        }
        
    }
    draw(){
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spritWidth, 0 , this.spritWidth , this.spritHeight , this.x, this.y, this.width, this.height);

    }
}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}

window.addEventListener('click', function(e){
    const detectPixelColor = ctx.getImageData();
})


function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp; 
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
    };
    drawScore();
    [...ravens].forEach(Object => Object.update(deltatime));
    [...ravens].forEach(Object => Object.draw());
    ravens = ravens.filter(Object => !Object.markerForDeletion);

    requestAnimationFrame(animate);

}
animate(0);