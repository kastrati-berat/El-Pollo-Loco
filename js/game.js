let canvas;
let ctx;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };


    let startButton = document.getElementById('startButton');
    startButton.style.display = 'block';
    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        initGame();
    });

    let soundButton = document.getElementById('soundButton');
    let soundImage = document.getElementById('soundImage');

    soundButton.addEventListener('click', () => {
        if (soundImage.src.includes('icons8-stumm-100.png')) {
            soundImage.src = 'img/icons8-ton-100.png';
            world.toggleSound(true);
        } else {
            soundImage.src = 'img/icons8-stumm-100.png';
            world.toggleSound(false);
        }
    });

}


function openDialog() {
    document.getElementById('dialog').style.display = 'block';
    document.getElementById('dialog-overlay').style.display = 'block';
}


function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
    document.getElementById('dialog-overlay').style.display = 'none';
}


function initGame() {
    initLevel();
    world = new World(canvas, keyboard);
    console.log('My character is', world.character);
}


window.addEventListener("keydown", (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 87) {
        keyboard.UP = true;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 69) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 68) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 65) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 87) {
        keyboard.UP = false;
    }
    if (e.keyCode == 83) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 69) {
        keyboard.D = false;
    }
});
