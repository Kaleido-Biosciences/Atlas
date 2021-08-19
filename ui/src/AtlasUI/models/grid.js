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
  containerType = null,
  name = null,
  barcode = null,
  dimensions = null,
  data = null,
  attributes = [],
}) {
  let rHeaders = [],
    cHeaders = [];
  if (dimensions.rows > 0) {
    rHeaders = rowHeaders.slice(0, dimensions.rows);
  }
  if (dimensions.columns > 0) {
    for (let i = 0; i < dimensions.columns; i++) {
      cHeaders.push(i + 1);
    }
  }
  return {
    id: id || uuidv4(),
    type: 'Grid',
    containerType,
    name,
    barcode,
    dimensions,
    data,
    attributes,
    rowHeaders: rHeaders,
    columnHeaders: cHeaders,
  };
}

export function createGridData(dimensions) {
  const data = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const rowLetter = rowHeaders[i];
    for (let j = 0; j < columns; j++) {
      data.push(createGridPosition(rowLetter, j + 1));
    }
  }
  return data;
}

export function createContainersForGrid(dimensions, containerType) {
  const positions = [];
  const { rows, columns } = dimensions;
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
    const gridPosition = grid.data.find((gridPosition) => {
      return gridPosition.name === containerPosition.name;
    });
    gridPosition.container = containerPosition.container;
  });
}
