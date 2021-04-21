import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTool: 'apply',
  componentSearchTerm: '',
  componentSearchResults: [],
  componentSearchPending: false,
  componentSearchComplete: false,
  componentSearchError: '',
  applyToolComponents: [],
  applyToolComponentsValid: true,
  clickMode: 'apply',
  componentTypesToClear: [],
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setActiveTool(state, action) {
      state.activeTool = action.payload.tool;
    },
    setComponentSearchTerm(state, action) {
      state.componentSearchTerm = action.payload.searchTerm;
      state.componentSearchResults = [];
      state.componentSearchPending = false;
      state.componentSearchComplete = false;
      state.componentSearchError = '';
    },
    setComponentSearchPending(state, action) {
      state.componentSearchPending = true;
      state.componentSearchComplete = false;
      state.componentSearchError = '';
    },
    setComponentSearchResults(state, action) {
      state.componentSearchResults = action.payload.results;
      state.componentSearchPending = false;
      state.componentSearchComplete = true;
      state.componentSearchError = '';
    },
    setComponentSearchError(state, action) {
      state.componentSearchPending = false;
      state.componentSearchComplete = false;
      state.componentSearchError = action.payload.error;
    },
    resetComponentSearch(state, action) {
      state.componentSearchTerm = '';
      state.componentSearchResults = [];
      state.componentSearchPending = false;
      state.componentSearchComplete = false;
      state.componentSearchError = '';
    },
    addApplyToolComponent(state, action) {
      const { component } = action.payload;
      const { applyToolComponents } = state;
      const existingComponent = findComponent(
        component.id,
        applyToolComponents
      );
      if (!existingComponent) {
        applyToolComponents.unshift(component);
      }
    },
    updateApplyToolComponent(state, action) {
      const { component } = action.payload;
      const index = state.applyToolComponents.findIndex((c) => {
        return component.id === c.id;
      });
      state.applyToolComponents.splice(index, 1, component);
      setApplyToolComponentsValid(state);
    },
    updateApplyToolComponentSelections(state, action) {
      const { componentIds, selected } = action.payload;
      componentIds.forEach((id) => {
        const stateComponent = findComponent(id, state.applyToolComponents);
        stateComponent.selected = selected;
      });
    },
    removeApplyToolComponents(state, action) {
      const { componentIds } = action.payload;
      const { applyToolComponents } = state;
      state.applyToolComponents = applyToolComponents.filter((component) => {
        return !componentIds.includes(component.id);
      });
      setApplyToolComponentsValid(state);
    },
    setClickMode(state, action) {
      state.clickMode = action.payload.clickMode;
    },
    setComponentTypesToClear(state, action) {
      state.componentTypesToClear = action.payload.componentTypes;
    },
  },
});

export const { reducer, actions } = tools;

function findComponent(componentId, componentArray) {
  return componentArray.find((component) => component.id === componentId);
}

function setApplyToolComponentsValid(state) {
  const invalidFound = state.applyToolComponents.find((component) => {
    return !component.isValid;
  });
  state.applyToolComponentsValid = !invalidFound;
}
