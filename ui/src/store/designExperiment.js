import { createSlice } from 'redux-starter-kit';
import validate from 'validate.js';

import {
  STATUS_DRAFT,
  STATUS_COMPLETED,
  DEFAULT_COMPONENT_COLOR_CODES,
} from '../constants';
import { createTimepoint } from './plateFunctions';

const designExperiment = createSlice({
  slice: 'designExperiment',
  initialState: {
    experiment: null,
    status: STATUS_DRAFT,
    plateSize: { rows: 8, columns: 12 },
    plates: [],
    nextPlateId: 1,
    components: [],
    toolComponents: [],
    toolComponentsValid: true,
    componentCounts: {},
    clickMode: 'apply',
    clearMode: 'all',
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepThreeCompleted: false,
    },
    saveStatus: null,
    lastSaveTime: null,
    settings: {
      wellSize: {
        size: 120,
        padding: 5,
      },
      componentColors: Object.assign({}, DEFAULT_COMPONENT_COLOR_CODES),
    },
    barcodes: [],
  },
  reducers: {
    setExperimentOptions(state, action) {
      const { experiment, plateSize, plates } = action.payload;
      if (state.experiment && state.experiment.id === experiment.id) {
        if (
          state.plateSize.rows !== plateSize.rows ||
          state.plateSize.columns !== plateSize.columns
        ) {
          state.plates = [];
        }
      } else {
        state.plates = plates || [];
      }
      state.experiment = experiment;
      state.plateSize = plateSize;
      state.steps.stepOneCompleted = true;
    },
    removeToolComponents(state, action) {
      const componentsToRemove = action.payload.components;
      const { toolComponents } = state;
      const idsToRemove = componentsToRemove.map(component => component.id);
      idsToRemove.forEach(id => {
        const index = toolComponents.findIndex(
          component => component.id === id
        );
        if (index > -1) {
          toolComponents.splice(index, 1);
        }
      });
    },
    selectToolComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getToolComponentFromState(component.id, state);
        stateComponent.selected = true;
      });
    },
    deselectToolComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getToolComponentFromState(component.id, state);
        stateComponent.selected = false;
      });
    },
    addTimepointToComponent(state, action) {
      const { component } = action.payload;
      const stateComponent = getToolComponentFromState(component.id, state);
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
      const stateComponent = getToolComponentFromState(component.id, state);
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
        const stateComponent = getToolComponentFromState(component.id, state);
        stateComponent.timepoints.splice(index, 1);
      }
    },
    toggleComponentEditing(state, action) {
      const { component } = action.payload;
      const stateComponent = getToolComponentFromState(component.id, state);
      stateComponent.editing = !stateComponent.editing;
    },
    setComponentConcentration(state, action) {
      const { component, value } = action.payload;
      const stateComponent = getToolComponentFromState(component.id, state);
      stateComponent.concentration = value;
    },
    setDraftStatus(state, action) {
      state.status = STATUS_DRAFT;
    },
    setCompletedStatus(state, action) {
      state.status = STATUS_COMPLETED;
      state.steps.stepTwoCompleted = true;
    },
    setStepThreeComplete(state, action) {
      state.steps.stepThreeCompleted = true;
    },
    setSaveStatus(state, action) {
      const { saveStatus } = action.payload;
      state.saveStatus = saveStatus;
      if (saveStatus === 'SUCCESS') {
        state.lastSaveTime = Date.now();
      }
    },
  },
});

export const {
  actions: designExperimentActions,
  reducer: designExperimentReducer,
} = designExperiment;

function getToolComponentFromState(componentId, state) {
  return state.toolComponents.find(
    stateComponent => stateComponent.id === componentId
  );
}
