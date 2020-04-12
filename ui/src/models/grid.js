import uuidv1 from 'uuid/v1';

import { createContainer } from './container';

export const createGrid = ({
  id = null,
  containerType = null,
  name = null,
  displayName = null,
  barcode = null,
  dimensions = null,
  data = null,
  attributes = [],
}) => {
  return {
    id: id || uuidv1(),
    type: 'Grid',
    containerType,
    name,
    displayName,
    barcode,
    dimensions,
    data,
    attributes,
  };
};

export const createGridData = (dimensions, rowHeaders) => {
  const data = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = rowHeaders[i];
    for (let j = 0; j < columns; j++) {
      const position = {
        row: rowLetter,
        column: j + 1,
        container: null,
      };
      row.push(position);
    }
    data.push(row);
  }
  return data;
};

export const createContainersForGrid = (
  dimensions,
  containerType,
  rowHeaders
) => {
  const positions = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const rowLetter = rowHeaders[i];
    for (let j = 0; j < columns; j++) {
      const position = {
        row: rowLetter,
        column: j + 1,
        container: createContainer({ containerType }),
      };
      positions.push(position);
    }
  }
  return positions;
};

export const addContainersToGrid = (grid, containerPositions, rowHeaders) => {
  containerPositions.forEach((containerPosition) => {
    const rowIndex = rowHeaders.findIndex(
      (rowLetter) => rowLetter === containerPosition.row
    );
    grid.data[rowIndex][containerPosition.column - 1].container =
      containerPosition.container;
  });
};
