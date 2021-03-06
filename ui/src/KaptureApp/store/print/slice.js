import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  initialized: false,
  initializationError: null,
  grids: [],
};

const print = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setGrids(state, action) {
      state.grids = action.payload.grids;
      state.initialized = true;
      assignGridNames(state.grids, state.containerTypes);
    },
    setInitializationError(state, action) {
      state.initializationError = action.payload.error;
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const { actions, reducer } = print;

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
      containerTypeName = containerTypes[grid.containerType].name;
    } else {
      containerTypeName = grid.containerType;
    }
    grid.name = `${containerTypeName} ${typeCounts[grid.containerType]}`;
  });
}
