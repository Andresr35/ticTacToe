/**
 *Gameboard Module
 *
 * @return  {Gameboard}  game board
 */
const gameboard = (() => {
  let board = [
    [null, null, null],
    ["x", "o", "x"],
    ["x", "o", "x"],
  ];
  const game = document.querySelector("main");

  const setupGame = () => {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const div = document.createElement("div");
        div.id = `d${x}${y}`;
        div.textContent = `${board[y][x]}`;
        game.appendChild(div);
      }
    }
  };
  const changeBoard = (id, player) => {
    board[id[1]][id[0]] = player.team;
  };
  return { setupGame, changeBoard };
})();

const Player = () => {
  let team = null;
  let turn = false;
  const startTurn = () => {
    turn = true;
  };
  const endTurn = () => {
    turn = false;
  };
  const giveTeam = (element) => {
    team = element;
  };
  const getTeam = ()=>team;
  return {startTurn,endTurn,giveTeam,getTeam};
};

const game = (() => {
  /**
   * the Player type of whos turn it is
   *
   * @var {Player}
   */
  let currentTurn = null;
   let turns = 0;
  const playerOne = Player();
  const playerTwo = Player();

  const firstTurn = () => {
    currentTurn = playerOne;
    console.log("it is player ones turn");
    console.log(playerOne);
    playerOne.startTurn();
    playerTwo.endTurn();
  };

  const sencondTurn = () => {
    currentTurn = playerTwo;
    playerTwo.startTurn();
    playerOne.endTurn();
  };
  const getCurrentTurn =()=> currentTurn;

  const start = () => {
    gameboard.setupGame();
    const starting = Math.floor(Math.random() * 2); // Picks a random number from 1 to 2
    if (starting == 1) {
      firstTurn();
    } else {
      sencondTurn();
    }
    playerOne.giveTeam("x");
    playerTwo.giveTeam("O");
  };

  const changeTurn =()=>{
    
  }

  return {start,getCurrentTurn};
})();

game.start();
const div1 = document.querySelector("#d00");

div1.addEventListener("click", () => {
  console.log(game);
  div1.textContent = game.getCurrentTurn().getTeam();
});
