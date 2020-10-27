import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  components: [],
  searchTerm: '',
  searchResults: [],
  searchPending: false,
  searchComplete: false,
  searchError: '',
  importText: '',
  importComponentNames: [],
  importFound: [],
  importNotFound: [],
  importPending: false,
  importComplete: false,
  importError: '',
};

const editorComponents = createSlice({
  name: 'editorComponents',
  initialState,
  reducers: {
    addComponents(state, action) {
      const { components } = action.payload;
      components.forEach((newComponent) => {
        const existingComponent = findComponent(
          newComponent.id,
          state.components
        );
        if (!existingComponent) {
          state.components.unshift(newComponent);
        }
      });
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.searchTerm;
      state.searchResults = [];
      state.searchComplete = false;
      state.searchError = '';
    },
    setSearchPending(state, action) {
      state.searchPending = true;
      state.searchComplete = false;
      state.searchError = '';
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload.results;
      state.searchPending = false;
      state.searchComplete = true;
      state.searchError = '';
    },
    setSearchError(state, action) {
      state.searchError = action.payload.error;
      state.searchPending = false;
      state.searchComplete = false;
    },
    resetComponents(state, action) {
      state.searchTerm = '';
      state.searchResults = [];
      state.searchPending = false;
      state.searchComplete = false;
      state.searchError = '';
    },
    setImportText(state, action) {
      const importText = action.payload.importText;
      state.importText = importText;
      state.importComponentNames = importText.trim().split(/\r|\n/);
    },
    addImportResult(state, action) {
      const { result } = action.payload;
      if (result.found) {
        state.importFound = [result].concat(state.importFound);
      } else {
        state.importNotFound = [result].concat(state.importNotFound);
      }
    },
    setImportPending(state, action) {
      state.importPending = true;
    },
    setImportComplete(state, action) {
      state.importPending = false;
      state.importComplete = true;
    },
    resetImport(state, action) {
      state.importText = '';
      state.importComponentNames = [];
      state.importFound = [];
      state.importNotFound = [];
      state.importPending = false;
      state.importComplete = false;
      state.importError = '';
    },
  },
});

export const {
  actions: editorComponentsActions,
  reducer: editorComponentsReducer,
} = editorComponents;

function findComponent(componentId, componentArray) {
  return componentArray.find((component) => component.id === componentId);
}
