export class Bomb {
    constructor() {
        this.timesPlanted = 0;
    };
    plantBomb() {
        (this.timesPlanted == 0) ? this.timesPlanted++ : this.throwError();
    };
    throwError() {
        throw new Error('Bomb can be planted only once');
    }
}

export class Game {
    constructor() {
        this.counterTerroristsWins = 0;
        this.terroristsWins = 0;
    }
    winTerrorists() {
        this.terroristsWins++;
    }
    winCounterTerrorists() {
        this.counterTerroristsWins++;
    }
    isVictory() {
        ((this.terroristsWins == 2)||(this.counterTerroristsWins == 2)) ? this.winGame() : {};
    }

    winGame() {
        console.log('Game is won!');
    }
}
