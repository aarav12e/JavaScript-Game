const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionctx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight; 

let score = 0;
let gameOver = false;
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
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random()* 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
        this.hasTrail = Math.random() > 0.5;
         

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
        if (this.hasTrail){
            for (let i = 0; i < 5; i++ ){
                particles.push(new Particle(this.x, this.y, this.width, this.color ))
            }

            
           }
        }
        if (this.x < 0 - this.width) gameOver = true;
        
    }
    draw(){
        collisionctx.fillStyle = this.color
        collisionctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spritWidth, 0 , this.spritWidth , this.spritHeight , this.x, this.y, this.width, this.height);

    }
}
let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = './boom.png';
        this.spritHeight = 200;
        this.spritWidth = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './Magic SFX Preview Pack/fire impact 1.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markerForDeletion = false;
    }
    update(deltatime){
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if(this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markerForDeletion = true;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spritWidth, 0, this.spritWidth, this.spritHeight, this.x, this.y - this.size/4, this.size, this.size);
    }
}
let particles = [];
class Particle {
    constructor(x,y,size, color){
        this.size = size;
        this.x = x + this.size/2 + Math.random() * 50 - 25;
        this.y = y + this.size/3 + Math.random() * 50 - 25;
        this.radius = Math.random() * this.size/10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;

    }
    update(){
        this.x += this.speedX;
        this.radius += 0.3;
        if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
    }
    draw(){
        ctx.save();
        ctx.globalAlpha = 1 - this.radius/this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 50, 75);
    ctx.fillStyle = 'white';
    ctx.fillText('Score: ' + score, 55, 80);
}
function drawGameOver(){
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width/2, canvas.height/2);
     ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width/2 + 5, canvas.height/2 + 5);  
}

window.addEventListener('click', function(e){
    const rect = collisionCanvas.getBoundingClientRect();
    const scaleX = collisionCanvas.width / rect.width;
    const scaleY = collisionCanvas.height / rect.height;
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    const detectPixelColor = collisionctx.getImageData(x, y, 1, 1);
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
          object.markerForDeletion = true;  
          score++;
          explosions.push(new Explosion(object.x, object.y, object.width));
        }
    });
})


function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp; 
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function(a,b){
            return a.width - b.width;

        });
    };
    drawScore();
    [...particles, ...ravens, ...explosions].forEach(Object => Object.update(deltatime));
    [...particles, ...ravens, ...explosions].forEach(Object => Object.draw());
    ravens = ravens.filter(Object => !Object.markerForDeletion);
    explosions = explosions.filter(Object => !Object.markerForDeletion);
    particles = particles.filter(Object => !Object.markedForDeletion);

    if (!gameOver) requestAnimationFrame(animate);
    else drawGameOver();

}
animate(0);