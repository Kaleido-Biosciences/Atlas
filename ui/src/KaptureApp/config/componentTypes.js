import { createComponent as createAtlasComponent } from 'KaptureApp/models';
import { community } from './community';
import { compound } from './compound';
import { medium } from './medium';
import { supplement } from './supplement';
import { attribute } from './attribute';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from './constants';

export {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
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

export const createComponent = (data, type, timepoints) => {
  if (type === COMPONENT_TYPE_COMMUNITY) {
    return community.createComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_COMPOUND) {
    return compound.createComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_MEDIUM) {
    return medium.createComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_SUPPLEMENT) {
    return supplement.createComponent(data, timepoints);
  } else if (type === COMPONENT_TYPE_ATTRIBUTE) {
    return attribute.createComponent(data);
  }
};

export const exportComponent = (component) => {
  if (component.type === COMPONENT_TYPE_COMMUNITY) {
    return community.exportComponent(component);
  } else if (component.type === COMPONENT_TYPE_COMPOUND) {
    return compound.exportComponent(component);
  } else if (component.type === COMPONENT_TYPE_MEDIUM) {
    return medium.exportComponent(component);
  } else if (component.type === COMPONENT_TYPE_SUPPLEMENT) {
    return supplement.exportComponent(component);
  } else if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
    return attribute.exportComponent(component);
  }
};

//needs to removed
export const getComponentFromToolComponent = (toolComponent) => {
  return createAtlasComponent({
    id: toolComponent.id,
    type: toolComponent.type,
    name: toolComponent.name,
    description: toolComponent.description,
    data: toolComponent.data,
    options: JSON.parse(JSON.stringify(toolComponent.fields)),
    tooltip: toolComponent.tooltip,
    color: toolComponent.colorCode,
  });
};

//attributes?
export const updateComponentDescription = (component) => {
  const newComponent = { ...component };
  let description = '';
  if (
    component.options &&
    component.options.timepoints &&
    component.options.timepoints.length
  ) {
    description = getDescription(component.options.timepoints);
  }
  newComponent.description = description;
  return newComponent;
};

export const sortComponentsByType = (components) => {
  const sortValues = {
    [COMPONENT_TYPE_COMMUNITY]: 1,
    [COMPONENT_TYPE_COMPOUND]: 2,
    [COMPONENT_TYPE_MEDIUM]: 3,
    [COMPONENT_TYPE_SUPPLEMENT]: 4,
    [COMPONENT_TYPE_ATTRIBUTE]: 5,
  };
  const arrayToSort = components;
  return arrayToSort.sort((a, b) => {
    return sortValues[a.type] - sortValues[b.type];
  });
};

const getDescription = (timepoints) => {
  const timepointStrings = timepoints.map((timepoint) => {
    if (timepoint.concentration) {
      return `${timepoint.concentration.toFixed(2)} @ 
              ${timepoint.time}h`;
    } else return '';
  });
  return timepointStrings.join(', ');
};
