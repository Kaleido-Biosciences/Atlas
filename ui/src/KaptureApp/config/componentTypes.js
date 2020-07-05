export const COMPONENT_TYPE_COMMUNITY = 'Community';
export const COMPONENT_TYPE_COMPOUND = 'Compound';
export const COMPONENT_TYPE_MEDIUM = 'Medium';
export const COMPONENT_TYPE_SUPPLEMENT = 'Supplement';
export const COMPONENT_TYPE_ATTRIBUTE = 'Attribute';

export const COMPONENT_TYPES = [
  {
    name: COMPONENT_TYPE_COMMUNITY,
    singular: COMPONENT_TYPE_COMMUNITY,
    plural: 'Communities',
    abbreviation: 'C',
    typeColor: 'green',
    colorCode: '#21ba45',
    allowExcelImport: true,
    defaultConcentration: 1.0,
    defaultTime: 0,
    allowAddTimepoint: true,
    enableOptions: ['concentration'],
  },
  {
    name: COMPONENT_TYPE_COMPOUND,
    singular: COMPONENT_TYPE_COMPOUND,
    plural: 'Compounds',
    abbreviation: 'B',
    typeColor: 'blue',
    colorCode: '#2185d0',
    allowExcelImport: true,
    defaultConcentration: 0.5,
    defaultTime: 0,
    allowAddTimepoint: false,
    enableOptions: ['concentration'],
  },
  {
    name: COMPONENT_TYPE_MEDIUM,
    singular: COMPONENT_TYPE_MEDIUM,
    plural: 'Media',
    abbreviation: 'M',
    typeColor: 'orange',
    colorCode: '#f2711c',
    allowExcelImport: true,
    defaultConcentration: null,
    defaultTime: 0,
    allowAddTimepoint: false,
    enableOptions: [],
  },
  {
    name: COMPONENT_TYPE_SUPPLEMENT,
    singular: COMPONENT_TYPE_SUPPLEMENT,
    plural: 'Supplements',
    abbreviation: 'S',
    typeColor: 'black',
    colorCode: '#1b1c1d',
    allowExcelImport: true,
    defaultConcentration: 0.5,
    defaultTime: 0,
    allowAddTimepoint: true,
    enableOptions: ['concentration'],
  },
  {
    name: COMPONENT_TYPE_ATTRIBUTE,
    singular: COMPONENT_TYPE_ATTRIBUTE,
    plural: 'Attributes',
    abbreviation: 'A',
    typeColor: 'red',
    colorCode: '#db2828',
    allowExcelImport: false,
  },
];

export const COMPONENT_TYPES_KEYED = COMPONENT_TYPES.reduce((keyed, type) => {
  keyed[type.name] = type;
  return keyed;
}, {});
