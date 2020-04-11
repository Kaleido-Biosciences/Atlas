import { createSlice } from 'redux-starter-kit';

import {
  DEFAULT_COMPONENT_COLOR_CODES,
  COMPONENT_TYPES_PLURAL_TO_SINGULAR,
  REQUEST_SUCCESS,
} from '../constants';

const initialState = {
  initialized: false,
  initializationError: null,
  grids: [],
  activeGridId: null,
  containerCollection: null,
  barcodes: [],
  settings: {
    containerSize: {
      size: 120,
      padding: 5,
    },
    componentColors: Object.assign({}, DEFAULT_COMPONENT_COLOR_CODES),
  },
  saveStatus: null,
  lastSaveTime: null,
  componentCounts: {},
  containerTypes: {},
};

const editor = createSlice({
  slice: 'editor',
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
      state.containerCollection = action.payload.containerCollection;
    },
    setGrids(state, action) {
      state.grids = action.payload.grids;
      if (state.grids.length) {
        state.activeGridId = state.grids[0].id;
      } else {
        state.activeGridId = null;
      }
      assignGridNames(state.grids, state.containerTypes);
    },
    addGrid(state, action) {
      state.grids.push(action.payload.grid);
      state.activeGridId = action.payload.grid.id;
      assignGridNames(state.grids, state.containerTypes);
    },
    setActiveGridId(state, action) {
      state.activeGridId = action.payload.gridId;
    },
    addContainerToGrid(state, action) {
      const { gridId, position, container } = action.payload;
      const grid = findGrid(gridId, state.grids);
      const positions = grid.data.flat();
      const statePosition = findPosition(position, positions);
      statePosition.container = container;
    },
    setGridComponents(state, action) {
      const { gridId, positions } = action.payload;
      const grid = findGrid(gridId, state.grids);
      const gridPositions = grid.data.flat();
      positions.forEach((position) => {
        const gridPosition = findPosition(position, gridPositions);
        if (gridPosition.container) {
          gridPosition.container.components = position.components;
        }
      });
    },
    deselectGridContainers(state, action) {
      const { gridIds } = action.payload;
      gridIds.forEach((gridId) => {
        const grid = findGrid(gridId, state.grids);
        const positions = grid.data.flat();
        positions.forEach((position) => {
          if (position.container) {
            position.container.selected = false;
          }
        });
      });
    },
    toggleGridContainersSelected(state, action) {
      const { gridId, positions } = action.payload;
      const shortPositions = positions.map(
        (position) => position.row + position.column
      );
      const grid = findGrid(gridId, state.grids);
      const flatPositions = grid.data.flat();
      const filteredPositions = flatPositions.filter((position) =>
        shortPositions.includes(position.row + position.column)
      );
      const status = { selected: false, deselected: false };
      filteredPositions.forEach((position) => {
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
      filteredPositions.forEach((position) => {
        if (position.container) {
          position.container.selected = newSelectionStatus;
        }
      });
    },
    clearGridContainers(state, action) {
      const { gridId, positions, clearMode } = action.payload;
      const grid = findGrid(gridId, state.grids);
      const componentTypes = COMPONENT_TYPES_PLURAL_TO_SINGULAR;
      const shortPositions = positions.map(
        (position) => position.row + position.column
      );
      const flatPositions = grid.data.flat();
      const filteredPositions = flatPositions.filter((position) =>
        shortPositions.includes(position.row + position.column)
      );
      filteredPositions.forEach((position) => {
        if (position.container) {
          if (clearMode === 'all') {
            position.container.components = [];
          } else {
            const componentType = componentTypes[clearMode];
            position.container.components = position.container.components.filter(
              (component) => {
                return component.type !== componentType;
              }
            );
          }
        }
      });
    },
    deleteGrid(state, action) {
      const { gridId } = action.payload;
      const indexToRemove = state.grids.findIndex(
        (container) => container.id === gridId
      );
      state.grids.splice(indexToRemove, 1);
      if (state.grids.length) {
        if (state.grids[indexToRemove]) {
          state.activeGridId = state.grids[indexToRemove].id;
        } else {
          state.activeGridId = state.grids[indexToRemove - 1].id;
        }
      }
      assignGridNames(state.grids, state.containerTypes);
    },
    addBarcodes(state, action) {
      const { barcodes } = action.payload;
      state.barcodes = state.barcodes.concat(barcodes);
    },
    setGridBarcode(state, action) {
      const { gridId, barcode } = action.payload;
      const grid = findGrid(gridId, state.grids);
      grid.barcode = barcode;
    },
    setSettings(state, action) {
      const { settings } = action.payload;
      state.settings = Object.assign(state.settings, settings);
    },
    setSaveStatus(state, action) {
      const { saveStatus } = action.payload;
      state.saveStatus = saveStatus;
      if (saveStatus === REQUEST_SUCCESS) {
        state.lastSaveTime = Date.now();
      }
    },
    setContainerTypes(state, action) {
      state.containerTypes = action.payload.containerTypes;
    },
  },
});

export const { actions: editorActions, reducer: editorReducer } = editor;

function assignGridNames(grids, containerTypes) {
  const typeCounts = {};
  grids.forEach((grid) => {
    if (!typeCounts[grid.containerType]) {
      typeCounts[grid.containerType] = 1;
    } else {
      typeCounts[grid.containerType]++;
    }
    let containerTypeName;
    if (containerTypes && containerTypes[grid.containerType]) {
      containerTypeName = containerTypes[grid.containerType].displayName;
    } else {
      containerTypeName = grid.containerType;
    }
    const displayName = `${containerTypeName} ${
      typeCounts[grid.containerType]
    }`;
    grid.name = displayName;
    grid.displayName = displayName;
  });
}

function findGrid(gridId, grids) {
  return grids.find((grid) => grid.id === gridId);
}

function findPosition(position, positions) {
  return positions.find(
    (pos) => pos.row === position.row && pos.column === position.column
  );
}
