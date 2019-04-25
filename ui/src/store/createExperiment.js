import { createSlice, createSelector } from 'redux-starter-kit';
import { plateMapRowHeaders } from '../constants';

const createExperiment = createSlice({
  slice: 'createExperiment',
  initialState: {
    experiment: '',
    components: {
      compounds: ['KB10-14', 'KB100-2'],
      communities: ['057-002', '057-012'],
      media: ['MM.10', 'MM.11', 'CM.10', 'CM.11'],
    },
    plateSize: 96,
    plateMaps: [],
    nextPlateMapId: 1,
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepthreeCompleted: false,
    },
    clickMode: 'apply',
    clearMode: 'all',
    selectedComponents: {
      compounds: [],
      communities: [],
      media: [],
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
    setClickMode(state, action) {
      state.clickMode = action.payload;
    },
    setSelectedComponents(state, action) {
      const { type, selections } = action.payload;
      state.selectedComponents[type] = selections;
    },
    modifyWells(state, action) {
      const { plateMapId, wellIds, values } = action.payload;
      const plateMap = findPlateMapById(plateMapId, state.plateMaps);
      const flattenedData = plateMap.data.flat();
      wellIds.forEach(wellId => {
        flattenedData[wellId] = Object.assign(flattenedData[wellId], values);
      });
    },
    setClearMode(state, action) {
      state.clearMode = action.payload;
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
    const rowLetter = plateMapRowHeaders[i];
    for (let i = 0; i < columns; i++) {
      row.push({
        id: wellCount,
        name: `${rowLetter}${i + 1}`,
        selected: false,
        blank: false,
        compounds: [],
        communities: [],
        media: [],
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
