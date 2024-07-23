class ThrowableObject extends MovableObject {
    throw_sound = new Audio('Audio/throwing_bottles.mp3');
    direction = 1;

    constructor(x, y, direction) {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 120;
        this.direction = direction;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throw_sound.volume = 0.3;
        this.throw_sound.play();
        setInterval(() => {
            this.x += 10 * this.direction;
        }, 25);
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
