import _ from 'lodash';

import {
  selectors as oldSelectors,
  activity,
  editorImport,
} from 'KaptureApp/store';
import { actions as editorActions } from 'KaptureApp/store/editor/slice';
import * as selectors from 'KaptureApp/store/editor/selectors';
import { api } from 'KaptureApp/api';

import {
  createGrid,
  createGridData,
  createContainersForGrid,
  addContainersToGrid,
  createContainer,
  createComponent,
} from 'KaptureApp/models';
import { exportGrids } from 'KaptureApp/utils/containerFunctions';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
  COMPONENT_TYPES,
  COMPONENT_TYPES_KEYED,
} from 'KaptureApp/config/componentTypes';
import { CONTAINER_TYPES } from 'KaptureApp/config/containerTypes';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setContainerCollection: _setContainerCollection,
  setGrids: _setGrids,
  addGrid: _addGrid,
  addGrids: _addGrids,
  addContainerToGrid: _addContainerToGrid,
  setGridComponents: _setGridComponents,
  // deselectGridContainers: _deselectGridContainers,
  toggleGridContainerSelections: _toggleGridContainerSelections,
  clearGridContainers: _clearGridContainers,
  deleteGrid: _deleteGrid,
  setGridBarcode: _setGridBarcode,
  setSavePending: _setSavePending,
  setLastSaveTime: _setLastSaveTime,
  setSaveError: _setSaveError,
  setContainerTypes: _setContainerTypes,
  setComponentTypes: _setComponentTypes,
} = editorActions;

const {
  selectEditorClickMode,
  selectEditorComponentTypesToClear,
  selectEditorToolComponentsValid,
  selectEditorSelectedToolComponents,
} = oldSelectors;

let lastSaveData = '';

const saveGrids = _.debounce(async (dispatch, getState) => {
  const exportedGrids = exportGrids(selectors.selectGrids(getState()));
  const stringifiedGrids = JSON.stringify(exportedGrids);
  if (stringifiedGrids !== lastSaveData) {
    dispatch(_setSavePending());
    const activityName = activity.selectName(getState());
    try {
      await api.saveActivityGrids(activityName, exportedGrids);
      dispatch(
        _setLastSaveTime({
          lastSaveTime: Date.now(),
        })
      );
      lastSaveData = stringifiedGrids;
    } catch (error) {
      dispatch(_setSaveError({ error: error.message }));
    }
  }
}, 500);

export const wrapWithChangeHandler = (fn) => {
  return function () {
    return async (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      saveGrids(dispatch, getState);
    };
  };
};

export const {
  setActiveGridId,
  addBarcodes,
  setSettings,
  resetState: resetEditor,
} = editorActions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      dispatch(_setContainerTypes({ containerTypes: CONTAINER_TYPES }));
      const componentTypes = COMPONENT_TYPES.map(
        ({ createToolComponent, editForm, ...rest }) => {
          return rest;
        }
      );
      dispatch(_setComponentTypes({ componentTypes: componentTypes }));
      const collection = await dispatch(
        activity.getContainerCollection(status, version)
      );
      dispatch(_setContainerCollection({ collection }));
      const importData = await activity.importContainerCollection(collection);
      dispatch(addBarcodes({ barcodes: importData.barcodes }));
      dispatch(_setGrids({ grids: importData.grids }));
      const exportedGrids = exportGrids(selectors.selectGrids(getState()));
      lastSaveData = JSON.stringify(exportedGrids);
      dispatch(_setInitialized({ initialized: true }));
      dispatch(activity.setContainerCollectionsStale({ stale: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const addNewPlates = wrapWithChangeHandler((dimensions, quantity) => {
  return (dispatch, getState) => {
    const grids = [];
    for (let i = 0; i < quantity; i++) {
      const gridData = createGridData(dimensions, GRID_ROW_HEADERS);
      const grid = createGrid({
        containerType: 'Plate',
        dimensions: dimensions,
        data: gridData,
      });
      const containerPositions = createContainersForGrid(
        dimensions,
        'PlateWell',
        GRID_ROW_HEADERS
      );
      addContainersToGrid(grid, containerPositions, GRID_ROW_HEADERS);
      grids.push(grid);
    }
    dispatch(_addGrids({ grids, activeGridId: grids[0].id }));
  };
});

export const addNewRack = wrapWithChangeHandler(({ dimensions }) => {
  return (dispatch, getState) => {
    const gridData = createGridData(dimensions, GRID_ROW_HEADERS);
    const grid = createGrid({
      containerType: 'Rack',
      dimensions: dimensions,
      data: gridData,
    });
    dispatch(_addGrid({ grid }));
  };
});

export const addNewContainer = wrapWithChangeHandler(({ containerType }) => {
  return (dispatch, getState) => {
    const gridData = createGridData({ rows: 1, columns: 1 }, GRID_ROW_HEADERS);
    const grid = createGrid({
      containerType,
      dimensions: { rows: 1, columns: 1 },
      data: gridData,
    });
    const containerPositions = createContainersForGrid(
      { rows: 1, columns: 1 },
      containerType,
      GRID_ROW_HEADERS
    );
    addContainersToGrid(grid, containerPositions, GRID_ROW_HEADERS);
    dispatch(_addGrid({ grid }));
  };
});

export const addNewContainerToGrid = wrapWithChangeHandler(
  ({ gridId, position, containerType }) => {
    return (dispatch, getState) => {
      const container = createContainer({ containerType });
      dispatch(
        _addContainerToGrid({
          gridId,
          position,
          container,
        })
      );
    };
  }
);

export const handleContainerClick = wrapWithChangeHandler(
  ({ gridId, positions }) => {
    return (dispatch, getState) => {
      const clickMode = selectEditorClickMode(getState());
      if (clickMode === 'apply') {
        if (selectEditorToolComponentsValid(getState())) {
          const components = selectEditorSelectedToolComponents(getState());
          const actionPositions = [];
          positions.forEach((position) => {
            const newComponents = applyComponentsToContainer(
              position.container,
              components
            );
            actionPositions.push({
              row: position.row,
              column: position.column,
              components: newComponents,
            });
          });
          dispatch(
            _setGridComponents({
              gridId,
              positions: actionPositions,
            })
          );
        }
      } else if (clickMode === 'select') {
        dispatch(_toggleGridContainerSelections({ gridId, positions }));
      } else if (clickMode === 'clear') {
        const typesToClear = selectEditorComponentTypesToClear(getState());
        dispatch(_clearGridContainers({ gridId, positions, typesToClear }));
      }
    };
  }
);

export const applySelectedToolComponentsToSelectedGrids = wrapWithChangeHandler(
  ({ gridId }) => {
    return (dispatch, getState) => {
      const components = selectEditorSelectedToolComponents(getState());
      const grids = selectors.selectGrids(getState());
      const grid = findGridById(gridId, grids);
      const actionPositions = [];
      const positions = grid.data.flat();
      positions.forEach((position) => {
        if (position.container && position.container.selected) {
          const newComponents = applyComponentsToContainer(
            position.container,
            components
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
  }
);

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

export const cloneGrid = wrapWithChangeHandler(
  (gridId, componentTypesToClone, quantity) => {
    return (dispatch, getState) => {
      const grids = selectors.selectGrids(getState());
      const grid = findGridById(gridId, grids);
      const containerPositions = [];
      const positions = grid.data.flat();
      positions.forEach((position) => {
        if (position.container) {
          const clonedComponents = cloneComponents(
            position.container.components,
            componentTypesToClone
          );
          const newContainer = createContainer({
            containerType: position.container.containerType,
            components: clonedComponents,
          });
          containerPositions.push({
            row: position.row,
            column: position.column,
            container: newContainer,
          });
        }
      });
      const newGrids = [];
      for (let i = 0; i < quantity; i++) {
        const gridData = createGridData(
          { ...grid.dimensions },
          GRID_ROW_HEADERS
        );
        const newGrid = createGrid({
          containerType: grid.containerType,
          dimensions: grid.dimensions,
          data: gridData,
        });
        addContainersToGrid(newGrid, containerPositions, GRID_ROW_HEADERS);
        newGrids.push(newGrid);
      }
      dispatch(_addGrids({ grids: newGrids, activeGridId: gridId }));
    };
  }
);

export const deleteGrid = wrapWithChangeHandler(({ gridId }) => {
  return (dispatch, getState) => {
    dispatch(_deleteGrid({ gridId }));
  };
});

export const setGridBarcode = wrapWithChangeHandler(_setGridBarcode);

function cloneComponents(components, componentTypesToClone) {
  const clonedComponents = [];
  components.forEach((component) => {
    if (componentTypesToClone.includes(component.type)) {
      const clonedOptions = {};
      if (component.options && component.options.timepoints) {
        clonedOptions.timepoints = component.options.timepoints.map(
          (timepoint) => {
            return Object.assign({}, timepoint);
          }
        );
      }
      clonedComponents.push(
        createComponent({
          id: component.id,
          type: component.type,
          name: component.name,
          description: component.description,
          options: clonedOptions,
          tooltip: component.tooltip,
          color: component.color,
          data: component.data,
        })
      );
    }
  });
  return clonedComponents;
}

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
