import { createSlice } from '@reduxjs/toolkit';

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
      innerPadding: 4,
      outerPadding: 2,
    },
  },
  containerTypes: [],
};

const editor = createSlice({
  name: 'editor',
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
    addGrids(state, action) {
      const { grids, activeGridId } = action.payload;
      state.grids = state.grids.concat(grids);
      state.activeGridId = activeGridId || state.grids[0].id;
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
    // deselectGridContainers(state, action) {
    //   const { gridIds } = action.payload;
    //   gridIds.forEach((gridId) => {
    //     const grid = findGrid(gridId, state.grids);
    //     const positions = grid.data.flat();
    //     positions.forEach((position) => {
    //       if (position.container) {
    //         position.container.selected = false;
    //       }
    //     });
    //   });
    // },
    toggleGridContainerSelections(state, action) {
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
    selectAllGridContainers(state, action) {
      const { gridId } = action.payload;
      const grid = findGrid(gridId, state.grids);
      const flattened = grid.data.flat();
      flattened.forEach((position) => {
        if (position.container) {
          position.container.selected = true;
        }
      });
    },
    deselectAllGridContainers(state, action) {
      const { gridId } = action.payload;
      const grid = findGrid(gridId, state.grids);
      const flattened = grid.data.flat();
      flattened.forEach((position) => {
        if (position.container) {
          position.container.selected = false;
        }
      });
    },
    selectBorderGridContainers(state, action) {
      const { gridId } = action.payload;
      const grid = findGrid(gridId, state.grids);
      grid.data.forEach((row, i) => {
        if (i === 0 || i === grid.data.length - 1) {
          row.forEach((position) => {
            if (position.container) {
              position.container.selected = true;
            }
          });
        } else {
          row.forEach((position, i) => {
            if (i === 0 || i === row.length - 1) {
              if (position.container) {
                position.container.selected = true;
              }
            } else {
              if (position.container) {
                position.container.selected = false;
              }
            }
          });
        }
      });
    },
    selectInteriorGridContainers(state, action) {
      const { gridId } = action.payload;
      const grid = findGrid(gridId, state.grids);
      grid.data.forEach((row, i) => {
        if (i === 0 || i === grid.data.length - 1) {
          row.forEach((position) => {
            if (position.container) {
              position.container.selected = false;
            }
          });
        } else {
          row.forEach((position, i) => {
            if (i === 0 || i === row.length - 1) {
              if (position.container) {
                position.container.selected = false;
              }
            } else {
              if (position.container) {
                position.container.selected = true;
              }
            }
          });
        }
      });
    },
    deleteGrid(state, action) {
      const { gridId } = action.payload;
      const indexToRemove = state.grids.findIndex(
        (container) => container.id === gridId
      );
      if (indexToRemove > -1) {
        state.grids.splice(indexToRemove, 1);
        if (state.grids.length) {
          if (state.grids[indexToRemove]) {
            state.activeGridId = state.grids[indexToRemove].id;
          } else {
            state.activeGridId = state.grids[indexToRemove - 1].id;
          }
        }
        assignGridNames(state.grids, state.containerTypes);
      }
    },
    addBarcodes(state, action) {
      const { barcodes } = action.payload;
      barcodes.forEach((barcode) => {
        if (!state.barcodes.includes(barcode)) {
          state.barcodes.push(barcode);
        }
      });
      state.barcodes.sort();
    },
    setGridBarcode(state, action) {
      const { gridId, barcode } = action.payload;
      state.grids.forEach((grid) => {
        if (grid.id === gridId) {
          grid.barcode = barcode;
        } else if (grid.barcode === barcode) {
          grid.barcode = null;
        }
      });
    },
    setSettings(state, action) {
      const { settings } = action.payload;
      state.settings = Object.assign(state.settings, settings);
    },
    setContainerTypes(state, action) {
      state.containerTypes = action.payload.containerTypes;
    },
  },
});

export const { actions, reducer } = editor;

function assignGridNames(grids, containerTypes) {
  const typeCounts = {};
  const containerTypesKeyed = containerTypes.reduce((keyed, type) => {
    keyed[type.type] = type;
    return keyed;
  }, {});
  grids.forEach((grid) => {
    if (!typeCounts[grid.containerType]) {
      typeCounts[grid.containerType] = 1;
    } else {
      typeCounts[grid.containerType]++;
    }
    let containerTypeName;
    if (containerTypesKeyed[grid.containerType]) {
      containerTypeName = containerTypesKeyed[grid.containerType].name;
    } else {
      containerTypeName = grid.containerType;
    }
    grid.name = `${containerTypeName} ${typeCounts[grid.containerType]}`;
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
