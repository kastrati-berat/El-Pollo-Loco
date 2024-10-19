let level1;

function initLevel() {
    level1 = new Level(
        [
            createChickenWithSpacing(Chicken, 0),
            createChickenWithSpacing(ChickenSmall, 250), 
            createChickenWithSpacing(Chicken, 400), 
            createChickenWithSpacing(ChickenSmall, 550), 
            createChickenWithSpacing(Chicken, 600), 
            createChickenWithSpacing(Chicken, 750), 
            createChickenWithSpacing(ChickenSmall, 850), 
            createChickenWithSpacing(Chicken, 1000), 
            createChickenWithSpacing(ChickenSmall, 1200),
            createChickenWithSpacing(Chicken, 1350), 
            new Endboss(), 
        ],

        [
            new Cloud('img/5_background/layers/4_clouds/1.png', 10),
            new Cloud('img/5_background/layers/4_clouds/2.png', 500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 1000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 1500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 2000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 2500),
            new Cloud('img/5_background/layers/4_clouds/1.png', 3000),
            new Cloud('img/5_background/layers/4_clouds/2.png', 3500),
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],
    );
}

// Funktion zur Erstellung von Hühnern mit festem Abstand
function createChickenWithSpacing(ChickenClass, offset) {
    const chicken = new ChickenClass();
    chicken.x = 700 + offset; // Setze den x-Wert basierend auf dem Offset
    return chicken;
}
