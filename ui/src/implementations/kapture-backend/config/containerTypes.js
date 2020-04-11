export const CONTAINER_TYPES = [
  {
    type: 'Tube',
    displayName: 'Tube',
  },
  {
    type: 'Vial',
    displayName: 'Vial',
  },
  {
    type: 'Flask',
    displayName: 'Flask',
  },
  {
    type: 'PetriDish',
    displayName: 'Petri Dish',
  },
];

export const CONTAINER_TYPES_KEYED = CONTAINER_TYPES.reduce((keyed, type) => {
  keyed[type.type] = type;
  return keyed;
}, {});

export const CONTAINER_TYPE_OPTIONS = CONTAINER_TYPES.map((type) => {
  return { key: type.type, value: type.type, text: type.displayName };
});
