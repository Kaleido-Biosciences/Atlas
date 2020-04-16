import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  initializationError: null,
  grids: [],
  containerTypes: {},
};

const print = createSlice({
  slice: 'print',
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
    setContainerTypes(state, action) {
      state.containerTypes = action.payload.containerTypes;
    },
  },
});

export const { actions: printActions, reducer: printReducer } = print;

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
