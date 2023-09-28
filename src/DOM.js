import { selectors } from './helpers/selectors'

const DOM = (() => {
  const matrixToTable = (matrix = [], isShipsShown = false) => {
    let tableBody = document.createElement('tbody');
    const table = document.createElement('table');
    table.appendChild(tableBody);
    matrix.forEach((row, rowIndex) => {
      let tableRow = document.createElement('tr');
      row.forEach((col, colIndex) => tableRow.innerHTML += `<td class="${col.isHit ? (col.occupant ? (col.occupant.isSunk() ? 'sunk' : 'hit') : 'mis') : ''}${isShipsShown ? (col.occupant ? 'ship' : '') : ''}" data-x="${colIndex}" data-y="${rowIndex}"></td>`)
      tableBody.appendChild(tableRow);
    })
    return table;
  }
  return {
    generateTableFromMatrix,
  }
})();

export { DOM };
