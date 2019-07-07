import { createSlice, createSelector } from 'redux-starter-kit';
import { plateMapRowHeaders } from '../constants';

const createExperiment = createSlice({
  slice: 'createExperiment',
  initialState: {
    experiment: null,
    plateSize: { rows: 8, columns: 12 },
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
    highlightedComponents: [],
  },
  reducers: {
    setExperimentOptions(state, action) {
      const { experiment, plateSize } = action.payload;
      state.experiment = experiment;
      if (
        state.plateSize &&
        (state.plateSize.rows !== plateSize.rows ||
          state.plateSize.columns !== plateSize.columns)
      ) {
        state.plateMaps = [];
      }
      state.plateSize = plateSize;
      state.steps.stepOneCompleted = true;
    },
    // setExperimentOptions(state, action) {
    //   const {
    //     experiment,
    //     plateSize,
    //     selectedCompounds,
    //     selectedCommunities,
    //     selectedMedia,
    //     selectedSupplements,
    //   } = action.payload;
    //   state.experiment = experiment;
    //   if (state.plateSize !== plateSize) {
    //     state.plateMaps = [];
    //   }
    //   state.plateSize = plateSize;
    //   state.selectedComponents = {
    //     communities: [],
    //     compounds: [],
    //     media: [],
    //     supplements: [],
    //   };
    //   selectedCommunities.forEach(community => {
    //     state.selectedComponents.communities.push({
    //       id: community.id,
    //       name: community.name,
    //       type: 'community',
    //       selected: false,
    //       concentration: 0.5,
    //       editing: false,
    //       data: community,
    //     });
    //   });
    //   selectedCompounds.forEach(compound => {
    //     state.selectedComponents.compounds.push({
    //       id: compound.id,
    //       name: compound.name,
    //       type: 'compound',
    //       selected: false,
    //       concentration: 0.5,
    //       editing: false,
    //       data: compound,
    //     });
    //   });
    //   selectedMedia.forEach(medium => {
    //     state.selectedComponents.media.push({
    //       id: medium.id,
    //       name: medium.name,
    //       type: 'medium',
    //       selected: false,
    //       data: medium,
    //     });
    //   });
    //   selectedSupplements.forEach(supplement => {
    //     state.selectedComponents.supplements.push({
    //       id: supplement.id,
    //       name: supplement.name.label,
    //       type: 'supplement',
    //       selected: false,
    //       data: supplement,
    //     });
    //   });
    //   state.steps.stepOneCompleted = true;
    // },
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
      // TODO might want to move this to a thunk
      // and maybe select the plate immediately 
      // before the deleted one.
      if (state.plateMaps.length) {
        state.plateMaps.forEach(plateMap => {
          plateMap.active = false;
        });
        state.plateMaps[0].active = true;
      }
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
        const stateComponent = getComponentFromState(component, state);
        stateComponent.selected = true;
      });
    },
    deselectComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getComponentFromState(component, state);
        stateComponent.selected = false;
      });
    },
    applySelectedComponentsToWells(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps, selectedComponents } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const updatedWells = applySelectedComponentsToWells(
        plateMap,
        wellIds,
        selectedComponents
      );
      setWellsHighlightedStatus(updatedWells, state.highlightedComponents);
    },
    applySelectedComponentsToSelectedWells(state, action) {
      const { plateMapId } = action.payload;
      const { selectedComponents, plateMaps } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const selectedWells = getSelectedWells(plateMap);
      const wellIds = selectedWells.map(well => well.id);
      const updatedWells = applySelectedComponentsToWells(
        plateMap,
        wellIds,
        selectedComponents
      );
      setWellsHighlightedStatus(updatedWells, state.highlightedComponents);
    },
    clearWells(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps, clearMode } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const flattenedData = plateMap.data.flat();
      const componentTypes = ['communities', 'compounds', 'media'];
      const wells = [];
      wellIds.forEach(wellId => {
        const well = flattenedData[wellId];
        if (clearMode === 'all') {
          componentTypes.forEach(type => {
            well[type] = [];
          });
        } else {
          well[clearMode] = [];
        }
        wells.push(well);
      });
      setWellsHighlightedStatus(wells, state.highlightedComponents);
    },
    clearSelectedWells(state, action) {
      const { plateMapId } = action.payload;
      const { plateMaps } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const flat = plateMap.data.flat();
      flat.forEach(well => {
        well.selected = false;
      });
    },
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
    toggleComponentEditing(state, action) {
      const { component } = action.payload;
      const stateComponent = getComponentFromState(component, state);
      stateComponent.editing = !stateComponent.editing;
    },
    setComponentConcentration(state, action) {
      const { component, value } = action.payload;
      const stateComponent = getComponentFromState(component, state);
      stateComponent.concentration = value;
    },
    toggleHighlight(state, action) {
      const { componentType } = action.payload;
      const { highlightedComponents } = state;
      const index = highlightedComponents.indexOf(componentType);
      if (index > -1) {
        highlightedComponents.splice(index, 1);
      } else {
        highlightedComponents.push(componentType);
      }
      let wells = [];
      state.plateMaps.forEach(plateMap => {
        const flat = plateMap.data.flat();
        wells = wells.concat(flat);
      });
      setWellsHighlightedStatus(wells, highlightedComponents);
    },
  },
});

function setWellsHighlightedStatus(wells, highlightedComponents) {
  const numberOfComponents = highlightedComponents.length;
  if (!numberOfComponents) {
    wells.forEach(well => {
      well.highlighted = false;
      well.dimmed = false;
    });
  } else {
    wells.forEach(well => {
      const hasComponent = highlightedComponents.some(type => {
        return well[type].length > 0;
      });
      if (hasComponent) {
        well.highlighted = true;
        well.dimmed = false;
      } else {
        well.highlighted = false;
        well.dimmed = true;
      }
    });
  }
  return wells;
}

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

function getPlateMapArray(dimensions) {
  const { rows, columns } = dimensions;
  const plateMap = [];
  let wellCount = 0;
  for (let i = 0; i < rows; i++) {
    const row = [];
    const rowLetter = plateMapRowHeaders[i];
    for (let i = 0; i < columns; i++) {
      row.push({
        id: wellCount,
        name: `${rowLetter}${i + 1}`,
        selected: false,
        blank: false,
        highlighted: false,
        dimmed: false,
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
  getActivePlateMap
);

export const selectSelectedWellsFromActivePlateMap = createSelector(
  ['createExperiment.plateMaps'],
  plateMaps => {
    const activePlateMap = getActivePlateMap(plateMaps);
    if (activePlateMap) {
      return getSelectedWells(activePlateMap);
    } else return null;
  }
);

function applySelectedComponentsToWells(plateMap, wellIds, components) {
  const componentTypes = ['communities', 'compounds', 'media'];
  const wells = plateMap.data.flat();
  const updatedWells = [];
  wellIds.forEach(wellId => {
    const well = wells[wellId];
    componentTypes.forEach(type => {
      components[type].forEach(component => {
        if (component.selected) {
          const existingIndex = wells[wellId][type].findIndex(
            comp => comp.name === component.name
          );
          if (existingIndex === -1) {
            let { selected, editing, ...wellComponent } = component;
            well[type].push(wellComponent);
          } else {
            let { selected, editing, ...wellComponent } = component;
            well[type].splice(existingIndex, 1, wellComponent);
          }
        }
      });
    });
    updatedWells.push(well);
  });
  return updatedWells;
}

function getSelectedWells(plateMap) {
  const flat = plateMap.data.flat();
  return flat.filter(well => well.selected);
}

function getActivePlateMap(plateMaps) {
  if (plateMaps.length > 0) {
    return plateMaps.find(plateMap => plateMap.active);
  } else return null;
}

function findPlateMapById(id, plateMaps) {
  return plateMaps.find((plateMap, i) => {
    return plateMap.id === id;
  });
}

function getComponentFromState(component, state) {
  const { type } = component;
  let collection;
  if (type === 'community') {
    collection = state.selectedComponents.communities;
  } else if (type === 'compound') {
    collection = state.selectedComponents.compounds;
  } else if (type === 'medium') {
    collection = state.selectedComponents.media;
  }
  return collection.find(
    stateComponent => stateComponent.name === component.name
  );
}
