class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new Statusbar();
    coinStatusbar = new CoinStatusbar();
    bottleStatusbar = new BottleStatusbar();
    throwableObjects = [];
    coins = [];
    bottles = [];
    collectedCoins = 0;
    collectedBottles = 0;
    gameOver = false;
    gameOverImage = new Image();
    backgroundImage = new Image();
    gameOverSound = new Audio('Audio/game over.wav');
    backgroundMusic = new Audio('Audio/Guitar.mp3');
    chickenDeadSound = new Audio('Audio/chicken_dead.mp3');
    soundOn = true;
    throwInProgress = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.coins = this.level.coins;
        this.bottles = this.level.bottles;
        this.backgroundImage.src = 'img/5_background/second_half_background.png';
        this.gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over.png';
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.3;
        this.backgroundMusic.play();

        this.draw();
        this.setWorld();
        this.run();
    }

    toggleSound() {
        this.soundOn = !this.soundOn;

        if (this.soundOn) {
            this.resumeAllSounds();
        } else {
            this.pauseAllSounds();
        }
    }


    playAllSounds() {
        this.backgroundMusic.play();
    }

    pauseAllSounds() {
        this.backgroundMusic.pause();
        if (!this.gameOverSound.paused) {
            this.gameOverSound.pause();
            this.gameOverSound.currentTime = 0;
        }
        if (!this.chickenDeadSound.paused) {
            this.chickenDeadSound.pause();
            this.chickenDeadSound.currentTime = 0;
        }
        this.character.pauseAllSounds();
        this.throwableObjects.forEach(object => object.pauseThrowSound());
    }




    resumeAllSounds() {
        if (this.backgroundMusic.paused) {
            this.backgroundMusic.play();
        }
        this.character.resumeAllSounds();
        if (!this.gameOverSound.paused && this.soundOn) {
            this.gameOverSound.play();
        }
        if (!this.chickenDeadSound.paused && this.soundOn) {
            this.chickenDeadSound.play();
        }
        this.throwableObjects.forEach(object => {
            if (object.throw_sound.paused) {
                object.throw_sound.play();
            }
        });
    }

    
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            if (!this.gameOver) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.checkCollectCoins();
                this.checkCollectBottles();
            }
        }, 200);

    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.gameOver) {
            if (this.collectedBottles > 0) {
                let direction = this.character.otherDirection ? -1 : 1;
                let bottle = new ThrowableObject(this.character.x, this.character.y, direction, this);
                this.throwableObjects.push(bottle);
                this.collectedBottles--;
                this.updateBottleStatusbar();
            }
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                const characterAboveEnemy =
                    this.character.y + this.character.height * 0.75 <= enemy.y &&
                    this.character.speedY > 0;
                const characterBelowEnemy =
                    this.character.y + this.character.height > enemy.y + enemy.height &&
                    this.character.speedY >= 0;
                if (characterAboveEnemy) {
                    this.killChicken(enemy);
                    this.character.speedY = 15;
                    this.character.y = enemy.y - this.character.height;
                } else if (characterBelowEnemy) {
                } else {
                    if (!enemy.isDead) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                        if (this.character.isDead()) {
                            this.handleGameOver();
                        }
                    }
                }
            }
        });
    }



    killChicken(chicken) {
        chicken.isDead = true;
        if (chicken instanceof ChickenSmall) {
            chicken.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
        } else {
            chicken.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        }
        if (this.soundOn && this.chickenDeadSound.paused) {
            this.chickenDeadSound.volume = 0.3;
            this.chickenDeadSound.play();
        }
        setTimeout(() => {
            const index = this.level.enemies.indexOf(chicken);
            if (index > -1) {
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }






    checkCollectCoins() {
        if (!this.gameOver) {
            this.coins.forEach((coin, index) => {
                if (this.character.isColliding(coin)) {
                    this.coins.splice(index, 1);
                    this.collectedCoins++;
                    const totalCoinsRequired = 10;
                    let coinPercentage = Math.min((this.collectedCoins / totalCoinsRequired) * 100, 100);
                    this.coinStatusbar.setPercentage(coinPercentage);
                }
            });
        }
    }

    checkCollectBottles() {
        if (!this.gameOver) {
            this.bottles.forEach((bottle, index) => {
                if (this.character.isColliding(bottle)) {
                    this.bottles.splice(index, 1);
                    this.collectedBottles++;
                    this.updateBottleStatusbar();
                }
            });
        }
    }

    updateBottleStatusbar() {
        const totalBottlesRequired = 5;
        let bottlePercentage = Math.min((this.collectedBottles / totalBottlesRequired) * 100, 100);
        this.bottleStatusbar.setPercentage(bottlePercentage);
    }

    handleGameOver() {
        this.gameOver = true;
        if (!this.backgroundMusic.paused) {
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }
        if (this.soundOn && this.gameOverSound.paused) {
            this.gameOverSound.volume = 0.3;
            this.gameOverSound.play();
        }

        if (this.character) {
            this.character.stopAllSounds();
        }
        this.showGameOver();
        document.getElementById('startButton').style.display = 'block';
    }




    showGameOver() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.gameOverImage, 0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        if (this.gameOver) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addtoMap(this.statusBar);
        this.addtoMap(this.coinStatusbar);
        this.addtoMap(this.bottleStatusbar);
        this.ctx.translate(this.camera_x, 0);

        this.addtoMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addtoMap(o);
        });
    }

    addtoMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}
