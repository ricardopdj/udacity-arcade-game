class Enemy {
    constructor(y) {
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random() * 300) + 50;
        this.x = -170;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update(dt) {
        this.x = this.x + this.speed * dt;
        if (player.x + 70 > this.x && player.x < this.x + 100 && player.y + 85 > this.y && player.y < this.y + 70) {
            player.crashed();
        }
    }
}

class Player {
    constructor() {
        this.x = 200;
        this.y = 390;
        this.sprite = 'images/char-boy.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        if (this.y == -35) {
            $message.style.display = "block";
            clearInterval(teste);
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

// Game variables;
let player = new Player(),
    allEnemies = new Array(),
    enemiesRows = [60, 140, 225],
    allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
let teste;
let $message = document.getElementById("message");

class Game {
    constructor() {
        document.addEventListener('keyup', function (e) {
            player.handleInput(allowedKeys[e.keyCode]);
        });
        this.addEnemies();
        teste = setInterval(
            this.addEnemies.bind(this),
            2500
        )
    }
    addEnemies() {
        for (let index = 0; index < 3; index++) {
            let y = enemiesRows[index];
            allEnemies.push(new Enemy(y));
        }
    }
}

new Game();