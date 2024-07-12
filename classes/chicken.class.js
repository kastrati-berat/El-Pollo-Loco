class Chicken extends MovableObject {
    y = 335;
    height = 100;
    width = 100;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    isDead = false; 
    isHit = false; 

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 700 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isHit) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                setTimeout(() => {
                    this.isDead = true;
                    setTimeout(() => {
                        this.world.removeObject(this); 
                    }, 1000); 
                }, 200); 
            }
        }, 200);
    }

    hit() {
        if (!this.isDead && !this.isHit) {
            this.isHit = true;
        }
    }

    moveLeft() {
        if (!this.isDead) {
            this.x -= this.speed;
        }
    }
}
