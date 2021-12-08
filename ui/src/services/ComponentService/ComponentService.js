import { Attribute } from './types/Attribute';
import { Community } from './types/Community';
import { Compound } from './types/Compound';
import { Medium } from './types/Medium';
import { Supplement } from './types/Supplement';
import { getDescription } from './utils';

const allTypes = [Attribute, Community, Compound, Medium, Supplement];
const typeIndex = allTypes.reduce((index, type) => {
  index[type.name] = type;
  return index;
}, {});

export const ComponentService = {
  getAllTypes() {
    return allTypes;
  },
  createComponent(componentData, wellComponentData) {
    if (typeIndex[componentData.type]) {
      return typeIndex[componentData.type].createComponent(
        componentData,
        wellComponentData
      );
    } else return null;
  },
  exportComponent(component) {
    if (typeIndex[component.type]) {
      return typeIndex[component.type].exportComponent(component);
    } else return null;
  },
  getEditForm(component) {
    if (typeIndex[component.type]) {
      return typeIndex[component.type].editForm;
    } else return null;
  },
  getSingularTypeDisplayName(component) {
    if (typeIndex[component.type]) {
      return typeIndex[component.type].singularDisplayName;
    } else return null;
  },
  copyComponents(components) {
    return components.map((component) => cloneComponent(component));
  },
  applyComponents(target, source) {
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
        if (targetComponent.form.timepoints) {
          targetComponent.form.timepoints.forEach((eTimepoint) => {
            const index = sourceComponent.form.timepoints.findIndex(
              (timepoint) => timepoint.time === eTimepoint.time
            );
            if (index === -1) {
              sourceComponent.form.timepoints.push(eTimepoint);
            }
          });
          sourceComponent.form.timepoints.sort((a, b) => {
            return a.time - b.time;
          });
          sourceComponent.description = getDescription(sourceComponent);
        }
        const index = targetComponents.findIndex(
          (tComponent) => tComponent.id === sourceComponent.id
        );
        targetComponents.splice(index, 1, sourceComponent);
      }
    });
    return sortComponentsByType(targetComponents);
  },
};

function cloneComponent(component) {
  return {
    ...component,
    form: JSON.parse(JSON.stringify(component.form)),
  };
}

function sortComponentsByType(components) {
  const sortValues = {
    [Community.name]: 1,
    [Compound.name]: 2,
    [Medium.name]: 3,
    [Supplement.name]: 4,
    [Attribute.name]: 5,
  };
  const arrayToSort = components;
  return arrayToSort.sort((a, b) => {
    return sortValues[a.type] - sortValues[b.type];
  });
}
