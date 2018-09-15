class Char {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Char {
    constructor(x = -170, y, sprite = 'images/enemy-bug.png') {
        super(x, y, sprite);
        this.speed = Math.floor(Math.random() * 300) + 50;
    }

    update(dt) {
        this.x = this.x + this.speed * dt;
        if (this.x >= 505) {
            this.x = -170;
        }
        if (player.x + 70 > this.x && player.x < this.x + 100 && player.y + 85 > this.y && player.y < this.y + 70) {
            player.crashed();
        }
    }
}

class Player extends Char {
    constructor(x = 200, y = 390, sprite = 'images/char-boy.png') {
        super(x, y, sprite);
    }

    update() {
        if (this.y == -35) {
            game.finish();
        }
    }

    crashed() {
        this.x = 200;
        this.y = 390;
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

class Game {
    constructor() {
        this.handleMoves();
        this.addEnemies();
    }
    handleMoves() {
        document.addEventListener('keyup', function (e) {
            player.handleInput(allowedKeys[e.keyCode]);
        });
    }
    addEnemies() {
        for (let index = 0; index < 3; index++) {
            let y = enemiesRows[index];
            allEnemies.push(new Enemy(-170, y));
        }
    }
    finish() {
        message.style.display = 'block';
        allEnemies = new Array();
    }
}

let message = document.getElementById('message');
let allEnemies = new Array(),
enemiesRows = [60, 140, 225],
allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
const game = new Game();
const player = new Player();