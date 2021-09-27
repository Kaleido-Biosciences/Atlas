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

export const applyComponents = (target, source) => {
  const targetComponents = target.slice();
  const sourceComponents = source.map((component) => {
    return cloneComponent(component);
  });
  sourceComponents.forEach((sourceComponent) => {
    const targetComponent = targetComponents.find(
      (comp) => comp.id === sourceComponent.id
    );
    if (!targetComponent) {
      targetComponents.push(sourceComponent);
    } else {
      if (targetComponent.fields.timepoints) {
        targetComponent.fields.timepoints.forEach((eTimepoint) => {
          const index = sourceComponent.fields.timepoints.findIndex(
            (timepoint) => timepoint.time === eTimepoint.time
          );
          if (index === -1) {
            sourceComponent.fields.timepoints.push(eTimepoint);
          }
        });
        sourceComponent.fields.timepoints.sort((a, b) => {
          return a.time - b.time;
        });
      }
      const index = targetComponents.findIndex(
        (tComponent) => tComponent.id === sourceComponent.id
      );
      sourceComponent.description = getDescription(sourceComponent);
      targetComponents.splice(index, 1, sourceComponent);
    }
  });
  return sortComponentsByType(targetComponents);
};
