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

  const highlightReserved = () => {
    const shipTiles = document.querySelectorAll('td.ship');
    shipTiles.forEach(tile => {
      const x = Number(tile.dataset.x);
      const y = Number(tile.dataset.y);
      tile.classList.add('reserved');
      for (let i = -1, j = 1; i <= 1; i++, j--) {
        const nearbyX = selectors.tablePlayerPlaceholder.querySelector(`[data-y="${y}"][data-x="${x + i}"]`);
        const nearbyY = selectors.tablePlayerPlaceholder.querySelector(`[data-y="${y + i}"][data-x="${x}"]`);
        const nearbyXY = selectors.tablePlayerPlaceholder.querySelector(`[data-y="${y + i}"][data-x="${x + i}"]`)
        const nearbyYX = selectors.tablePlayerPlaceholder.querySelector(`[data-y="${y + j}"][data-x="${x + i}"]`)
        if (nearbyX) nearbyX.classList.add('reserved');
        if (nearbyY) nearbyY.classList.add('reserved');
        if (nearbyXY) nearbyXY.classList.add('reserved');
        if (nearbyYX) nearbyYX.classList.add('reserved');
      }
    })
  }

  const removeReservedHighlights = () => {
    document.querySelectorAll('td.reserved').forEach(el => el.classList.remove('reserved'));
  }

  const removeShipHighlights = () => {
    document.querySelectorAll('td.highlight').forEach(td => td.classList.remove('highlight'));
  }

  const highlightOverflow = () => {
    document.querySelector(':root').style.setProperty('--clr-highlight', 'red');
  }

  const highlightDefault = () => {
    document.querySelector(':root').style.removeProperty('--clr-highlight');
  }

  const highlightShip = (y, x, len, dir) => {
    removeShipHighlights();

    const highlightCell = (y, x) => {
      const target = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      if (target) {
        target.classList.add('highlight');
        highlightDefault();
      }
      else {
        highlightOverflow();
      }
    }
    if (dir === 'h') {
      for (let i = 0; i < len; i++) {
        highlightCell(y, x + i);
      }
    }
    if (dir === 'v') {
      for (let i = 0; i < len; i++) {
        highlightCell(y + i, x);
      }
    }
  }

  const highlightPlaces = (y, x, len, dir) => {
    highlightShip(y, x, len, dir);
    highlightReserved();
  }

  const removeHighlights = () => {
    removeShipHighlights();
    removeReservedHighlights();
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
    log(`Start attacking your opponent 🎯`);
  }

  const logGameOver = (winner = '') => {
    log(`Congrats 🎉. ${winner ? winner.name + " is the winner." : ''} click restart button to play again...`);
  }

  const logPlace = (reminder) => {
    log(`There are ${reminder} ships 🚢 remind. hover on your board to place them.`);
  }

  const logAttackResult = (cell) => {
    if (cell.occupant) {
      if (cell.occupant.isSunk()) {
        log('Great job. an enemy ship has been sunk ☠️');
        return;
      }
      log('You hit a ship tile, keep attacking it 🌊')
      return;
    }
    log('missed shot')
  }

  return {
    updateOpponentTable,
    updatePlayerTable,
    logStart,
    logGameOver,
    highlightPlaces,
    removeHighlights,
    logPlace,
    logAttackResult,
  }
})();

export { DOM };
