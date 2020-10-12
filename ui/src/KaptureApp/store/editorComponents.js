import { createSlice } from '@reduxjs/toolkit';

import { createComponent } from 'KaptureApp/utils/toolComponentFunctions';

const initialState = {
  searchTerm: '',
  searchResults: [],
  searchPending: false,
  searchComplete: false,
  searchError: '',
  components: [],
};

const editorComponents = createSlice({
  name: 'editorComponents',
  initialState,
  reducers: {
    // TODO This should be changed to take normal components
    addKaptureComponentsToComponents(state, action) {
      const { kaptureComponents } = action.payload;
      const { components } = state;
      kaptureComponents.forEach((kaptureComponent) => {
        const { data, type, id } = kaptureComponent;
        const existingComponent = components.find(
          (component) => component.data.id === id
        );
        if (!existingComponent) {
          components.unshift(createComponent(data, type));
        }
      });
    },
    addComponentToComponents(state, action) {
      const { component } = action.payload;
      const { components } = state;
      const existingComponent = findComponent(component.id, components);
      if (!existingComponent) {
        components.unshift(component);
      }
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
  },
});

export const {
  actions: editorComponentsActions,
  reducer: editorComponentsReducer,
} = editorComponents;

function findComponent(componentId, componentArray) {
  return componentArray.find((component) => component.id === componentId);
}
