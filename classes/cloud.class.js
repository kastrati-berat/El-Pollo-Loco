class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 300;

    constructor(image, initialX) {
        super().loadImage(image);
        this.x = initialX;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
    
}