import { createSlice } from 'redux-starter-kit';

import {
  DEFAULT_COMPONENT_COLOR_CODES,
  COMPONENT_TYPES_PLURAL_TO_SINGULAR,
} from '../constants';

const initialState = {
  initialized: false,
  initializationError: null,
  containers: [],
  containerCollection: null,
  activeContainerId: null,
  barcodes: [],
  settings: {
    containerSize: {
      size: 120,
      padding: 5,
    },
    componentColors: Object.assign({}, DEFAULT_COMPONENT_COLOR_CODES),
  },
};

const editorV2 = createSlice({
  slice: 'editorV2',
  initialState,
  reducers: {
    setInitialized(state, action) {
      state.initialized = action.payload.initialized;
    },
    setInitializationError(state, action) {
      state.initializationError = action.payload.error;
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
    setContainerCollection(state, action) {
      state.containerCollection = action.payload.collection;
    },
    addContainer(state, action) {
      state.containers.push(action.payload.container);
      state.activeContainerId = action.payload.container.id;
      assignContainerNames(state.containers);
    },
    setActiveContainerId(state, action) {
      state.activeContainerId = action.payload.id;
    },
    addContainerToContainerGrid(state, action) {
      const { containerGridId, position, container } = action.payload;
      const containerGrid = state.containers.find(
        container => container.id === containerGridId
      );
      const positions = containerGrid.grid.flat();
      const statePosition = positions.find(pos => {
        return pos.row === position.row && pos.column === position.column;
      });
      statePosition.container = container;
    },
    setContainerComponents(state, action) {
      const { containerId, components } = action.payload;
      const container = state.containers.find(
        container => container.id === containerId
      );
      container.components = components;
    },
    setContainerGridComponents(state, action) {
      const { containerId, positions } = action.payload;
      const container = state.containers.find(
        container => container.id === containerId
      );
      const gridPositions = container.grid.flat();
      positions.forEach(position => {
        const gridPosition = gridPositions.find(
          gPos => gPos.row === position.row && gPos.column === position.column
        );
        if (gridPosition.container) {
          gridPosition.container.components = position.components;
        }
      });
    },
    deselectContainers(state, action) {
      const { containerIds } = action.payload;
      containerIds.forEach(containerId => {
        const container = state.containers.find(
          container => container.id === containerId
        );
        if (container.type === 'ContainerGrid') {
          const positions = container.grid.flat();
          positions.forEach(position => {
            if (position.container) {
              position.container.selected = false;
            }
          });
        } else if (container.type === 'Container') {
          container.selected = false;
        }
      });
    },
    toggleContainerSelected(state, action) {
      const { containerId } = action.payload;
      const container = state.containers.find(
        container => container.id === containerId
      );
      container.selected = !container.selected;
    },
    toggleContainerGridSelected(state, action) {
      const { containerId, positions } = action.payload;
      const shortPositions = positions.map(
        position => position.row + position.column
      );
      const container = state.containers.find(
        container => container.id === containerId
      );
      const flatPositions = container.grid.flat();
      const filteredPositions = flatPositions.filter(position =>
        shortPositions.includes(position.row + position.column)
      );
      const status = { selected: false, deselected: false };
      filteredPositions.forEach(position => {
        if (position.container) {
          if (position.container.selected) {
            status.selected = true;
          } else {
            status.deselected = true;
          }
        }
      });
      const newSelectionStatus =
        (status.selected && status.deselected) || !status.selected
          ? true
          : false;
      filteredPositions.forEach(position => {
        if (position.container) {
          position.container.selected = newSelectionStatus;
        }
      });
    },
    clearContainers(state, action) {
      const { containerId, positions, clearMode } = action.payload;
      const container = state.containers.find(
        container => container.id === containerId
      );
      const componentTypes = COMPONENT_TYPES_PLURAL_TO_SINGULAR;
      if (container.type === 'ContainerGrid') {
        const shortPositions = positions.map(
          position => position.row + position.column
        );
        const flatPositions = container.grid.flat();
        const filteredPositions = flatPositions.filter(position =>
          shortPositions.includes(position.row + position.column)
        );
        filteredPositions.forEach(position => {
          if (position.container) {
            if (clearMode === 'all') {
              position.container.components = [];
            } else {
              const componentType = componentTypes[clearMode];
              position.container.components = position.container.components.filter(
                component => {
                  return component.type !== componentType;
                }
              );
            }
          }
        });
      } else if (container.type === 'Container') {
        if (clearMode === 'all') {
          container.components = [];
        } else {
          const componentType = componentTypes[clearMode];
          container.components = container.components.filter(component => {
            return component.type !== componentType;
          });
        }
      }
    },
    deleteContainer(state, action) {
      const { containerId } = action.payload;
      const indexToRemove = state.containers.findIndex(
        container => container.id === containerId
      );
      state.containers.splice(indexToRemove, 1);
      if (state.containers.length) {
        if (state.containers[indexToRemove]) {
          state.activeContainerId = state.containers[indexToRemove].id;
        } else {
          state.activeContainerId = state.containers[indexToRemove - 1].id;
        }
      }
      assignContainerNames(state.containers);
    },
    addBarcodes(state, action) {
      const { barcodes } = action.payload;
      state.barcodes = state.barcodes.concat(barcodes);
    },
    setBarcode(state, action) {
      const { containerId, barcode } = action.payload;
      const container = state.containers.find(
        container => container.id === containerId
      );
      container.barcode = barcode;
    },
  },
});

export const { actions: editorV2Actions, reducer: editorV2Reducer } = editorV2;

function assignContainerNames(containers) {
  const typeCounts = {};
  containers.forEach(container => {
    if (!typeCounts[container.subType]) {
      typeCounts[container.subType] = 1;
    } else {
      typeCounts[container.subType]++;
    }
    container.name = `${container.subType} ${typeCounts[container.subType]}`;
  });
}
