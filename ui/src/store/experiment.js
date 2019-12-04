import { createSlice } from 'redux-starter-kit';

import { DEFAULT_PLATE_SIZE } from '../constants';

const experiment = createSlice({
  slice: 'experiment',
  initialState: {
    experiment: null,
    experimentLoadingStatus: null,
    versions: [],
    versionsLoadingStatus: null,
    plateSize: DEFAULT_PLATE_SIZE,
  },
  reducers: {
    setExperiment(state, action) {
      state.experiment = action.payload.experiment;
      state.versions = [];
    },
    setExperimentLoadingStatus(state, action) {
      state.experimentLoadingStatus = action.payload.status;
    },
    setVersions(state, action) {
      const { versions } = action.payload;
      state.versions = versions;
      if (versions.length) {
        state.plateSize = getPlateSizeFromVersion(versions[0]);
      }
    },
    pushVersion(state, action) {
      const { version } = action.payload;
      state.versions.push(version);
      state.plateSize = getPlateSizeFromVersion(version);
    },
    setVersionsLoadingStatus(state, action) {
      state.versionsLoadingStatus = action.payload.status;
    },
    setPlateSize(state, action) {
      state.plateSize = action.payload.plateSize;
    },
  },
});

export const {
  actions: experimentActions,
  reducer: experimentReducer,
} = experiment;

function getPlateSizeFromVersion(version) {
  const plateMap = version.plateMaps[0];
  return {
    rows: plateMap.data.length,
    columns: plateMap.data[0].length,
  };
}
