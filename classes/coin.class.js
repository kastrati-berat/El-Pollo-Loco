class Coin extends DrawableObject {
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    currentImageIndex = 0; 
    switchInterval = 500;

    constructor(x, y) {
        super();
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 200; 
        this.height = 170; 
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
