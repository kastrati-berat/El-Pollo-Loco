class Character extends MovableObject {
    
    height = 300;
    width = 150;
    y = 50;
    speed = 10;

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    world;
    walking_sound = new Audio('Audio/walk.mp3');
    jump_sound = new Audio('Audio/jump.mp3');
    snoring_sound = new Audio('Audio/schnarchen.mp3');
    idleTimer = 0; 
    longIdle = false;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {
    this.soundInterval = setInterval(() => {
        this.isMoving = false;
        
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (this.world.soundOn) {
                this.walking_sound.play();
            }
            this.isMoving = true;
        }

        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (this.world.soundOn) {
                this.walking_sound.play();
            }
            this.isMoving = true;
        }

        if (this.world.keyboard.UP && !this.isAboveGround()) {
            this.jump();
            this.isMoving = true;
            if (this.world.soundOn) {
                this.jump_sound.currentTime = 0;
                this.jump_sound.play();
            }
        }

        this.world.camera_x = -this.x + 100;


        if (this.world.keyboard.E) {
            if (this.world.soundOn) {
                this.throw_sound.currentTime = 0;
                this.throw_sound.play();
            }
        }

    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            if (this.isMoving) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTimer = 0;
                this.longIdle = false;
            } else {
                this.idleTimer += 50;
                if (this.idleTimer >= 6000) {
                    this.longIdle = true;
                    if (this.world.soundOn) {
                        this.snoring_sound.play();
                    }
                }

                if (this.longIdle) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                } else {
                    this.snoring_sound.pause();
                    this.snoring_sound.currentTime = 0;
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }
    }, 100);
}



    stopAllSounds() {
        this.pauseAllSounds();
        clearInterval(this.soundInterval);
        clearInterval(this.animationInterval);
    }

    pauseAllSounds() {
        [this.walking_sound, this.jump_sound, this.snoring_sound].forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
    
    resumeAllSounds() {
        if (this.world.soundOn) {
            if (this.isMoving) {
                this.walking_sound.play();
            }
            if (this.longIdle) {
                this.snoring_sound.play();
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump_sound.play();
            }
        }
    }
    
}