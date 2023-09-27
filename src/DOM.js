import { selectors } from './helpers/selectors'

const DOM = (() => {
  const generateTableFromMatrix = (matrix = []) => {
    let tableBody = document.createElement('tbody');
    const table = document.createElement('table');
    table.appendChild(tableBody);
    matrix.forEach((row, rowIndex) => {
      let tableRow = document.createElement('tr');
      row.forEach((col, colIndex) => tableRow.innerHTML += `<td class="${col.isHit ? (col.occupant ? (col.isSunk ? 'sunk' : 'hit') : 'mis') : ''}" data-x="${colIndex}" data-y="${rowIndex}"></td>`)
      tableBody.appendChild(tableRow);
    })
    return table;
  }
  return {
    generateTableFromMatrix,
  }
})();

export { DOM };
