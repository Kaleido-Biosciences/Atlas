export function getGridRows(grid) {
  const rows = [];
  for (let i = 0; i < grid.dimensions.rows; i++) {
    const start = i * grid.dimensions.columns;
    const end = (i + 1) * grid.dimensions.columns;
    const row = grid.data.slice(start, end);
    rows.push(row);
  }
  return rows;
}
