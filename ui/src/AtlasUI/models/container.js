import { v1 as uuidv1 } from 'uuid';

export const createContainer = ({
  id = null,
  containerType = null,
  name = null,
  barcode = null,
  components = [],
  attributes = [],
}) => {
  return {
    id: id || uuidv1(),
    type: 'Container',
    containerType,
    name,
    barcode,
    components,
    attributes,
    selected: false,
  };
};
