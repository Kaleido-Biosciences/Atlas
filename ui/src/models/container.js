import uuidv1 from 'uuid/v1';

export const createContainer = (
  id,
  type,
  barcode,
  location,
  components,
  attributes
) => {
  return {
    id: uuidv1(),
    type,
    barcode,
    location,
    components: components || [],
    attributes: attributes || [],
  };
};
