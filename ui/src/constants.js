export const DEFAULT_TIMEPOINT_TIME = 0;
export const DEFAULT_TIMEPOINT_CONCENTRATION = 0.5;
export const DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION = 1.0;
export const DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION = null;

export const STATUS_DRAFT = 'DRAFT';
export const STATUS_COMPLETED = 'COMPLETED';

export const COMPONENT_TYPE_COMMUNITY = 'Community';
export const COMPONENT_TYPE_COMPOUND = 'Compound';
export const COMPONENT_TYPE_MEDIUM = 'Medium';
export const COMPONENT_TYPE_SUPPLEMENT = 'Supplement';
export const COMPONENT_TYPE_ATTRIBUTE = 'Attribute';

export const COMPONENT_TYPES_PLURAL_TO_SINGULAR = {
  communities: COMPONENT_TYPE_COMMUNITY,
  compounds: COMPONENT_TYPE_COMPOUND,
  media: COMPONENT_TYPE_MEDIUM,
  supplements: COMPONENT_TYPE_SUPPLEMENT,
  attributes: COMPONENT_TYPE_ATTRIBUTE,
};

export const COMPONENT_TYPE_ABBREVIATIONS = {
  [COMPONENT_TYPE_COMMUNITY]: 'C',
  [COMPONENT_TYPE_COMPOUND]: 'B',
  [COMPONENT_TYPE_MEDIUM]: 'M',
  [COMPONENT_TYPE_SUPPLEMENT]: 'S',
  [COMPONENT_TYPE_ATTRIBUTE]: 'A',
};

export const COMPONENT_TYPE_COLORS = {
  [COMPONENT_TYPE_COMMUNITY]: 'green',
  [COMPONENT_TYPE_COMPOUND]: 'blue',
  [COMPONENT_TYPE_MEDIUM]: 'orange',
  [COMPONENT_TYPE_SUPPLEMENT]: 'black',
  [COMPONENT_TYPE_ATTRIBUTE]: 'red',
};

export const DEFAULT_COMPONENT_COLOR_CODES = {
  [COMPONENT_TYPE_COMMUNITY]: '#21ba45',
  [COMPONENT_TYPE_COMPOUND]: '#2185d0',
  [COMPONENT_TYPE_MEDIUM]: '#f2711c',
  [COMPONENT_TYPE_SUPPLEMENT]: '#1b1c1d',
  [COMPONENT_TYPE_ATTRIBUTE]: '#db2828',
  default: '#9a9a9a',
};

export const REQUEST_PENDING = 'PENDING';
export const REQUEST_SUCCESS = 'SUCCESS';
export const REQUEST_ERROR = 'ERROR';

export const PLATE_HEADER_SIZE = 30;
export const PLATE_ROW_HEADERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const CONTAINER_ROW_HEADERS = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
