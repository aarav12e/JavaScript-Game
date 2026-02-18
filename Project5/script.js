const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

let ravens = [];
class Raven {
    constructor(){
        this.spritWidth = 271;
        this.spritHeight = 194;
        this.sizeModifer 
        this.width = this.spritWidth/2;
        this.height = this.spritHeight/2;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;  
        this.markerForDeletion = false; 
        this.image = new Image();
        this.image.src = './raven.png';
        

    }
    update(){
        this.x -= this.directionX;
        if (this.x < 0 - this.width) this.markerForDeletion = true;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, sx , sy , sw , sh , this.x, this.y, this.width, this.height);

    }
}


function animate(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp; 
    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
    };
    [...ravens].forEach(Object => Object.update());
    [...ravens].forEach(Object => Object.draw());
    ravens = ravens.filter(Object => !Object.markerForDeletion);

    requestAnimationFrame(animate);

}
animate(0);