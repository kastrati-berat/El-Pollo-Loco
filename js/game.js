let canvas;
let ctx;

let world = new World();

function init(){
    canvas = document.getElementById('canvas');
    ctx = ctx = canvas.getContext('2d');

    console.log('My character is', world.character);
}