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
    plateSize: 96,
    platemaps: [],
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
    addPlatemap(state, action) {
      state.platemaps.push(action.payload);
    },
  },
});

export const {
  actions: createExperimentActions,
  reducer: createExperimentReducer,
} = createExperiment;

const { addPlatemap } = createExperimentActions;

export function createNewPlatemap(numberOfWells) {
  if (numberOfWells === 96) {
    return addPlatemap(getPlatemapArray(96));
  } else if (numberOfWells === 384) {
    return addPlatemap(getPlatemapArray(384));
  }
}

function getPlatemapArray(size) {
  const platemap = [];
  let wellCount = 0;
  const rows = size === 96 ? 8 : 16;
  const columns = size === 96 ? 12 : 24;
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let i = 0; i < columns; i++) {
      row.push({
        id: wellCount,
        selected: false,
        blank: false,
        components: {},
      });
      wellCount++;
    }
    platemap.push(row);
  }
  return platemap;
}
