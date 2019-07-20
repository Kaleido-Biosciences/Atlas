import { createSlice, createSelector } from 'redux-starter-kit';
import validate from 'validate.js';

import {
  PLATEMAP_ROW_HEADERS,
  DEFAULT_TIMEPOINT_TIME,
  DEFAULT_TIMEPOINT_CONCENTRATION,
  DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION,
} from '../constants';

const createExperiment = createSlice({
  slice: 'createExperiment',
  initialState: {
    experiment: null,
    plateSize: { rows: 8, columns: 12 },
    plateMaps: [],
    nextPlateMapId: 1,
    components: [],
    componentsValid: true,
    clickMode: 'apply',
    clearMode: 'all',
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepthreeCompleted: false,
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
    addComponents(state, action) {
      const {
        communities = [],
        compounds = [],
        media = [],
        supplements = [],
      } = action.payload;
      const createIfNotExists = (data, type) => {
        const existingComponent = getComponentFromState(data.id, state);
        if (!existingComponent) {
          state.components.push(createComponent(data, type));
        }
      };
      communities.forEach(comm => {
        createIfNotExists(comm, 'community');
      });
      compounds.forEach(comp => {
        createIfNotExists(comp, 'compound');
      });
      media.forEach(medium => {
        createIfNotExists(medium, 'medium');
      });
      supplements.forEach(supp => {
        createIfNotExists(supp, 'supplement');
      });
    },
    removeComponents(state, action) {
      const componentsToRemove = action.payload.components;
      const { components } = state;
      const idsToRemove = componentsToRemove.map(component => component.id);
      state.components = components.filter(
        component => !idsToRemove.includes(component.id)
      );
    },
    selectComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getComponentFromState(component.id, state);
        stateComponent.selected = true;
      });
    },
    deselectComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getComponentFromState(component.id, state);
        stateComponent.selected = false;
      });
    },
    addTimepointToComponent(state, action) {
      const { component } = action.payload;
      const stateComponent = getComponentFromState(component.id, state);
      const { timepoints } = stateComponent;
      let time;
      if (timepoints.length > 0) {
        const max = timepoints.reduce((highest, current) => {
          return current.time > highest ? current.time : highest;
        }, 0);
        time = max + 24;
      }
      timepoints.push(createTimepoint(time));
    },
    updateTimepoint(state, action) {
      const { component, name, value, index } = action.payload;
      const stateComponent = getComponentFromState(component.id, state);
      const { timepoints } = stateComponent;
      const timepoint = timepoints[index];
      timepoint[name] = value;
      const errors = validate.single(
        timepoints,
        { timepoints: true },
        { fullMessages: false }
      );
      if (!errors) {
        stateComponent.isValid = true;
        stateComponent.errors = [];
        state.componentsValid = true;
      } else {
        stateComponent.isValid = false;
        stateComponent.errors = errors;
        state.componentsValid = false;
      }
    },
    deleteTimepoint(state, action) {
      const { component, index } = action.payload;
      if (index > 0) {
        const stateComponent = getComponentFromState(component.id, state);
        stateComponent.timepoints.splice(index, 1);
      }
    },
    applySelectedComponentsToWells(state, action) {
      if (state.componentsValid) {
        const { plateMapId, wellIds } = action.payload;
        const { plateMaps, components } = state;
        const plateMap = findPlateMapById(plateMapId, plateMaps);
        const updatedWells = applySelectedComponentsToWells(
          plateMap,
          wellIds,
          components
        );
        setWellsHighlightedStatus(updatedWells, state.highlightedComponents);
      }
    },
    applySelectedComponentsToSelectedWells(state, action) {
      if (state.componentsValid) {
        const { plateMapId } = action.payload;
        const { components, plateMaps } = state;
        const plateMap = findPlateMapById(plateMapId, plateMaps);
        const selectedWells = getSelectedWells(plateMap);
        const wellIds = selectedWells.map(well => well.id);
        const updatedWells = applySelectedComponentsToWells(
          plateMap,
          wellIds,
          components
        );
        setWellsHighlightedStatus(updatedWells, state.highlightedComponents);
      }
    },
    clearWells(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps, clearMode } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const flattenedData = plateMap.data.flat();
      const componentTypes = {
        communities: 'community',
        compounds: 'compound',
        media: 'medium',
        supplements: 'supplement',
      };
      const wells = [];
      wellIds.forEach(wellId => {
        const well = flattenedData[wellId];
        if (clearMode === 'all') {
          well.components = [];
        } else {
          const componentType = componentTypes[clearMode];
          well.components = well.components.filter(component => {
            return component.type !== componentType;
          });
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
      const stateComponent = getComponentFromState(component.id, state);
      stateComponent.editing = !stateComponent.editing;
    },
    setComponentConcentration(state, action) {
      const { component, value } = action.payload;
      const stateComponent = getComponentFromState(component.id, state);
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
    const rowLetter = PLATEMAP_ROW_HEADERS[i];
    for (let i = 0; i < columns; i++) {
      row.push({
        id: wellCount,
        name: `${rowLetter}${i + 1}`,
        selected: false,
        blank: false,
        highlighted: false,
        dimmed: false,
        components: [],
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
  const wells = plateMap.data.flat();
  const updatedWells = [];
  wellIds.forEach(wellId => {
    const well = wells[wellId];
    components.forEach(component => {
      if (component.selected) {
        const existingIndex = well.components.findIndex(
          comp => comp.id === component.id
        );
        const { selected, editing, ...wellComponent } = component;
        if (existingIndex === -1) {
          well.components.push(wellComponent);
        } else {
          well.components.splice(existingIndex, 1, wellComponent);
        }
      }
    });
    updatedWells.push(well);
  });
  return updatedWells;
}

// function applySelectedComponentsToWells(plateMap, wellIds, components) {
//   const componentTypes = ['communities', 'compounds', 'media'];
//   const wells = plateMap.data.flat();
//   const updatedWells = [];
//   wellIds.forEach(wellId => {
//     const well = wells[wellId];
//     componentTypes.forEach(type => {
//       components[type].forEach(component => {
//         if (component.selected) {
//           const existingIndex = wells[wellId][type].findIndex(
//             comp => comp.name === component.name
//           );
//           if (existingIndex === -1) {
//             let { selected, editing, ...wellComponent } = component;
//             well[type].push(wellComponent);
//           } else {
//             let { selected, editing, ...wellComponent } = component;
//             well[type].splice(existingIndex, 1, wellComponent);
//           }
//         }
//       });
//     });
//     updatedWells.push(well);
//   });
//   return updatedWells;
// }

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

function getComponentFromState(componentId, state) {
  return state.components.find(
    stateComponent => stateComponent.id === componentId
  );
}

function createComponent(data, type) {
  const id = data.id;
  let displayName, initialTimepoint;
  if (type === 'community') {
    displayName = data.name;
    initialTimepoint = createTimepoint();
  } else if (type === 'compound') {
    displayName = data.name;
    initialTimepoint = createTimepoint();
  } else if (type === 'medium') {
    displayName = data.name;
    createTimepoint(undefined, DEFAULT_TIMEPOINT_MEDIUM_CONCENTRATION);
  } else if (type === 'supplement') {
    displayName = data.name.label;
    initialTimepoint = createTimepoint();
  }
  const timepoints = initialTimepoint ? [initialTimepoint] : [];
  return {
    id,
    displayName,
    type,
    data,
    selected: true,
    isValid: true,
    timepoints,
  };
}

function createTimepoint(
  time = DEFAULT_TIMEPOINT_TIME,
  concentration = DEFAULT_TIMEPOINT_CONCENTRATION
) {
  return { time, concentration };
}

validate.validators.timepoints = function(timepoints) {
  const messages = [];
  let emptyTime = false,
    invalidTime = false,
    emptyConcentration = false,
    invalidConcentration = false,
    duplicateTime = false;
  const times = [];
  timepoints.forEach(timepoint => {
    const { time, concentration } = timepoint;
    if (validate.isEmpty(time)) {
      emptyTime = true;
    }
    if (!validate.isNumber(time)) {
      invalidTime = true;
    }
    if (validate.isEmpty(concentration)) {
      emptyConcentration = true;
    }
    if (!validate.isNumber(concentration) || !(concentration > 0)) {
      invalidConcentration = true;
    }
    if (times.includes(timepoint.time)) {
      duplicateTime = true;
    } else {
      times.push(timepoint.time);
    }
  });
  if (emptyTime) {
    messages.push('Time must be specified.');
  }
  if (invalidTime) {
    messages.push('Time must be a number.');
  }
  if (emptyConcentration) {
    messages.push('Concentration must be specified.');
  }
  if (invalidConcentration) {
    messages.push('Concentration must be a number > 0.');
  }
  if (duplicateTime) {
    messages.push('Times must be unique.');
  }
  return messages;
};
