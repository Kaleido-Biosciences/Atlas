import uuidv1 from 'uuid/v1';

export const createContainer = (
  id,
  subType,
  barcode,
  location,
  components,
  attributes
) => {
  return {
    id: uuidv1(),
    type: 'Container',
    subType,
    barcode,
    location,
    components: components || [],
    attributes: attributes || [],
  };
};
