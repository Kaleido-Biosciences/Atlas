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

export const DEFAULT_TIMEPOINT_TIME = 0;
export const DEFAULT_TIMEPOINT_CONCENTRATION = 0.5;
export const DEFAULT_TIMEPOINT_COMMUNITY_CONCENTRATION = 1.0;
export const DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION = null;

export const STATUS_DRAFT = 'DRAFT';
export const STATUS_COMPLETED = 'COMPLETED';

export const COMPONENT_TYPE_COMMUNITY = 'community';
export const COMPONENT_TYPE_COMPOUND = 'compound';
export const COMPONENT_TYPE_MEDIUM = 'medium';
export const COMPONENT_TYPE_SUPPLEMENT = 'supplement';

export const COMPONENT_TYPES_PLURAL_TO_SINGULAR = {
  communities: 'community',
  compounds: 'compound',
  media: 'medium',
  supplements: 'supplement',
};

export const COMPONENT_TYPE_ABBREVIATIONS = {
  community: 'C',
  compound: 'B',
  medium: 'M',
  supplement: 'S',
};

export const COMPONENT_TYPE_COLORS = {
  community: 'green',
  compound: 'blue',
  medium: 'orange',
  supplement: 'black',
};

export const REQUEST_PENDING = 'PENDING';
export const REQUEST_SUCCESS = 'SUCCESS';
export const REQUEST_ERROR = 'ERROR';
