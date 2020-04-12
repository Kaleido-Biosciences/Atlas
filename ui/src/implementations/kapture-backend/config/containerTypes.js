export const CONTAINER_TYPES = [
  {
    type: 'Tube',
    name: 'Tube',
  },
  {
    type: 'Vial',
    name: 'Vial',
  },
  {
    type: 'Flask',
    name: 'Flask',
  },
  {
    type: 'PetriDish',
    name: 'Petri Dish',
  },
];

export const CONTAINER_TYPES_KEYED = CONTAINER_TYPES.reduce((keyed, type) => {
  keyed[type.type] = type;
  return keyed;
}, {});

export const CONTAINER_TYPE_OPTIONS = CONTAINER_TYPES.map((type) => {
  return { key: type.type, value: type.type, text: type.name };
});

export const GRID_TYPES = [
  {
    type: 'Plate',
    name: 'Plate',
    displayContainerTypesInPrintout: false,
  },
  {
    type: 'Rack',
    name: 'Rack',
    displayContainerTypesInPrintout: true,
  },
];

export const GRID_TYPES_KEYED = GRID_TYPES.reduce((keyed, type) => {
  keyed[type.type] = type;
  return keyed;
}, {});
