import { createSlice } from 'redux-starter-kit';

import { DEFAULT_COMPONENT_COLOR_CODES } from '../constants';

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
  },
});

export const { actions: editorV2Actions, reducer: editorV2Reducer } = editorV2;
