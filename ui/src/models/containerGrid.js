import uuidv1 from 'uuid/v1';

import { CONTAINER_ROW_HEADERS } from '../constants';
import { createContainer } from './container';

export const createContainerGrid = (
  id,
  subType,
  barcode,
  dimensions,
  attributes,
  positionComponents
) => {
  const grid = [];
  const { rows, columns } = dimensions;
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = CONTAINER_ROW_HEADERS[i];
    for (let j = 0; j < columns; j++) {
      const location = {
        row: rowLetter,
        column: j + 1,
        container: null,
      };
      if (subType === 'Plate') {
        if (positionComponents) {
          const components = positionComponents[location.row + location.column];
          location.container = createContainer(
            null,
            'PlateWell',
            null,
            components
          );
        } else {
          location.container = createContainer(null, 'PlateWell', null);
        }
      }
      row.push(location);
    }
    grid.push(row);
  }
  return {
    id: uuidv1(),
    type: 'ContainerGrid',
    subType,
    name: null,
    barcode,
    dimensions,
    grid,
    attributes: attributes || [],
  };
};
