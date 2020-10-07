import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  importStarted: false,
  importPending: false,
  importError: null,
  importedComponents: [],
  componentImportErrors: [],
};

const editorImport = createSlice({
  name: 'editorImport',
  initialState,
  reducers: {
    setImportPending(state, action) {
      state.importStarted = true;
      state.importPending = true;
    },
    setImportResults(state, action) {
      const { importedComponents, componentImportErrors } = action.payload;
      state.importedComponents = importedComponents;
      state.componentImportErrors = componentImportErrors;
      state.importPending = false;
    },
    setImportError(state, action) {
      state.importError = action.payload.error;
      state.importPending = false;
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  actions: editorImportActions,
  reducer: editorImportReducer,
} = editorImport;
