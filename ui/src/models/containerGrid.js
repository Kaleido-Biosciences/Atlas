import uuidv1 from 'uuid/v1';

import { CONTAINER_ROW_HEADERS } from '../constants';
import { createContainer } from './container';

export const createContainerGrid = (
  id,
  subType,
  barcode,
  dimensions,
  attributes
) => {
  const containers = [];
  if (subType === 'Plate') {
    const { rows, columns } = dimensions;
    for (let i = 0; i < rows; i++) {
      const rowLetter = CONTAINER_ROW_HEADERS[i];
      for (let j = 0; j < columns; j++) {
        const location = {
          row: rowLetter,
          column: j + 1,
        };
        const container = createContainer(null, 'PlateWell', null, location);
        containers.push(container);
      }
    }
  }
  return {
    id: uuidv1(),
    type: 'ContainerGrid',
    subType,
    barcode,
    dimensions,
    containers,
    attributes: attributes || [],
  };
};
