import { createSlice } from '@reduxjs/toolkit';
// import validate from 'validate.js';

// import { createTimepoint } from 'KaptureApp/utils/toolComponentFunctions';

const initialState = {
  activeTool: 'apply',
  componentSearchTerm: '',
  componentSearchResults: [],
  componentSearchPending: false,
  componentSearchComplete: false,
  componentSearchError: '',
  applyToolComponents: [],
  // applyToolComponentsValid: true,
  // clickMode: 'apply',
  // componentTypesToClear: [],
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
    },
    // setClickMode(state, action) {
    //   state.clickMode = action.payload.clickMode;
    // },
    // setComponentTypesToClear(state, action) {
    //   state.componentTypesToClear = action.payload.componentTypesToClear;
    // },
    // addTimepointToComponent(state, action) {
    //   const { component } = action.payload;
    //   const stateComponent = findComponent(component.id, state.toolComponents);
    //   const { timepoints } = stateComponent;
    //   let time;
    //   if (timepoints.length > 0) {
    //     const max = timepoints.reduce((highest, current) => {
    //       return current.time > highest ? current.time : highest;
    //     }, 0);
    //     time = max + 24;
    //   }
    //   timepoints.push(createTimepoint(component.type, time));
    // },
    // updateTimepoint(state, action) {
    //   const { component, name, value, index } = action.payload;
    //   const stateComponent = findComponent(component.id, state.toolComponents);
    //   const { timepoints } = stateComponent;
    //   const timepoint = timepoints[index];
    //   timepoint[name] = value;
    //   const errors = validate.single(
    //     timepoints,
    //     { timepoints: true },
    //     { fullMessages: false }
    //   );
    //   if (!errors) {
    //     stateComponent.isValid = true;
    //     stateComponent.errors = [];
    //     state.toolComponentsValid = true;
    //   } else {
    //     stateComponent.isValid = false;
    //     stateComponent.errors = errors;
    //     state.toolComponentsValid = false;
    //   }
    // },
    // deleteTimepoint(state, action) {
    //   const { component, index } = action.payload;
    //   if (index > 0) {
    //     const stateComponent = findComponent(
    //       component.id,
    //       state.toolComponents
    //     );
    //     stateComponent.timepoints.splice(index, 1);
    //   }
    // },
  },
});

export const { reducer, actions } = tools;

function findComponent(componentId, componentArray) {
  return componentArray.find((component) => component.id === componentId);
}
