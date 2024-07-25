class Bottle extends DrawableObject {
    IMAGES = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    currentImageIndex = 0; 
    switchInterval = 500;

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 150; 
        this.height = 150; 
        this.setImage();
        this.startImageSwitch();
    }

    setImage() {
        this.img = this.imageCache[this.IMAGES[this.currentImageIndex]];
    }

    toggleImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES.length;
        this.setImage();
    }

    startImageSwitch() {
        setInterval(() => {
            this.toggleImage();
        }, this.switchInterval);
    }

    draw(ctx) {
        super.draw(ctx);
    }
}

