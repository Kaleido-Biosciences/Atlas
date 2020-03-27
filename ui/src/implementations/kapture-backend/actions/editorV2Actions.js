import { editorV2Actions, editorToolsActions, selectors } from '../store';
import {
  getContainerCollection,
  importContainerCollection,
} from './activityActions';
import {
  createContainer,
  createContainerGrid,
  createComponent,
} from '../models';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from '../../../constants';

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
} = editorV2Actions;

const { setClickMode: _setClickMode } = editorToolsActions;

const {
  selectEditorClickMode,
  selectEditorClearMode,
  selectEditorToolComponentsValid,
  selectEditorSelectedToolComponents,
  selectEditorV2Containers,
  selectEditorV2ActiveContainerId,
} = selectors;

export const { setActiveContainerId, addBarcodes } = editorV2Actions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      dispatch(_setContainerCollection({ collection }));
      // const containers = await dispatch(
      //   importContainerCollection(status, version)
      // );
      // if (containers.length) {
      //   // TODO need a set containers action
      //   // dispatch(_setPlates({ plates }));
      // }
      dispatch(_setInitialized({ initialized: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const addNewContainerGrid = ({ containerGrid: c }) => {
  return (dispatch, getState) => {
    const containerGrid = createContainerGrid(null, c.type, null, c.dimensions);
    dispatch(_addContainer({ container: containerGrid }));
  };
};

export const addNewContainer = ({ container: c }) => {
  return (dispatch, getState) => {
    const container = createContainer(null, c.type);
    dispatch(_addContainer({ container: container }));
  };
};

export const addNewContainerToContainerGrid = (
  containerGridId,
  position,
  type
) => {
  return (dispatch, getState) => {
    const container = createContainer(null, type);
    dispatch(
      _addContainerToContainerGrid({
        containerGridId,
        position,
        container,
      })
    );
  };
};

export const handleContainerClick = ({ containerId, positions }) => {
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
            _setContainerComponents({ containerId, components: newComponents })
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
};

export const setClickMode = ({ clickMode }) => {
  return (dispatch, getState) => {
    dispatch(_setClickMode({ clickMode }));
    const activeContainerId = selectEditorV2ActiveContainerId(getState());
    if (activeContainerId) {
      dispatch(_deselectContainers({ containerIds: [activeContainerId] }));
    }
  };
};

export const applySelectedToolComponentsToSelectedContainers = ({
  containerId,
}) => {
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
};

export const cloneContainer = ({ containerId, componentTypesToClone }) => {
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
        container.subType,
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
        container.subType,
        null,
        container.dimensions,
        null,
        positionComponents
      );
      dispatch(_addContainer({ container: newContainer }));
    }
  };
};

export const deleteContainer = ({ containerId }) => {
  return (dispatch, getState) => {
    dispatch(_deleteContainer({ containerId }));
  };
};

export const setBarcode = _setBarcode;

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
        createComponent(
          component.id,
          component.type,
          component.displayName,
          component.description,
          clonedOptions,
          component.tooltip,
          component.color,
          component.data
        )
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
  return createComponent(
    id,
    type,
    displayName,
    null,
    { timepoints },
    null,
    null,
    data
  );
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
