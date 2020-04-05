import uuidv1 from 'uuid/v1';

import { CONTAINER_ROW_HEADERS } from '../constants';
import { createContainer } from './container';

export const createGrid = ({
  id = null,
  type = null,
  name = null,
  displayName = null,
  barcode = null,
  dimensions = null,
  data = null,
  attributes = [],
}) => {
  return {
    id: id || uuidv1(),
    type,
    name,
    displayName,
    barcode,
    dimensions,
    data,
    attributes,
  };
};

export const createGridData = (dimensions) => {
  const data = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = CONTAINER_ROW_HEADERS[i];
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

export const createContainersForGrid = (dimensions, containerType) => {
  const positions = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const rowLetter = CONTAINER_ROW_HEADERS[i];
    for (let j = 0; j < columns; j++) {
      const position = {
        row: rowLetter,
        column: j + 1,
        container: createContainer({ subtype: containerType }),
      };
      positions.push(position);
    }
  }
  return positions;
};

export const addContainersToGrid = (grid, containerPositions) => {
  containerPositions.forEach((containerPosition) => {
    const rowIndex = CONTAINER_ROW_HEADERS.findIndex(
      (rowLetter) => rowLetter === containerPosition.row
    );
    grid.data[rowIndex][containerPosition.column - 1].container =
      containerPosition.container;
  });
};
