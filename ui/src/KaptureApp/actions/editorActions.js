import { activity, editorImport } from 'KaptureApp/store';
import { actions as editorActions } from 'KaptureApp/store/editor/slice';
import * as selectors from 'KaptureApp/store/editor/selectors';

import { createComponent } from 'KaptureApp/models';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
  COMPONENT_TYPES_KEYED,
} from 'KaptureApp/config/componentTypes';

const { setGridComponents: _setGridComponents } = editorActions;

export const {
  addBarcodes,
  setSettings,
  resetState: resetEditor,
} = editorActions;

const { wrapWithChangeHandler } = activity;

export const applyImportedComponentsToGrid = wrapWithChangeHandler((gridId) => {
  return (dispatch, getState) => {
    const grids = selectors.selectGrids(getState());
    const grid = findGridById(gridId, grids);
    const importedComponents = editorImport.selectImportedComponents(
      getState()
    );
    const actionPositions = [];
    const gridPositions = grid.data.flat();
    importedComponents.forEach((position) => {
      const gridPosition = gridPositions.find((gridPosition) => {
        return (
          gridPosition.row === position.row &&
          gridPosition.column === position.column
        );
      });
      if (gridPosition && gridPosition.container) {
        const newComponents = applyComponentsToContainer(
          gridPosition.container,
          [position.component]
        );
        actionPositions.push({
          row: position.row,
          column: position.column,
          components: newComponents,
        });
      }
    });
    if (actionPositions.length) {
      dispatch(
        _setGridComponents({
          gridId,
          positions: actionPositions,
        })
      );
    }
  };
});

function applyComponentsToContainer(container, toolComponentsToApply) {
  const containerComponents = container.components.slice();
  const componentsToApply = toolComponentsToApply.map((toolComponent) => {
    return transformToolComponent(toolComponent);
  });
  componentsToApply.forEach((component) => {
    const existingComponent = containerComponents.find(
      (comp) => comp.id === component.id
    );
    if (!existingComponent) {
      containerComponents.push(setComponentDescription(component));
    } else {
      if (existingComponent.options.timepoints) {
        existingComponent.options.timepoints.forEach((eTimepoint) => {
          const index = component.options.timepoints.findIndex(
            (timepoint) => timepoint.time === eTimepoint.time
          );
          if (index === -1) {
            component.options.timepoints.push(eTimepoint);
          }
        });
        component.options.timepoints.sort((a, b) => {
          return a.time - b.time;
        });
      }
      const index = containerComponents.findIndex(
        (eComponent) => eComponent.id === component.id
      );
      containerComponents.splice(index, 1, setComponentDescription(component));
    }
  });
  return sortComponentsByType(containerComponents);
}

function findGridById(gridId, grids) {
  return grids.find((grid) => grid.id === gridId);
}

function transformToolComponent({ id, name, type, data, timepoints, tooltip }) {
  return createComponent({
    id,
    type,
    name,
    options: { timepoints: timepoints ? timepoints.slice() : null },
    data,
    tooltip,
    color: COMPONENT_TYPES_KEYED[type].colorCode,
  });
}

function setComponentDescription(component) {
  if (component.options && component.options.timepoints) {
    const timepointStrings = component.options.timepoints.map((timepoint) => {
      if (timepoint.concentration) {
        return `${timepoint.concentration.toFixed(2)} @ 
            ${timepoint.time}h`;
      } else return '';
    });
    component.description = timepointStrings.join(', ');
  }
  return component;
}

function sortComponentsByType(components) {
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
}
