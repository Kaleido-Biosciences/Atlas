import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  plates: [],
};

const print = createSlice({
  slice: 'print',
  initialState,
  reducers: {
    setPlates(state, action) {
      state.plates = action.payload.plates;
    },
    setInitialized(state, action) {
      state.initialized = action.payload.initialized;
    },
  },
});

export const { actions: printActions, reducer: printReducer } = print;
