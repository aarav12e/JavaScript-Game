const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameFrame = 5;

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

function animate(){
    ctx.drawImage(backgroundLayer3, 0, 0);
    requestAnimationFrame(animate);
}
animate();