/**
 *Gameboard Module
 *
 * @return  {Gameboard}  game board
 */
const gameboard = (() => {
  let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const mainContainer = document.querySelector("main");

  const setupGame = () => {
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const div = document.createElement("div");
        div.id = `d${x}${y}`;
        div.textContent = `${board[y][x]}`;
        mainContainer.appendChild(div);
      }
    }
    Array.from(mainContainer.children).forEach((div, index) => {
      div.addEventListener(
        "click",
        () => {
          div.textContent = game.getCurrentTurn().getTeam();
          changeBoard(div.id, game.getCurrentTurn());
          const message = document.querySelector('.messageCenter');
          if(checkForWinner()!==undefined){
            
            message.textContent ="Player "+  checkForWinner()+" Has won!";
            game.reset();
          }else if (game.getTurns()>7){
            message.textContent = "There was a tie!";
            game.reset()
          }else{
            game.changeTurn();
          }
        },
        { once: true }
      );
    });
  };

  const changeBoard = (id, player) => {
    board[id[2]][id[1]] = player.getTeam();
  };

  const checkForWinner = () => {
    let column1s = 0,
      column2s = 0,
      column3s = 0,
      cross1 = 0,
      cross2 = 0;
    for (let i = 0; i < 3; i++) {
      const counter = 2 - i;
      if (JSON.stringify(board[i]) == JSON.stringify(["X", "X", "X"])) {
        return "One";
      } else if (JSON.stringify(board[i]) == JSON.stringify(["O", "O", "O"])) {
        return "Two";
      }
      if (board[i][2] == "X") column3s++;
      if (board[i][2] == "O") column3s--;
      if (board[i][1] == "X") column2s++;
      if (board[i][1] == "O") column2s--;
      if (board[i][0] == "X") column1s++;
      if (board[i][0] == "O") column1s--;
      if (board[i][i] == "X") cross1++;
      if (board[i][i] == "O") cross1--;
      if (board[counter][i] == "X") cross2++;
      if (board[counter][i] == "O") cross2--;
      if (
        column1s == 3 ||
        column2s == 3 ||
        column3s == 3 ||
        cross1 == 3 ||
        cross2 == 3
      )
        return "One";
      if (
        column1s == -3 ||
        column2s == -3 ||
        column3s == -3 ||
        cross1 == -3 ||
        cross2 == -3
      )
        return "Two";
    }
  };

  const deleteBoard = ()=>mainContainer.replaceChildren();
  

  return { setupGame,deleteBoard };
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
  const getTeam = () => team;
  return { startTurn, endTurn, giveTeam, getTeam };
};

const game = (() => {
  /**
   * the Player type of whos turn it is
   *
   * @var {Player}
   */
  let currentTurn = null;
  let turns = 0;
  const getTurns =()=>turns;
  const playerOne = Player();
  const playerTwo = Player();

  const firstTurn = () => {
    currentTurn = playerOne;
    console.log("it is player ones turn");
    playerOne.startTurn();
    playerTwo.endTurn();
  };

  const sencondTurn = () => {
    currentTurn = playerTwo;
    console.log("It is player twos turn");
    playerTwo.startTurn();
    playerOne.endTurn();
  };
  const getCurrentTurn = () => currentTurn;

  const start = () => {
    gameboard.setupGame();
    const starting = Math.floor(Math.random() * 2); // Picks a random number from 1 to 2
    if (starting == 1) {
      firstTurn();
    } else {
      sencondTurn();
    }
    playerOne.giveTeam("X");
    playerTwo.giveTeam("O");
  };

  const changeTurn = () => {
    turns++;
    if (currentTurn == playerOne) {
      sencondTurn();
    } else if ((currentTurn = playerTwo)) {
      firstTurn();
    }
  };
  const reset = ()=>{
    gameboard.deleteBoard();
    game.start();
    turns = 0;
  }

  return { start, getCurrentTurn, changeTurn ,reset,getTurns};
})();

game.start();
