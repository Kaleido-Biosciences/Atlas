import { createSlice } from 'redux-starter-kit';
import validate from 'validate.js';

import { STATUS_DRAFT, STATUS_COMPLETED } from '../constants';
import {
  getSelectedWells,
  applySelectedComponentsToWells,
  findPlateById,
  createComponent,
  createTimepoint,
} from './plateFunctions';

const designExperiment = createSlice({
  slice: 'designExperiment',
  initialState: {
    experiment: null,
    status: STATUS_DRAFT,
    plateSize: { rows: 8, columns: 12 },
    plates: [],
    nextPlateId: 1,
    componentList: [],
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
  },
  reducers: {
    setExperimentOptions(state, action) {
      const { experiment, plateSize, plates } = action.payload;
      if (state.experiment && state.experiment.id === experiment.id) {
        if (
          state.plateSize.rows !== plateSize.rows ||
          state.plateSize.columns !== plateSize.columns
        ) {
          state.plates = [];
        }
      } else {
        state.plates = plates || [];
      }
      state.experiment = experiment;
      state.plateSize = plateSize;
      state.steps.stepOneCompleted = true;
    },
    addPlate(state, action) {
      const plate = action.payload;
      plate.id = state.nextPlateId;
      state.plates.push(plate);
      state.nextPlateId++;
    },
    resetNextPlateId(state, action) {
      state.nextPlateId = 1;
    },
    updateNextPlateId(state, action) {
      state.nextPlateId = action.payload;
    },
    setActivePlate(state, action) {
      const plateId = action.payload;
      const { plates } = state;
      plates.forEach(plate => {
        if (plate.id === plateId) {
          plate.active = true;
        } else if (plate.active) {
          plate.active = false;
        }
      });
    },
    deletePlate(state, action) {
      const idToRemove = action.payload;
      state.plates = state.plates.filter((plate, i) => {
        return plate.id !== idToRemove;
      });
      // TODO might want to move this to a thunk
      // and maybe select the plate immediately
      // before the deleted one.
      if (state.plates.length) {
        state.plates.forEach(plate => {
          plate.active = false;
        });
        state.plates[0].active = true;
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
    addKaptureComponentsToComponentsList(state, action) {
      const { kaptureComponents } = action.payload;
      addKaptureComponentsToState(kaptureComponents, state.componentList);
    },
    addComponentToComponents(state, action) {
      const { component } = action.payload;
      const existingComponent = getComponentFromState(component.id, state);
      if (!existingComponent) {
        state.components.unshift(component);
      }
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
        const { plateId, wellIds } = action.payload;
        const { plates, components } = state;
        const plate = findPlateById(plateId, plates);
        applySelectedComponentsToWells(plate, wellIds, components);
      }
    },
    applySelectedComponentsToSelectedWells(state, action) {
      if (state.componentsValid) {
        const { plateId } = action.payload;
        const { components, plates } = state;
        const plate = findPlateById(plateId, plates);
        const selectedWells = getSelectedWells(plate);
        const wellIds = selectedWells.map(well => well.id);
        applySelectedComponentsToWells(plate, wellIds, components);
      }
    },
    clearWells(state, action) {
      const { plateId, wellIds } = action.payload;
      const { plates, clearMode } = state;
      const plate = findPlateById(plateId, plates);
      const wells = plate.wells.flat();
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
      const { plateId } = action.payload;
      const { plates } = state;
      const plate = findPlateById(plateId, plates);
      const wells = plate.wells.flat();
      wells.forEach(well => {
        well.selected = false;
      });
    },
    toggleWellsSelected(state, action) {
      const { plateId, wellIds } = action.payload;
      const { plates } = state;
      const plate = findPlateById(plateId, plates);
      const wells = plate.wells.flat();
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
  actions: designExperimentActions,
  reducer: designExperimentReducer,
} = designExperiment;

function getComponentFromState(componentId, state) {
  return state.components.find(
    stateComponent => stateComponent.id === componentId
  );
}

function addKaptureComponentsToState(kaptureComponents, componentArray) {
  const {
    communities = [],
    compounds = [],
    media = [],
    supplements = [],
  } = kaptureComponents;
  const createIfNotExists = (kaptureComponent, type) => {
    const existingComponent = findInComponentArray(
      kaptureComponent.id,
      componentArray
    );
    if (!existingComponent) {
      componentArray.unshift(createComponent(kaptureComponent, type));
    }
  };
  communities.forEach(community => {
    createIfNotExists(community, 'community');
  });
  compounds.forEach(compound => {
    createIfNotExists(compound, 'compound');
  });
  media.forEach(medium => {
    createIfNotExists(medium, 'medium');
  });
  supplements.forEach(supplement => {
    createIfNotExists(supplement, 'supplement');
  });
  return componentArray;
}

function findInComponentArray(componentId, componentArray) {
  return componentArray.find(component => component.data.id === componentId);
}
