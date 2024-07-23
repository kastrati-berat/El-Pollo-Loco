class Level{
    enemies;
    clouds;
    backgroundObjects;
    coins = [];
    level_end_x = 2200;

    constructor(enemies,clouds,backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.generateCoins();
    }

    generateCoins() {
        this.coins.push(new Coin(200, 150)); 
        this.coins.push(new Coin(400, 250)); 
        this.coins.push(new Coin(600, 100)); 
        this.coins.push(new Coin(800, 200)); 
        this.coins.push(new Coin(1000, 150));
        this.coins.push(new Coin(1200, 250));
        this.coins.push(new Coin(1400, 100));
        this.coins.push(new Coin(1600, 200));
        this.coins.push(new Coin(1800, 150));  
        this.coins.push(new Coin(2000, 250));
    }
}