import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  initializationError: null,
  plates: [],
};

const print = createSlice({
  slice: 'print',
  initialState,
  reducers: {
    setPlates(state, action) {
      state.plates = action.payload.plates;
      state.initialized = true;
    },
    setInitializationError(state, action) {
      state.initializationError = action.payload.error;
    },
    resetState(state, action) {
      for (var property in initialState) {
        state[property] = initialState[property];
      }
    },
  },
});

export const { actions: printActions, reducer: printReducer } = print;
