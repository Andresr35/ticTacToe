/**
 *Gameboard Module
 *
 * @return  {Gameboard}  game board
 */
const gameboard = (() => {
  let board = [
    [null,null,null],
    ["x", "o", "x"],
    ["x", "o", "x"],
  ];
  const game = document.querySelector("main");
  const setupGame = () => {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const div = document.createElement('div');
        div.id = `${x}${y}`;
        div.textContent = `${board[y][x]}`;
        game.appendChild(div);
      }
    }
  };
  return{setupGame,};
})();

const Players = () => {};
const Game = () => {};

gameboard.setupGame();
const div1 = 