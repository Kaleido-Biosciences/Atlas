import { editorV2Actions, editorToolsActions, selectors } from '../store';
import {
  getContainerCollection,
  importContainerCollection,
} from './activityActions';
import {
  createContainer,
  createContainerGrid,
  createGrid,
  createComponent,
  createContainersForGrid,
  addContainersToGrid,
  exportContainers,
} from '../models';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import { api } from '../api';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setContainerCollection: _setContainerCollection,
  addContainer: _addContainer,
  addContainerToContainerGrid: _addContainerToContainerGrid,
  setContainerComponents: _setContainerComponents,
  setContainerGridComponents: _setContainerGridComponents,
  deselectContainers: _deselectContainers,
  toggleContainerSelected: _toggleContainerSelected,
  toggleContainerGridSelected: _toggleContainerGridSelected,
  clearContainers: _clearContainers,
  deleteContainer: _deleteContainer,
  setBarcode: _setBarcode,
  setSaveStatus: _setSaveStatus,
  setContainers: _setContainers,
} = editorV2Actions;

const { setClickMode: _setClickMode } = editorToolsActions;

const {
  selectEditorClickMode,
  selectEditorClearMode,
  selectEditorToolComponentsValid,
  selectEditorSelectedToolComponents,
  selectEditorV2Containers,
  selectEditorV2ActiveContainerId,
  selectActivityName,
} = selectors;

const wrapWithChangeHandler = fn => {
  return function() {
    return async (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      dispatch(_setSaveStatus({ saveStatus: REQUEST_PENDING }));
      const activityName = selectActivityName(getState());
      const exportedContainers = exportContainers(
        selectEditorV2Containers(getState())
      );
      try {
        await api.saveActivityContainers(activityName, exportedContainers);
        dispatch(_setSaveStatus({ saveStatus: REQUEST_SUCCESS }));
      } catch (err) {
        dispatch(_setSaveStatus({ saveStatus: REQUEST_ERROR }));
      }
    };
  };
};

export const {
  setActiveContainerId,
  addBarcodes,
  setSettings,
  resetState: resetEditorV2,
} = editorV2Actions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      dispatch(_setContainerCollection({ collection }));
      const importedContainers = await importContainerCollection(collection);
      dispatch(_setContainers({ containers: importedContainers }));
      dispatch(_setInitialized({ initialized: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const addNewPlate = wrapWithChangeHandler(({ dimensions }) => {
  return (dispatch, getState) => {
    const grid = createGrid(dimensions);
    const containerGrid = createContainerGrid({
      subtype: 'Plate',
      dimensions: dimensions,
      grid: grid,
    });
    const containerPositions = createContainersForGrid(dimensions, 'PlateWell');
    addContainersToGrid(containerGrid, containerPositions);
    dispatch(_addContainer({ container: containerGrid }));
  };
});

export const addNewRack = wrapWithChangeHandler(({ dimensions }) => {
  return (dispatch, getState) => {
    const grid = createGrid(dimensions);
    const containerGrid = createContainerGrid({
      subtype: 'Rack',
      dimensions: dimensions,
      grid: grid,
    });
    dispatch(_addContainer({ container: containerGrid }));
  };
});

export const addNewContainer = wrapWithChangeHandler(({ containerType }) => {
  return (dispatch, getState) => {
    const grid = createGrid({ rows: 1, columns: 1 });
    const containerGrid = createContainerGrid({
      subtype: containerType,
      dimensions: { rows: 1, columns: 1 },
      grid: grid,
    });
    const containerPositions = createContainersForGrid(
      { rows: 1, columns: 1 },
      containerType
    );
    addContainersToGrid(containerGrid, containerPositions);
    dispatch(_addContainer({ container: containerGrid }));
  };
});

// export const addNewContainerGrid = wrapWithChangeHandler(
//   ({ containerGrid: c }) => {
//     return (dispatch, getState) => {
//       const grid = createGrid(c.dimensions);
//       const containerGrid = createContainerGrid({
//         subtype: c.type,
//         dimensions: c.dimensions,
//         grid: grid,
//       });
//       if (c.type === 'Plate') {
//         const containerPositions = createContainersForGrid(
//           c.dimensions,
//           'PlateWell'
//         );
//         addContainersToGrid(containerGrid, containerPositions);
//       }
//       dispatch(_addContainer({ container: containerGrid }));
//     };
//   }
// );

// export const addNewContainer = wrapWithChangeHandler(({ container: c }) => {
//   return (dispatch, getState) => {
//     const container = createContainer({ subtype: c.type });
//     dispatch(_addContainer({ container: container }));
//   };
// });

export const addNewContainerToContainerGrid = wrapWithChangeHandler(
  (containerGridId, position, containerSubtype) => {
    return (dispatch, getState) => {
      const container = createContainer({ subtype: containerSubtype });
      dispatch(
        _addContainerToContainerGrid({
          containerGridId,
          position,
          container,
        })
      );
    };
  }
);

export const handleContainerClick = wrapWithChangeHandler(
  ({ containerId, positions }) => {
    return (dispatch, getState) => {
      const clickMode = selectEditorClickMode(getState());
      if (clickMode === 'apply') {
        if (selectEditorToolComponentsValid(getState())) {
          const components = selectEditorSelectedToolComponents(getState());
          const containers = selectEditorV2Containers(getState());
          const topLevelContainer = findContainerById(containers, containerId);
          if (positions) {
            const actionPositions = [];
            positions.forEach(position => {
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
              _setContainerGridComponents({
                containerId,
                positions: actionPositions,
              })
            );
          } else {
            const newComponents = applyComponentsToContainer(
              topLevelContainer,
              components
            );
            dispatch(
              _setContainerComponents({
                containerId,
                components: newComponents,
              })
            );
          }
        }
      } else if (clickMode === 'select') {
        if (positions) {
          dispatch(_toggleContainerGridSelected({ containerId, positions }));
        } else {
          dispatch(_toggleContainerSelected({ containerId }));
        }
      } else if (clickMode === 'clear') {
        const clearMode = selectEditorClearMode(getState());
        //const clear = wrapWithChangeHandler(_clearWells);
        // dispatch(clear({ plateId, wellIds, clearMode }));
        dispatch(_clearContainers({ containerId, positions, clearMode }));
      }
    };
  }
);

export const setClickMode = ({ clickMode }) => {
  return (dispatch, getState) => {
    dispatch(_setClickMode({ clickMode }));
    const activeContainerId = selectEditorV2ActiveContainerId(getState());
    if (activeContainerId) {
      dispatch(_deselectContainers({ containerIds: [activeContainerId] }));
    }
  };
};

export const applySelectedToolComponentsToSelectedContainers = wrapWithChangeHandler(
  ({ containerId }) => {
    return (dispatch, getState) => {
      const components = selectEditorSelectedToolComponents(getState());
      const containers = selectEditorV2Containers(getState());
      const container = findContainerById(containers, containerId);
      if (container.type === 'ContainerGrid') {
        const actionPositions = [];
        const positions = container.grid.flat();
        positions.forEach(position => {
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
            _setContainerGridComponents({
              containerId,
              positions: actionPositions,
            })
          );
        }
      }
      if (container.type === 'Container' && container.selected) {
        const newComponents = applyComponentsToContainer(container, components);
        dispatch(
          _setContainerComponents({ containerId, components: newComponents })
        );
      }
    };
  }
);

export const cloneContainer = wrapWithChangeHandler(
  ({ containerId, componentTypesToClone }) => {
    return (dispatch, getState) => {
      const containers = selectEditorV2Containers(getState());
      const container = findContainerById(containers, containerId);
      if (container.type === 'Container') {
        const clonedComponents = cloneComponents(
          container.components,
          componentTypesToClone
        );
        const newContainer = createContainer(
          null,
          container.subtype,
          null,
          clonedComponents
        );
        dispatch(_addContainer({ container: newContainer }));
      } else if (container.type === 'ContainerGrid') {
        const positionComponents = {};
        const positions = container.grid.flat();
        positions.forEach(position => {
          const location = position.row + position.column;
          const clonedComponents = cloneComponents(
            position.container.components,
            componentTypesToClone
          );
          positionComponents[location] = clonedComponents;
        });
        const newContainer = createContainerGrid(
          null,
          container.subtype,
          null,
          container.dimensions,
          null,
          positionComponents
        );
        dispatch(_addContainer({ container: newContainer }));
      }
    };
  }
);

export const deleteContainer = wrapWithChangeHandler(({ containerId }) => {
  return (dispatch, getState) => {
    dispatch(_deleteContainer({ containerId }));
  };
});

export const setBarcode = wrapWithChangeHandler(_setBarcode);

function cloneComponents(components, componentTypesToClone) {
  const clonedComponents = [];
  components.forEach(component => {
    if (componentTypesToClone.includes(component.type)) {
      const clonedOptions = {};
      if (component.options && component.options.timepoints) {
        clonedOptions.timepoints = component.options.timepoints.map(
          timepoint => {
            return Object.assign({}, timepoint);
          }
        );
      }
      clonedComponents.push(
        createComponent({
          id: component.id,
          type: component.type,
          displayName: component.displayName,
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
  const componentsToApply = toolComponentsToApply.map(toolComponent => {
    return transformToolComponent(toolComponent);
  });
  componentsToApply.forEach(component => {
    const existingComponent = containerComponents.find(
      comp => comp.id === component.id
    );
    if (!existingComponent) {
      containerComponents.push(setComponentDescription(component));
    } else {
      if (existingComponent.options.timepoints) {
        existingComponent.options.timepoints.forEach(eTimepoint => {
          const index = component.options.timepoints.findIndex(
            timepoint => timepoint.time === eTimepoint.time
          );
          if (index === -1) {
            component.options.timepoints.push(eTimepoint);
          }
        });
      }
      const index = containerComponents.findIndex(
        eComponent => eComponent.id === component.id
      );
      containerComponents.splice(index, 1, setComponentDescription(component));
    }
  });
  return sortComponentsByType(containerComponents);
}

function findContainerById(containers, containerId) {
  return containers.find(container => container.id === containerId);
}

function transformToolComponent({ id, displayName, type, data, timepoints }) {
  return createComponent({
    id,
    type,
    displayName,
    options: { timepoints },
    data,
  });
}

function setComponentDescription(component) {
  if (component.options && component.options.timepoints) {
    const timepointStrings = component.options.timepoints.map(timepoint => {
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
