class ThrowableObject extends MovableObject {
    throw_sound = new Audio('Audio/throwing_bottles.mp3');
    direction = 1;

    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 120;
        this.world = world;
        this.direction = direction;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throw_sound.volume = 0.3;

        if (this.world.soundOn) {
            this.throw_sound.currentTime = 0;
            this.throw_sound.play();
        }

        setInterval(() => {
            this.x += 10 * this.direction;
            if (this instanceof Bottle) {
                this.startRotation();
            }
        }, 25);
        

        this.world.updateBottleStatusbar(-20);
    }

     pauseThrowSound() {
        this.throw_sound.pause();
        this.throw_sound.currentTime = 0;
    }

    draw(ctx) {
        if (this.direction === -1) {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.scale(-1, 1);
            ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
            super.draw(ctx);
            ctx.restore();

        } else {
            super.draw(ctx);
        }
    }
}
