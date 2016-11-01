// ## Игра Counter Strike
// * Террорист закладывает бомбу
// * Если бомба не обезврежена, происходит взрыв террористы выигрывают
// * Если бомбу успевают обезвредить, выигрывает спецназ
// * Бомбу можно закладывать только 1 раз за в раунде
// * Для того, чтобы выиграть игру, нужно выиграть 2 раунда

import { Bomb, Game } from '../src/CounterStrike'
import assert from 'assert'
import sinon from 'sinon'

suite('Counter Strike Game', function() {
    suite('When terrorist plants bomb', function() {
        test('Behavior: The bomb is planted', function() {
             let Bomb = {
                 isPlanted : false,
                 plantBomb : function() {
                     this.isPlanted = true;
                 }
             };
             Bomb.plantBomb();
             assert.equal(Bomb.isPlanted, true);
        })
        test('Behavior: The bomb can NOT be planted more than once', function() {
            let bomb = new Bomb;
            let bombMock = sinon.mock(bomb);
            bombMock.expects('throwError').once();
            bomb.plantBomb();
            try {bomb.plantBomb();}
            catch (err){};
            bombMock.restore();
            bombMock.verify();
        })
    })
    suite('When bomb is planted', function() {
        suite('When bomb is defused', function () {
            test('Behavior: Counter-terrorists win', function () {
                let bomb = {
                  defuseBomb : function(game) {
                      game.winCounterTerrorists();
                  }
                };
                let game = new Game;
                let gameMock = sinon.mock(game);
                gameMock.expects('winCounterTerrorists').once();
                bomb.defuseBomb(game);
                gameMock.restore();
                gameMock.verify();
            })
        })
        suite('When bomb is NOT defused', function () {
            test('Behavior: Terrorists win', function () {
                let bomb = {
                    explode : function(game) {
                        game.winTerrorists();
                    }
                };
                let game = new Game;
                let gameMock = sinon.mock(game);
                gameMock.expects('winTerrorists').once();
                bomb.explode(game);
                gameMock.restore();
                gameMock.verify();
            })
        })
    })
    suite('When 2 rounds won', function() {
        test('Behavior: Game is won', function() {
            let game = new Game;
            game.terroristsWins = 2;
            let gameMock = sinon.mock(game);
            gameMock.expects('winGame').once();
            game.isVictory();
            gameMock.restore();
            gameMock.verify();
        })
    })
})