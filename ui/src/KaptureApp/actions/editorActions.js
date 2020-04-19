import { editorActions, editorToolsActions, selectors } from 'KaptureApp/store';
import { api } from 'KaptureApp/api';
import {
  getContainerCollection,
  importContainerCollection,
} from './activityActions';
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
} from 'KaptureApp/config/componentTypes';
import {
  COMPONENT_TYPES_PLURAL_TO_SINGULAR,
  DEFAULT_COMPONENT_COLOR_CODES,
} from 'KaptureApp/config/constants';
import { CONTAINER_TYPES_KEYED } from 'KaptureApp/config/containerTypes';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setContainerCollection: _setContainerCollection,
  setGrids: _setGrids,
  addGrid: _addGrid,
  addContainerToGrid: _addContainerToGrid,
  setGridComponents: _setGridComponents,
  deselectGridContainers: _deselectGridContainers,
  toggleGridContainersSelected: _toggleGridSelected,
  clearGridContainers: _clearGridContainers,
  deleteGrid: _deleteGrid,
  setGridBarcode: _setGridBarcode,
  setSavePending: _setSavePending,
  setLastSaveTime: _setLastSaveTime,
  setSaveError: _setSaveError,
  setContainerTypes: _setContainerTypes,
} = editorActions;

const { setClickMode: _setClickMode } = editorToolsActions;

const {
  selectEditorClickMode,
  selectEditorClearMode,
  selectEditorToolComponentsValid,
  selectEditorSelectedToolComponents,
  selectEditorGrids,
  selectEditorActiveGridId,
  selectActivityName,
} = selectors;

const wrapWithChangeHandler = (fn) => {
  return function () {
    return async (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      dispatch(_setSavePending());
      const activityName = selectActivityName(getState());
      const exportedGrids = exportGrids(selectEditorGrids(getState()));
      try {
        await api.saveActivityGrids(activityName, exportedGrids);
        dispatch(
          _setLastSaveTime({
            lastSaveTime: Date.now(),
          })
        );
      } catch (error) {
        dispatch(_setSaveError({ error: error.message }));
      }
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
      dispatch(_setContainerTypes({ containerTypes: CONTAINER_TYPES_KEYED }));
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      dispatch(_setContainerCollection({ collection }));
      const importData = await importContainerCollection(collection);
      dispatch(addBarcodes({ barcodes: importData.barcodes }));
      dispatch(_setGrids({ grids: importData.grids }));
      dispatch(_setInitialized({ initialized: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const addNewPlate = wrapWithChangeHandler(({ dimensions }) => {
  return (dispatch, getState) => {
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
    dispatch(_addGrid({ grid }));
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
        dispatch(_toggleGridSelected({ gridId, positions }));
      } else if (clickMode === 'clear') {
        const clearMode = selectEditorClearMode(getState());
        let typesToClear;
        if (clearMode === 'all') {
          typesToClear = [
            COMPONENT_TYPE_COMMUNITY,
            COMPONENT_TYPE_COMPOUND,
            COMPONENT_TYPE_MEDIUM,
            COMPONENT_TYPE_SUPPLEMENT,
            COMPONENT_TYPE_ATTRIBUTE,
          ];
        } else {
          typesToClear = [COMPONENT_TYPES_PLURAL_TO_SINGULAR[clearMode]];
        }
        dispatch(_clearGridContainers({ gridId, positions, typesToClear }));
      }
    };
  }
);

export const setClickMode = ({ clickMode }) => {
  return (dispatch, getState) => {
    dispatch(_setClickMode({ clickMode }));
    const activeId = selectEditorActiveGridId(getState());
    if (activeId) {
      dispatch(_deselectGridContainers({ gridIds: [activeId] }));
    }
  };
};

export const applySelectedToolComponentsToSelectedGrids = wrapWithChangeHandler(
  ({ gridId }) => {
    return (dispatch, getState) => {
      const components = selectEditorSelectedToolComponents(getState());
      const grids = selectEditorGrids(getState());
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

export const cloneGrid = wrapWithChangeHandler(
  ({ gridId, componentTypesToClone }) => {
    return (dispatch, getState) => {
      const grids = selectEditorGrids(getState());
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
      const gridData = createGridData({ ...grid.dimensions }, GRID_ROW_HEADERS);
      const newGrid = createGrid({
        containerType: grid.containerType,
        dimensions: grid.dimensions,
        data: gridData,
      });
      addContainersToGrid(newGrid, containerPositions, GRID_ROW_HEADERS);
      dispatch(_addGrid({ grid: newGrid }));
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
    options: { timepoints },
    data,
    tooltip,
    color: DEFAULT_COMPONENT_COLOR_CODES[type],
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
