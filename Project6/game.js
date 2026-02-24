class Enemy {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 200;
    }
    update(){
      this.x++;
    }
    draw(){

    }
}
class Ghost extends Enemy {
    constructor(){
        super();
        this.image = './enemy_ghost.png';
    }
}

const enemy1 = new Ghost();
enemy1.update();