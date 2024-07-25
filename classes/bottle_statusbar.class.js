class BottleStatusbar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png'
    ];

    bottlePercentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 105; 
        this.width = 200;
        this.height = 60;
        this.setPercentage(0); 
    }

    setPercentage(bottlePercentage) {
        this.bottlePercentage = bottlePercentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.bottlePercentage >= 100) {
            return 0;
        } else if (this.bottlePercentage >= 80) {
            return 1;
        } else if (this.bottlePercentage >= 60) {
            return 2;
        } else if (this.bottlePercentage >= 40) {
            return 3;
        } else if (this.bottlePercentage >= 20) {
            return 4;
        } else {
            return 5;
        }
    }
}
