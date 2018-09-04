const enemiesRows = [60, 140, 225];
const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
let allEnemies = new Array();

class Enemy {
    constructor () {
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random() * 300) + 50;
        this.x = 0;
        this.y = enemiesRows[Math.floor(Math.random()*enemiesRows.length)];
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        this.x = this.x + this.speed * dt;
    }
}

class Player {
    constructor () {
        this.x = 200;
        this.y = 390;
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
    }

    crashed() {

    }

    handleInput(key) {
        switch (key) {
            case 'left':
                if (this.x >= 100) {
                    this.x -= 100;
                }
                break;
            case 'up':
                if (this.y >= 0) {
                    this.y -= 85;
                }
                break;
            case 'right':
                if (this.x <= 300) {
                    this.x += 100;
                }
                break;
            case 'down':
                if (this.y <= 305) {
                    this.y += 85;
                }
                break;

            default:
                break;
        }

    }
}

let enemy = new Enemy();
allEnemies.push(enemy);
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    player.handleInput(allowedKeys[e.keyCode]);
});