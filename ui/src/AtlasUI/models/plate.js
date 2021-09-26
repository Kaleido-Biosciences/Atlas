import { v4 as uuidv4 } from 'uuid';
import { createWell } from './well';

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

export function createPlate({
  id = null,
  numRows = null,
  numCols = null,
  name = null,
  barcode = null,
  wells = [],
  attributes = [],
  sortKey = null,
}) {
  return {
    id: id || uuidv4(),
    numRows,
    numCols,
    name,
    barcode,
    wells,
    attributes,
    rowHeaders: createRowHeaders(numRows),
    columnHeaders: createColumnHeaders(numCols),
    sortKey,
  };
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
