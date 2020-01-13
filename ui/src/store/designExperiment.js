import { createSlice } from 'redux-starter-kit';

import {
  STATUS_DRAFT,
  STATUS_COMPLETED,
  DEFAULT_COMPONENT_COLOR_CODES,
} from '../constants';

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
