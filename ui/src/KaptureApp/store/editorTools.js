import { createSlice } from 'redux-starter-kit';
import validate from 'validate.js';

import { createTimepoint } from 'KaptureApp/utils/plateFunctions';

const initialState = {
  toolComponents: [],
  toolComponentsValid: true,
  clickMode: 'apply',
  componentTypesToClear: [],
};

const editorTools = createSlice({
  slice: 'editorTools',
  initialState,
  reducers: {
    addComponentToToolComponents(state, action) {
      const { component } = action.payload;
      const { toolComponents } = state;
      const existingComponent = findComponent(component.id, toolComponents);
      if (!existingComponent) {
        toolComponents.unshift(component);
      }
    },
    setClickMode(state, action) {
      state.clickMode = action.payload.clickMode;
    },
    setComponentTypesToClear(state, action) {
      state.componentTypesToClear = action.payload.componentTypesToClear;
    },
    selectToolComponents(state, action) {
      const { components } = action.payload;
      components.forEach((component) => {
        const stateComponent = findComponent(
          component.id,
          state.toolComponents
        );
        stateComponent.selected = true;
      });
    },
    deselectToolComponents(state, action) {
      const { components } = action.payload;
      components.forEach((component) => {
        const stateComponent = findComponent(
          component.id,
          state.toolComponents
        );
        stateComponent.selected = false;
      });
    },
    removeToolComponents(state, action) {
      const componentsToRemove = action.payload.components;
      const { toolComponents } = state;
      const idsToRemove = componentsToRemove.map((component) => component.id);
      idsToRemove.forEach((id) => {
        const index = toolComponents.findIndex(
          (component) => component.id === id
        );
        if (index > -1) {
          toolComponents.splice(index, 1);
        }
      });
    },
    addTimepointToComponent(state, action) {
      const { component } = action.payload;
      const stateComponent = findComponent(component.id, state.toolComponents);
      const { timepoints } = stateComponent;
      let time;
      if (timepoints.length > 0) {
        const max = timepoints.reduce((highest, current) => {
          return current.time > highest ? current.time : highest;
        }, 0);
        time = max + 24;
      }
      timepoints.push(createTimepoint(component.type, time));
    },
    updateTimepoint(state, action) {
      const { component, name, value, index } = action.payload;
      const stateComponent = findComponent(component.id, state.toolComponents);
      const { timepoints } = stateComponent;
      const timepoint = timepoints[index];
      timepoint[name] = value;
      const errors = validate.single(
        timepoints,
        { timepoints: true },
        { fullMessages: false }
      );
      if (!errors) {
        stateComponent.isValid = true;
        stateComponent.errors = [];
        state.toolComponentsValid = true;
      } else {
        stateComponent.isValid = false;
        stateComponent.errors = errors;
        state.toolComponentsValid = false;
      }
    },
    deleteTimepoint(state, action) {
      const { component, index } = action.payload;
      if (index > 0) {
        const stateComponent = findComponent(
          component.id,
          state.toolComponents
        );
        stateComponent.timepoints.splice(index, 1);
      }
    },
  },
});

export const {
  actions: editorToolsActions,
  reducer: editorToolsReducer,
} = editorTools;

function findComponent(componentId, componentArray) {
  return componentArray.find((component) => component.id === componentId);
}
