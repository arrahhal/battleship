export const TurnManager = (() => {
  let currentPlayer;
  let nextPlayer;
  let currentGameboard;
  let nextGameboard;
  let isGameOver = false;

  const init = (player1, player2, gameboard1, gameboard2) => {
    currentPlayer = player1;
    nextPlayer = player2;
    currentGameboard = gameboard1;
    nextGameboard = gameboard2;
    isGameOver = false;
  };

  const getCurrentPlayer = () => currentPlayer;
  const getNextPlayer = () => nextPlayer;
  const isGameover = () => isGameOver;

  const endTurn = () => {
    if (currentGameboard.isGameOver()) {
      isGameOver = true;
    }
    const temp = currentPlayer;
    currentPlayer = nextPlayer;
    nextPlayer = temp;
    const tempGameboard = currentGameboard;
    currentGameboard = nextGameboard;
    nextGameboard = tempGameboard;
  };

  return {
    init,
    getCurrentPlayer,
    getNextPlayer,
    isGameover,
    endTurn,
  };
})();
