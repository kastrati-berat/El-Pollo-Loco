class Endboss extends MovableObject {

    height = 500;
    width = 300;
    y = -40;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2600; // Startposition des Endbosses
        this.animate();
    }

    animate() {
        let walking = true; // Flag, um zwischen Animationen zu wechseln
        let alertAnimationPlayed = false;
        let alertIndex = 0; // Startindex für die Alarm-Animation
        let alertInterval; // Intervall für die Alarm-Animation

        // Bewegt den Endboss
        setInterval(() => {
            if (this.x > 2400 && walking) {
                this.x -= 2;  // Bewegt den Endboss nach links
                this.playAnimation(this.IMAGES_WALKING); // Geh-Animation abspielen
            } else if (this.x <= 2300 && !alertAnimationPlayed) {
                walking = false; // Stoppt die Geh-Animation
                alertAnimationPlayed = true; // Sicherstellen, dass die Alarm-Animation nur einmal abgespielt wird
                this.playAlertAnimation(); // Alarm-Animation abspielen
            }
        }, 100); // Animation alle 100ms
    }

    // Methode zum Abspielen der Alarm-Animation
    playAlertAnimation() {
        let alertIndex = 0; // Initialisierung des Index

        const alertInterval = setInterval(() => {
            if (alertIndex < this.IMAGES_ALERT.length) {
                this.loadImage(this.IMAGES_ALERT[alertIndex]); // Bild laden
                this.playAnimation([this.IMAGES_ALERT[alertIndex]]); // Bild anzeigen
                console.log("Aktuelles Bild der Alarm-Animation:", this.IMAGES_ALERT[alertIndex]); // Debugging
                alertIndex++; // Erhöht den Index für das nächste Bild
            } else {
                clearInterval(alertInterval); // Stoppt das Intervall nach der letzten Animation
            }
        }, 200); // Animation alle 200ms
    }
}
