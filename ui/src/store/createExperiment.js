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
        selectedCompounds,
        selectedCommunities,
        selectedMedia,
      } = action.payload;
      state.experiment = experiment;
      if (state.plateSize !== plateSize) {
        state.plateMaps = [];
      }
      state.plateSize = plateSize;
      state.components = { communities: [], compounds: [], media: [] };
      state.selectedComponents = {
        communities: [],
        compounds: [],
        media: [],
      };
      selectedCommunities.forEach(community => {
        state.components.communities.push(community.name);
        state.selectedComponents.communities.push({
          name: community.name,
          type: 'community',
          selected: false,
          concentration: 0.5,
          editing: false,
          data: community,
        });
      });
      selectedCompounds.forEach(compound => {
        state.components.compounds.push(compound.alias);
        state.selectedComponents.compounds.push({
          name: compound.alias,
          type: 'compound',
          selected: false,
          concentration: 0.5,
          editing: false,
          data: compound,
        });
      });
      selectedMedia.forEach(medium => {
        state.components.media.push(medium.name);
        state.selectedComponents.media.push({
          name: medium.name,
          type: 'medium',
          selected: false,
          data: medium,
        });
      });
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
    setClickMode(state, action) {
      state.clickMode = action.payload;
    },
    setClearMode(state, action) {
      state.clearMode = action.payload;
    },
    selectComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        setComponentSelected(component, true, state);
      });
    },
    deselectComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        setComponentSelected(component, false, state);
      });
    },
    applySelectedComponentsToWells(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps, selectedComponents } = state;
      const componentTypes = ['communities', 'compounds', 'media'];
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const flattenedData = plateMap.data.flat();
      wellIds.forEach(wellId => {
        componentTypes.forEach(type => {
          selectedComponents[type].forEach(component => {
            if (!flattenedData[wellId][type].includes(component)) {
              flattenedData[wellId][type].push(component);
            }
          });
        });
      });
    },
    applySelectedComponentsToSelectedWells(state, action) {},
    clearWells(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps, clearMode } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const flattenedData = plateMap.data.flat();
      const componentTypes = ['communities', 'compounds', 'media'];
      wellIds.forEach(wellId => {
        if (clearMode === 'all') {
          componentTypes.forEach(type => {
            flattenedData[wellId][type] = [];
          });
        } else {
          flattenedData[wellId][clearMode] = [];
        }
      });
    },
    clearSelectedWells(state, action) {},
    toggleWellsSelected(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const flattenedData = plateMap.data.flat();
      const status = { selected: false, deselected: false };
      wellIds.forEach(wellId => {
        if (flattenedData[wellId].selected) {
          status.selected = true;
        } else {
          status.deselected = true;
        }
      });
      if ((status.selected && status.deselected) || !status.selected) {
        wellIds.forEach(wellId => {
          flattenedData[wellId].selected = true;
        });
      } else {
        wellIds.forEach(wellId => {
          flattenedData[wellId].selected = false;
        });
      }
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

function setComponentSelected(component, selected, state) {
  const { selectedComponents } = state;
  let collection;
  if (component.type === 'community') {
    collection = selectedComponents.communities;
  } else if (component.type === 'compound') {
    collection = selectedComponents.compounds;
  } else if (component.type === 'medium') {
    collection = selectedComponents.media;
  }
  const stateComponent = collection.find(comp => comp.name === component.name);
  stateComponent.selected = selected;
}
