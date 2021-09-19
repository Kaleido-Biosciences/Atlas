export function getGridRows(grid) {
  const rows = [];
  for (let i = 0; i < grid.rows; i++) {
    const start = i * grid.columns;
    const end = (i + 1) * grid.columns;
    const row = grid.positions.slice(start, end);
    rows.push(row);
  }
  return rows;
}
