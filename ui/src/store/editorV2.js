import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  initializationError: null,
  containers: [],
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
  },
});

export const { actions: editorV2Actions, reducer: editorV2Reducer } = editorV2;
