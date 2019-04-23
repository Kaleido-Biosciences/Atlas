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
    plateMaps: [],
    nextPlateMapId: 1,
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepthreeCompleted: false,
    },
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
    setActivePlateMap(state, action) {
      const plateMapId = action.payload;
      const { plateMaps } = state;
      plateMaps.forEach(plateMap => {
        if (plateMap.id === plateMapId) {
          plateMap.active = true;
        } else if (plateMap.active) {
          plateMap.active = false;
        }
      });
    },
    deletePlateMap(state, action) {
      const idToRemove = action.payload;
      state.plateMaps = state.plateMaps.filter((plateMap, i) => {
        return plateMap.id !== idToRemove;
      });
    },
    toggleWellSelected(state, action) {
      const { plateMapId, wellId } = action.payload;
      const plateMap = findPlateMapById(plateMapId, state.plateMaps);
      const rowSize = plateMap.data[0].length;
      const row = Math.floor(wellId / rowSize);
      const index = wellId % rowSize;
      const well = plateMap.data[row][index];
      well.selected = !well.selected;
    },
  },
});

export const {
  actions: createExperimentActions,
  reducer: createExperimentReducer,
} = createExperiment;

const { addPlateMap, setActivePlateMap } = createExperimentActions;

export function initializePlateMaps() {
  return (dispatch, getState) => {
    let { plateMaps } = getState().createExperiment;
    if (!plateMaps.length) {
      dispatch(createPlateMap());
      let { plateMaps } = getState().createExperiment;
      dispatch(setActivePlateMap(plateMaps[0].id));
    }
  };
}

export function createPlateMap() {
  return (dispatch, getState) => {
    const { plateSize, plateMaps } = getState().createExperiment;
    const plateMap = {
      selected: false,
      active: false,
    };
    plateMap.data = getPlateMapArray(plateSize);
    if (!plateMaps.length) plateMap.active = true;
    dispatch(addPlateMap(plateMap));
  };
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

export const selectActivePlateMap = createSelector(
  ['createExperiment.plateMaps'],
  plateMaps => {
    if (plateMaps.length) {
      return plateMaps.find(plateMap => plateMap.active);
    } else return null;
  }
);

function findPlateMapById(id, plateMaps) {
  return plateMaps.find((plateMap, i) => {
    return plateMap.id === id;
  });
}
