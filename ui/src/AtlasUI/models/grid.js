import { v4 as uuidv4 } from 'uuid';
import { createContainer } from './container';

const rowHeaders = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export function createGrid({
  id = null,
  rows = null,
  columns = null,
  containerType = null,
  name = null,
  barcode = null,
  positions = null,
  attributes = [],
  sortKey = null,
}) {
  return {
    id: id || uuidv4(),
    type: 'Grid',
    rows,
    columns,
    containerType,
    name,
    barcode,
    positions,
    attributes,
    rowHeaders: createRowHeaders(rows),
    columnHeaders: createColumnHeaders(columns),
    sortKey,
  };
}

export function createRowHeaders(numRows) {
  let rHeaders = [];
  if (numRows) {
    rHeaders = rowHeaders.slice(0, numRows);
  }
  return rHeaders;
}

export function createColumnHeaders(numCols) {
  let cHeaders = [];
  if (numCols) {
    for (let i = 0; i < numCols; i++) {
      cHeaders.push(i + 1);
    }
  }
  return cHeaders;
}

export function createGridPositions(dimensions) {
  const positions = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const rowLetter = rowHeaders[i];
    for (let j = 0; j < columns; j++) {
      positions.push(createGridPosition(rowLetter, j + 1));
    }
  }
  return positions;
}

export function createContainersForGrid(rows, columns, containerType) {
  const positions = [];
  for (let i = 0; i < rows; i++) {
    const rowLetter = rowHeaders[i];
    for (let j = 0; j < columns; j++) {
      positions.push(
        createGridPosition(rowLetter, j + 1, createContainer({ containerType }))
      );
    }
  }
  return positions;
}

export function createGridPosition(row, column, container) {
  return {
    row,
    column,
    container: container || null,
    name: `${row}${column}`,
  };
}

export function addContainersToGrid(grid, containerPositions) {
  containerPositions.forEach((containerPosition) => {
    const gridPosition = grid.positions.find((gridPosition) => {
      return gridPosition.name === containerPosition.name;
    });
    gridPosition.container = containerPosition.container;
  });
}
