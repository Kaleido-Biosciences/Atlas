import { v4 as uuidv4 } from 'uuid';

export const createContainer = ({
  id = null,
  containerType = null,
  name = null,
  barcode = null,
  components = [],
  attributes = [],
}) => {
  return {
    id: id || uuidv4(),
    type: 'Container',
    containerType,
    name,
    barcode,
    components,
    attributes,
    selected: false,
  };
};
