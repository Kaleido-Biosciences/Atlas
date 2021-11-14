import { v4 as uuidv4 } from 'uuid';
import { createWell } from './well';
import { createComponent } from 'KaptureApp/config/componentTypes';

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

export function createPlate(
  {
    id = null,
    name = null,
    barcode = null,
    plateNumber = null,
    plateType = null,
    wells = [],
    overviewPositionTop = null,
    overviewPositionLeft = null,
    overviewWidth = 110,
    overviewHeight = 60,
    selected = false,
  },
  components
) {
  const plate = {
    id: id || uuidv4(),
    name: name || 'Untitled',
    barcode,
    plateNumber,
    plateType,
    wells,
    rowHeaders: [],
    columnHeaders: [],
    overviewPositionTop,
    overviewPositionLeft,
    overviewWidth,
    overviewHeight,
    selected,
  };
  if (plateType) {
    setPlateType(plate, plateType);
    if (wells.length) {
      plate.wells = importWells(wells, components);
    }
  }
  return plate;
}

export function setPlateType(plate, plateType) {
  let width, height;
  if (plateType.numCols === 12 && plateType.numRows === 8) {
    width = 130;
    height = 150;
  }
  if (plateType.numCols === 24 && plateType.numRows === 16) {
    width = 240;
    height = 230;
  }
  plate.plateType = plateType;
  plate.rowHeaders = createRowHeaders(plateType.numRows);
  plate.columnHeaders = createColumnHeaders(plateType.numCols);
  plate.overviewWidth = width;
  plate.overviewHeight = height;
}

export function createWells(numRows, numCols) {
  const wells = [];
  for (let i = 0; i < numRows; i++) {
    const row = rowHeaders[i];
    for (let j = 0; j < numCols; j++) {
      const column = j + 1;
      const name = `${row}${column}`;
      wells.push(createWell({ row, column, name }));
    }
  }
  return wells;
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

export function getPlateRows(plate) {
  const rows = [];
  if (plate.plateType) {
    for (let i = 0; i < plate.plateType.numRows; i++) {
      const start = i * plate.plateType.numCols;
      const end = (i + 1) * plate.plateType.numCols;
      const row = plate.wells.slice(start, end);
      rows.push(row);
    }
  }
  return rows;
}

export function importWells(wells, components) {
  return wells.map((well) => {
    const importedComponents = [];
    well.components.forEach((wellComponent) => {
      const component = components.find(
        (component) => component.id === wellComponent.id
      );
      if (!component) {
        console.log('NOT FOUND');
        console.log('well', wellComponent);
        console.log('components', component);
      } else {
        importedComponents.push(createComponent(component));
      }
    });
    return createWell({
      id: well.id,
      row: well.row,
      column: well.column,
      components: importedComponents,
    });
  });
}
