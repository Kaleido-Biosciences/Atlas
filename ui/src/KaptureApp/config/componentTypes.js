import { community } from './community';
import { compound } from './compound';
import { medium } from './medium';
import { supplement } from './supplement';
import { attribute } from './attribute';

export const COMPONENT_TYPE_COMMUNITY = 'Community';
export const COMPONENT_TYPE_COMPOUND = 'Compound';
export const COMPONENT_TYPE_MEDIUM = 'Medium';
export const COMPONENT_TYPE_SUPPLEMENT = 'Supplement';
export const COMPONENT_TYPE_ATTRIBUTE = 'Attribute';

export const createToolComponent = (data, type, timepoints) => {
  if (type === COMPONENT_TYPE_COMMUNITY) {
    return community.createToolComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_COMPOUND) {
    return compound.createToolComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_MEDIUM) {
    return medium.createToolComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_SUPPLEMENT) {
    return supplement.createToolComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_ATTRIBUTE) {
    return attribute.createToolComponent(data);
  }
};

export const COMPONENT_TYPES = [
  community,
  compound,
  medium,
  supplement,
  attribute,
];

export const COMPONENT_TYPES_KEYED = COMPONENT_TYPES.reduce((keyed, type) => {
  keyed[type.name] = type;
  return keyed;
}, {});
