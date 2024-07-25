class CoinStatusbar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png'
    ];

    coinPercentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 60; 
        this.width = 200;
        this.height = 60;
        this.setPercentage(0); 
    }

    setPercentage(coinPercentage) {
        this.coinPercentage = coinPercentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.coinPercentage >= 100) {
            return 0;
        } else if (this.coinPercentage >= 80) {
            return 1;
        } else if (this.coinPercentage >= 60) {
            return 2;
        } else if (this.coinPercentage >= 40) {
            return 3;
        } else if (this.coinPercentage >= 20) {
            return 4;
        } else {
            return 5;
        }
    }
}