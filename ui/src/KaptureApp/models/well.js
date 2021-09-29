import { v4 as uuidv4 } from 'uuid';

export const createWell = ({
  id = null,
  row = null,
  column = null,
  name = null,
  components = [],
  attributes = [],
}) => {
  return {
    id: id || uuidv4(),
    type: 'Well',
    row,
    column,
    name,
    components,
    attributes,
  };
};
