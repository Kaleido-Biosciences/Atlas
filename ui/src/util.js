import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
} from './constants';

export const groupComponents = components => {
  const groups = {
    communities: [],
    compounds: [],
    media: [],
    supplements: [],
  };
  components.forEach(component => {
    let key;
    if (component.type === COMPONENT_TYPE_COMMUNITY) {
      key = 'communities';
    } else if (component.type === COMPONENT_TYPE_COMPOUND) {
      key = 'compounds';
    } else if (component.type === COMPONENT_TYPE_MEDIUM) {
      key = 'media';
    } else if (component.type === COMPONENT_TYPE_SUPPLEMENT) {
      key = 'supplements';
    }
    groups[key].push(component);
  });
  return groups;
};
