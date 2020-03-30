import uuidv1 from 'uuid/v1';

export const createContainer = ({
  id = null,
  subType = null,
  name = null,
  displayName = null,
  barcode = null,
  components = [],
  attributes = [],
}) => {
  return {
    id: id || uuidv1(),
    type: 'Container',
    subType,
    name,
    displayName,
    barcode,
    components,
    attributes,
    selected: false,
  };
};
