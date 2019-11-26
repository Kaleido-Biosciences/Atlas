import { createSlice } from 'redux-starter-kit';

import { DEFAULT_PLATE_SIZE } from '../constants';

const experiment = createSlice({
  slice: 'experiment',
  initialState: {
    experiment: null,
    experimentLoadingStatus: null,
    versions: [],
    versionsLoadingStatus: null,
    defaultPlateSize: DEFAULT_PLATE_SIZE,
  },
  reducers: {
    setExperiment(state, action) {
      state.experiment = action.payload.experiment;
    },
    setExperimentLoadingStatus(state, action) {
      state.experimentLoadingStatus = action.payload.status;
    },
    setVersions(state, action) {
      state.versions = action.payload.versions;
    },
    setVersionsLoadingStatus(state, action) {
      state.versionsLoadingStatus = action.payload.status;
    },
  },
});

export const {
  actions: experimentActions,
  reducer: experimentReducer,
} = experiment;
