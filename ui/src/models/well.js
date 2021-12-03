export const createWell = ({
  id = null,
  row = null,
  column = null,
  components = [],
  selected = false,
}) => {
  let position;
  if (row && column) {
    position = `${row}${column}`;
  }
  return {
    id: id || position,
    type: 'Well',
    row,
    column,
    position,
    components,
    selected,
  };
};
