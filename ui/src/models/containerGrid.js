import uuidv1 from 'uuid/v1';

export const createContainerGrid = (
  id,
  type,
  barcode,
  dimensions,
  containers,
  attributes
) => {
  return {
    id: uuidv1(),
    type,
    barcode,
    dimensions,
    containers: containers || [],
    attributes: attributes || [],
  };
};
