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
import { getDescription } from './utils';

export {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
  getDescription,
};

export const COMPONENT_TYPES = [
  community,
  compound,
  medium,
  supplement,
  attribute,
];

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

export const cloneComponent = (component) => {
  return {
    ...component,
    fields: JSON.parse(JSON.stringify(component.fields)),
  };
};

export const cloneComponents = (components, componentTypesToClone) => {
  const clonedComponents = [];
  components.forEach((component) => {
    if (componentTypesToClone.includes(component.type)) {
      clonedComponents.push(cloneComponent(component));
    }
  });
  return clonedComponents;
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

export const applyComponentsToContainer = (container, components) => {
  const containerComponents = container.components.slice();
  const componentsToApply = components.map((component) => {
    return cloneComponent(component);
  });
  componentsToApply.forEach((component) => {
    const existingComponent = containerComponents.find(
      (comp) => comp.id === component.id
    );
    if (!existingComponent) {
      containerComponents.push(component);
    } else {
      if (existingComponent.fields.timepoints) {
        existingComponent.fields.timepoints.forEach((eTimepoint) => {
          const index = component.fields.timepoints.findIndex(
            (timepoint) => timepoint.time === eTimepoint.time
          );
          if (index === -1) {
            component.fields.timepoints.push(eTimepoint);
          }
        });
        component.fields.timepoints.sort((a, b) => {
          return a.time - b.time;
        });
      }
      const index = containerComponents.findIndex(
        (eComponent) => eComponent.id === component.id
      );
      component.description = getDescription(component);
      containerComponents.splice(index, 1, component);
    }
  });
  return sortComponentsByType(containerComponents);
};
