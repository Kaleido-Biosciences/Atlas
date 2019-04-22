import { createSlice, createSelector } from 'redux-starter-kit';

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
    nextPlatemapId: 1,
  },
  reducers: {
    setExperimentOptions(state, action) {
      const {
        experiment,
        plateSize,
        compounds,
        communities,
        media,
      } = action.payload;
      state.experiment = experiment;
      if (state.plateSize !== plateSize) {
        state.platemaps = [];
      }
      state.plateSize = plateSize;
      state.components = { compounds, communities, media };
      state.steps.stepOneCompleted = true;
    },
    addPlatemap(state, action) {
      const platemap = action.payload;
      platemap.id = state.nextPlatemapId;
      state.platemaps.push(platemap);
      state.nextPlatemapId++;
    },
    setActivePlatemapId(state, action) {
      state.activePlatemapId = action.payload;
    },
    deletePlatemap(state, action) {
      const idToRemove = action.payload;
      state.platemaps = state.platemaps.filter((platemap, i) => {
        return platemap.id !== idToRemove;
      });
      if (state.activePlatemapId === idToRemove) {
        state.activePlatemapId = null;
      }
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

export function initPlatemaps(plateSize) {
  return (dispatch, getState) => {
    let { platemaps } = getState().createExperiment;
    if (!platemaps.length) {
      dispatch(createNewPlatemap(plateSize));
      let { platemaps } = getState().createExperiment;
      dispatch(setActivePlatemapId(platemaps[0].id));
    }
  };
}

export const selectActivePlatemap = createSelector(
  ['createExperiment.platemaps', 'createExperiment.activePlatemapId'],
  (platemaps, activePlatemapId) => {
    if (platemaps.length) {
      return platemaps.find(platemap => platemap.id === activePlatemapId);
    } else return null;
  }
);
