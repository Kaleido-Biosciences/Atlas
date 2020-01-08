import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
};

const editor = createSlice({
  slice: 'editor',
  initialState,
  reducers: {
    setInitialized(state, action) {
      state.initialized = action.payload.initialized;
    },
  },
});

export const { actions: editorActions, reducer: editorReducer } = editor;
