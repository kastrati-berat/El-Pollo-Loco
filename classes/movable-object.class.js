class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerlation = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.accerlation;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        }else{

        }
        return this.y < 130;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
        setInterval(() => {

        }, 1000 / 60);
    }

    jump() {
        this.speedY = 30;
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding(mo) {
        return this.x < mo.x + mo.width &&
            this.x + this.width > mo.x &&
            this.y < mo.y + mo.height &&
            this.y + this.height > mo.y;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms 
        timepassed = timepassed / 1000; // Difference in s 
        return timepassed < 1;
    }

}