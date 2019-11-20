import { createSlice } from 'redux-starter-kit';

const experiment = createSlice({
  slice: 'experiment',
  initialState: {
    experiment: null,
    loadingStatus: null,
  },
  reducers: {
    setExperiment(state, action) {
      state.experiment = action.payload.experiment;
    },
    setLoadingStatus(state, action) {
      state.loadingStatus = action.payload.status;
    },
  },
});

export const {
  actions: experimentActions,
  reducer: experimentReducer,
} = experiment;
