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

  const clearHighlights = () => {
    document.querySelectorAll('td.highlight').forEach(td => td.classList.remove('highlight'));
  }

  const highlightOverflow = () => {
    document.querySelector(':root').style.setProperty('--clr-highlight', 'red');
  }

  const highlightDefault = () => {
    document.querySelector(':root').style.removeProperty('--clr-highlight');
  }

  const highlightPlace = (x, y, len, dir) => {
    clearHighlights();
    let target;
    if (dir === 'h') {
      for (let i = 0; i < len; i++) {
        target = document.querySelector(`[data-x="${x + i}"][data-y="${y}"]`);
        if (target) {
          target.classList.add('highlight');
          highlightDefault();
        }
        else {
          highlightOverflow();
        }
      }
    }
    if (dir === 'v') {
      for (let i = 0; i < len; i++) {
        document.querySelector(`[data-x="${x}"][data-y="${y + i}"]`).classList.add('highlight');
      }
    }
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

  const logGameOver = (winner = '') => {
    log(`Game is over. ${winner ? winner.name + " is the winner. " : ''}click restart button to play again...`);
  }

  return {
    updateOpponentTable,
    updatePlayerTable,
    logStart,
    logGameOver,
    highlightPlace,
    clearHighlights,
  }
})();

export { DOM };
