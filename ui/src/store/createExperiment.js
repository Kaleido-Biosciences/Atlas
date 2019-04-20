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
    activePlatemapId: null,
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
      const platemap = action.payload;
      platemap.id = state.platemaps.length;
      state.platemaps.push(platemap);
    },
    setActivePlatemapId(state, action) {
      state.activePlatemapId = action.payload;
    },
  },
});

export const {
  actions: createExperimentActions,
  reducer: createExperimentReducer,
} = createExperiment;

const { addPlatemap, setActivePlatemapId } = createExperimentActions;

export function createNewPlatemap(numberOfWells) {
  const platemap = {
    selected: false,
    active: false,
  };
  if (numberOfWells === 96) {
    platemap.map = getPlatemapArray(96);
    return addPlatemap(platemap);
  } else if (numberOfWells === 384) {
    platemap.map = getPlatemapArray(384);
    return addPlatemap(platemap);
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

export function createFirstPlate() {
  return (dispatch, getState) => {
    dispatch(createNewPlatemap(96));
    const { platemaps } = getState().createExperiment;
    dispatch(setActivePlatemapId(platemaps[0].id))
  };
}
