class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accerlation = 2.5;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {

                this.y -= this.speedY;
                this.speedY -= this.accerlation;
            }
        }, 1000 / 25);

    }

    isAboveGround() {
        return this.y < 130;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "blue";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
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

}