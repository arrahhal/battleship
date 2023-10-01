import { selectors } from './helpers/selectors'

const DOM = (() => {
  const matrixToTable = (matrix = [], isShipsShown = false) => {
    let tableBody = document.createElement('tbody');
    const table = document.createElement('table');
    table.appendChild(tableBody);
    matrix.forEach((row, rowIndex) => {
      let tableRow = document.createElement('tr');
      row.forEach((col, colIndex) => tableRow.innerHTML += `<td class="${col.isHit ? (col.occupant ? (col.occupant.isSunk() ? 'sunk' : 'hit') : 'mis') : ''} ${isShipsShown ? (col.occupant ? 'ship' : '') : ''}" data-x="${colIndex}" data-y="${rowIndex}"></td>`)
      tableBody.appendChild(tableRow);
    })
    return table;
  }

  const clearElement = (element) => {
    element.textContent = "";
  }

  const appendTableToPlaceholder = (table, placeholder) => {
    clearElement(placeholder);
    placeholder.appendChild(table);
  }

  const updatePlayerTable = (matrix) => {
    const playerTable = matrixToTable(matrix, true);
    appendTableToPlaceholder(playerTable, selectors.tablePlayerPlaceholder);
  }

  const updateOpponentTable = (matrix) => {
    const opponentTable = matrixToTable(matrix)
    appendTableToPlaceholder(opponentTable, selectors.tableOpponentPlaceholder);
  }

  let typingTimeout;
  function log(something, index = 0) {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    clearLog();
    function typeNextChar() {
      if (index < something.length) {
        selectors.log.textContent += something.charAt(index);
        index++;
        typingTimeout = setTimeout(typeNextChar, 50);
      }
    }
    typeNextChar();
  }

  const clearLog = () => {
    clearElement(selectors.log);
  }

  function logStart() {
    clearLog();
    log(`Battleship game started...`);
  }

  const logGameOver = (winner = '')  => {
    log(`Game is over. ${winner ? winner.name + " is the winner. " : ''}click restart button to play again...`);
  }

  return {
    updateOpponentTable,
    updatePlayerTable,
    logStart,
    logGameOver,
  }
})();

export { DOM };
