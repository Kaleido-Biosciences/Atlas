import { editorV2Actions, editorToolsActions, selectors } from '../store';
import {
  getContainerCollection,
  importContainerCollection,
} from './activityActions';
import { createContainer, createContainerGrid } from '../models';

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

export const { setActiveContainerId } = editorV2Actions;

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

function applyComponentsToContainer(container, componentsToApply) {
  const containerComponents = container.components.slice();
  componentsToApply.forEach(component => {
    const existingComponent = containerComponents.find(
      comp => comp.id === component.id
    );
    const { selected, editing, ...containerComponent } = component;
    if (!existingComponent) {
      containerComponents.push(containerComponent);
    } else {
      const newComponent = { ...existingComponent };
      const timepointsToUpdate = newComponent.timepoints.slice();
      if (containerComponent.timepoints) {
        containerComponent.timepoints.forEach(newTimepoint => {
          const index = timepointsToUpdate.findIndex(
            eTimepoint => eTimepoint.time === newTimepoint.time
          );
          if (index > -1) {
            timepointsToUpdate.splice(index, 1, newTimepoint);
          } else {
            timepointsToUpdate.push(newTimepoint);
          }
        });
      }
      newComponent.timepoints = timepointsToUpdate;
      const index = containerComponents.findIndex(
        component => component.id === newComponent.id
      );
      containerComponents.splice(index, 1, newComponent);
    }
  });
  return containerComponents;
}

function findContainerById(containers, containerId) {
  return containers.find(container => container.id === containerId);
}
