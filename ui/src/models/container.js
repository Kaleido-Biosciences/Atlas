import uuidv1 from 'uuid/v1';

export const createContainer = (
  id,
  subType,
  barcode,
  components,
  attributes
) => {
  return {
    id: uuidv1(),
    type: 'Container',
    subType,
    barcode,
    components: components || [],
    attributes: attributes || [],
    selected: false,
  };
};
