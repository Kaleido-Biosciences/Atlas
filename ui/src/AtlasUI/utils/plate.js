export function getPlateRows(plate) {
  const rows = [];
  for (let i = 0; i < plate.numRows; i++) {
    const start = i * plate.numCols;
    const end = (i + 1) * plate.numCols;
    const row = plate.wells.slice(start, end);
    rows.push(row);
  }
  return rows;
}
