import { createSlice } from 'redux-starter-kit';

const createExperiment = createSlice({
  slice: 'createExperiment',
  initialState: {
    experiment: '',
    components: {
      compounds: [],
      communities: [],
      media: [],
    },
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepthreeCompleted: false,
    },
  },
  reducers: {
    setExperimentOptions(state, action) {
      const { experiment, compounds, communities, media } = action.payload;
      state.experiment = experiment;
      state.components = { compounds, communities, media };
      state.steps.stepOneCompleted = true;
    },
  },
});

export const {
  actions: createExperimentActions,
  reducer: createExperimentReducer,
} = createExperiment;
