export const createWell = ({
  id = null,
  row = null,
  column = null,
  components = [],
  attributes = [],
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
    attributes,
  };
};
