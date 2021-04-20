import { createComponent } from 'KaptureApp/models';
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

export const getComponentFromToolComponent = (toolComponent) => {
  return createComponent({
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
export const updateToolComponentDescription = (toolComponent) => {
  const newComponent = { ...toolComponent };
  let description = '';
  if (
    toolComponent.isValid &&
    toolComponent.fields &&
    toolComponent.fields.timepoints &&
    toolComponent.fields.timepoints.length
  ) {
    description = getDescription(toolComponent.fields.timepoints);
  }
  newComponent.description = description;
  return newComponent;
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
