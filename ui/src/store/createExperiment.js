import { createSlice } from 'redux-starter-kit';
import validate from 'validate.js';

import { STATUS_DRAFT, STATUS_COMPLETED } from '../constants';
import {
  getSelectedWells,
  applySelectedComponentsToWells,
  findPlateMapById,
  createComponent,
  createTimepoint,
} from './plateFunctions';

const createExperiment = createSlice({
  slice: 'createExperiment',
  initialState: {
    experiment: null,
    status: STATUS_DRAFT,
    plateSize: { rows: 8, columns: 12 },
    plateMaps: [],
    nextPlateMapId: 1,
    components: [],
    recentComponents: [],
    componentsValid: true,
    clickMode: 'apply',
    clearMode: 'all',
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepThreeCompleted: false,
    },
    highlightedComponents: [],
  },
  reducers: {
    setExperimentOptions(state, action) {
      const { experiment, plateSize, plateMaps } = action.payload;
      state.experiment = experiment;
      state.plateMaps =
        !plateMaps ||
        (state.plateSize &&
          (state.plateSize.rows !== plateSize.rows ||
            state.plateSize.columns !== plateSize.columns))
          ? []
          : plateMaps;
      state.plateSize = plateSize;
      state.steps.stepOneCompleted = true;
    },
    addPlateMap(state, action) {
      const plateMap = action.payload;
      plateMap.id = state.nextPlateMapId;
      state.plateMaps.push(plateMap);
      state.nextPlateMapId++;
    },
    updateNextPlateMapId(state, action) {
      state.nextPlateMapId = action.payload;
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
          state.components.unshift(createComponent(data, type));
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
      let addToRecent = [];
      idsToRemove.forEach(id => {
        const index = components.findIndex(component => component.id === id);
        if (index > -1) {
          addToRecent = addToRecent.concat(components.splice(index, 1));
        }
      });
      state.recentComponents = state.recentComponents.concat(addToRecent);
    },
    moveRecentComponentsToComponents(state, action) {
      const componentsToMove = action.payload.components;
      const { recentComponents } = state;
      const idsToMove = componentsToMove.map(component => component.id);
      let addToComponents = [];
      idsToMove.forEach(id => {
        const index = recentComponents.findIndex(
          component => component.id === id
        );
        if (index > -1) {
          addToComponents = addToComponents.concat(
            recentComponents.splice(index, 1)
          );
        }
      });
      const newComponents = addToComponents.map(component => {
        return createComponent(component.data, component.type);
      });
      state.components = newComponents.concat(state.components);
    },
    removeRecentComponents(state, action) {
      const componentsToRemove = action.payload.components;
      const { recentComponents } = state;
      const idsToDelete = componentsToRemove.map(component => component.id);
      state.recentComponents = recentComponents.filter(
        component => !idsToDelete.includes(component.id)
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
      timepoints.push(createTimepoint(component.type, time));
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
        applySelectedComponentsToWells(plateMap, wellIds, components);
      }
    },
    applySelectedComponentsToSelectedWells(state, action) {
      if (state.componentsValid) {
        const { plateMapId } = action.payload;
        const { components, plateMaps } = state;
        const plateMap = findPlateMapById(plateMapId, plateMaps);
        const selectedWells = getSelectedWells(plateMap);
        const wellIds = selectedWells.map(well => well.id);
        applySelectedComponentsToWells(plateMap, wellIds, components);
      }
    },
    clearWells(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps, clearMode } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const wells = plateMap.data.flat();
      const componentTypes = {
        communities: 'community',
        compounds: 'compound',
        media: 'medium',
        supplements: 'supplement',
      };
      const updatedWells = [];
      const filteredWells = wells.filter(well => wellIds.includes(well.id));
      filteredWells.forEach(well => {
        if (clearMode === 'all') {
          well.components = [];
        } else {
          const componentType = componentTypes[clearMode];
          well.components = well.components.filter(component => {
            return component.type !== componentType;
          });
        }
        updatedWells.push(well);
      });
    },
    deselectAllWells(state, action) {
      const { plateMapId } = action.payload;
      const { plateMaps } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const wells = plateMap.data.flat();
      wells.forEach(well => {
        well.selected = false;
      });
    },
    toggleWellsSelected(state, action) {
      const { plateMapId, wellIds } = action.payload;
      const { plateMaps } = state;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const wells = plateMap.data.flat();
      const filteredWells = wells.filter(well => wellIds.includes(well.id));
      const status = { selected: false, deselected: false };
      filteredWells.forEach(well => {
        if (well.selected) {
          status.selected = true;
        } else {
          status.deselected = true;
        }
      });
      if ((status.selected && status.deselected) || !status.selected) {
        filteredWells.forEach(well => {
          well.selected = true;
        });
      } else {
        filteredWells.forEach(well => {
          well.selected = false;
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
    setCompletedStatus(state, action) {
      state.status = STATUS_COMPLETED;
      state.steps.stepTwoCompleted = true;
    },
    setStepThreeComplete(state, action) {
      state.steps.stepThreeCompleted = true;
    },
  },
});

export const {
  actions: createExperimentActions,
  reducer: createExperimentReducer,
} = createExperiment;

function getComponentFromState(componentId, state) {
  return state.components.find(
    stateComponent => stateComponent.id === componentId
  );
}
