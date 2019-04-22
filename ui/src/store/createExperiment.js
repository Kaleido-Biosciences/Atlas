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
    plateSize: 96,
    activePlateMapId: null,
    plateMaps: [],
    nextPlateMapId: 1,
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepthreeCompleted: false,
    },
  },
  reducers: {
    //change to init experiment
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
        state.plateMaps = [];
      }
      state.plateSize = plateSize;
      state.components = { compounds, communities, media };
      state.steps.stepOneCompleted = true;
    },
    addPlateMap(state, action) {
      const plateMap = action.payload;
      plateMap.id = state.nextPlateMapId;
      state.plateMaps.push(plateMap);
      state.nextPlateMapId++;
    },
    setActivePlateMapId(state, action) {
      state.activePlateMapId = action.payload;
    },
    deletePlateMap(state, action) {
      const idToRemove = action.payload;
      state.plateMaps = state.plateMaps.filter((plateMap, i) => {
        return plateMap.id !== idToRemove;
      });
      if (state.activePlateMapId === idToRemove) {
        state.activePlateMapId = null;
      }
    },
  },
});

export const {
  actions: createExperimentActions,
  reducer: createExperimentReducer,
} = createExperiment;

const { addPlateMap, setActivePlateMapId } = createExperimentActions;

export function createPlateMap(numberOfWells) {
  const plateMap = {
    selected: false,
    active: false,
  };
  if (numberOfWells === 96) {
    plateMap.data = getPlateMapArray(96);
  } else if (numberOfWells === 384) {
    plateMap.data = getPlateMapArray(384);
  }
  return addPlateMap(plateMap);
}

function getPlateMapArray(size) {
  const plateMap = [];
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
    plateMap.push(row);
  }
  return plateMap;
}

export function initPlateMaps(plateSize) {
  return (dispatch, getState) => {
    let { plateMaps } = getState().createExperiment;
    if (!plateMaps.length) {
      dispatch(createPlateMap(plateSize));
      let { plateMaps } = getState().createExperiment;
      dispatch(setActivePlateMapId(plateMaps[0].id));
    }
  };
}

export const selectActivePlateMap = createSelector(
  ['createExperiment.plateMaps', 'createExperiment.activePlateMapId'],
  (plateMaps, activePlateMapId) => {
    if (plateMaps.length) {
      return plateMaps.find(plateMap => plateMap.id === activePlateMapId);
    } else return null;
  }
);
