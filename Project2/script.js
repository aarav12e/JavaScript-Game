const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 15;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './background/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './background/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './background/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './background/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './background/layer-5.png';

// let x = 0;
// let x2 = 2400;

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.drawImage(backgroundLayer5, x, 0);
    // ctx.drawImage(backgroundLayer5, x2, 0);
    // if (x < -2400) x = 2400 + x2 - gameSpeed;
    // x-= gameSpeed;
    // if (x2 < -2400) x2 = 2400 + x - gameSpeed;
    // x2 -= gameSpeed;
    requestAnimationFrame(animate);
}
animate();

//hello this is kajal
//try in github