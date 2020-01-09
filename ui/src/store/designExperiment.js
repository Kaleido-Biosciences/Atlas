import { createSlice } from 'redux-starter-kit';
import validate from 'validate.js';

import {
  STATUS_DRAFT,
  STATUS_COMPLETED,
  DEFAULT_COMPONENT_COLOR_CODES,
} from '../constants';
import {
  getSelectedWells,
  applySelectedComponentsToWells,
  findPlateById,
  createComponent,
  createTimepoint,
  getComponentCounts,
} from './plateFunctions';

const designExperiment = createSlice({
  slice: 'designExperiment',
  initialState: {
    experiment: null,
    status: STATUS_DRAFT,
    plateSize: { rows: 8, columns: 12 },
    plates: [],
    nextPlateId: 1,
    components: [],
    toolComponents: [],
    toolComponentsValid: true,
    componentCounts: {},
    clickMode: 'apply',
    clearMode: 'all',
    steps: {
      stepOneCompleted: false,
      stepTwoCompleted: false,
      stepThreeCompleted: false,
    },
    saveStatus: null,
    lastSaveTime: null,
    settings: {
      wellSize: {
        size: 120,
        padding: 5,
      },
      componentColors: Object.assign({}, DEFAULT_COMPONENT_COLOR_CODES),
    },
    barcodes: [],
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
      const { plateId: idToRemove } = action.payload;
      let indexToRemove;
      state.plates.forEach((plate, i) => {
        plate.active = false;
        if (plate.id === idToRemove) {
          indexToRemove = i;
        }
      });
      state.plates.splice(indexToRemove, 1);
      if (state.plates.length) {
        if (state.plates[indexToRemove]) {
          state.plates[indexToRemove].active = true;
        } else {
          state.plates[indexToRemove - 1].active = true;
        }
      }
    },
    setClickMode(state, action) {
      state.clickMode = action.payload;
    },
    setClearMode(state, action) {
      state.clearMode = action.payload;
    },
    removeToolComponents(state, action) {
      const componentsToRemove = action.payload.components;
      const { toolComponents } = state;
      const idsToRemove = componentsToRemove.map(component => component.id);
      idsToRemove.forEach(id => {
        const index = toolComponents.findIndex(
          component => component.id === id
        );
        if (index > -1) {
          toolComponents.splice(index, 1);
        }
      });
    },
    addKaptureComponentsToComponents(state, action) {
      const { kaptureComponents } = action.payload;
      const { components } = state;
      kaptureComponents.forEach(kaptureComponent => {
        const { data, type, id } = kaptureComponent;
        const existingComponent = components.find(
          component => component.data.id === id
        );
        if (!existingComponent) {
          components.unshift(createComponent(data, type));
        }
      });
    },
    addComponentToComponents(state, action) {
      const { component } = action.payload;
      const { components } = state;
      const existingComponent = components.find(
        comp => comp.id === component.id
      );
      if (!existingComponent) {
        components.unshift(component);
      }
    },
    addComponentToToolComponents(state, action) {
      const { component } = action.payload;
      const existingComponent = getToolComponentFromState(component.id, state);
      if (!existingComponent) {
        state.toolComponents.unshift(component);
      }
    },
    selectToolComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getToolComponentFromState(component.id, state);
        stateComponent.selected = true;
      });
    },
    deselectToolComponents(state, action) {
      const { components } = action.payload;
      components.forEach(component => {
        const stateComponent = getToolComponentFromState(component.id, state);
        stateComponent.selected = false;
      });
    },
    addTimepointToComponent(state, action) {
      const { component } = action.payload;
      const stateComponent = getToolComponentFromState(component.id, state);
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
      const stateComponent = getToolComponentFromState(component.id, state);
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
        state.toolComponentsValid = true;
      } else {
        stateComponent.isValid = false;
        stateComponent.errors = errors;
        state.toolComponentsValid = false;
      }
    },
    deleteTimepoint(state, action) {
      const { component, index } = action.payload;
      if (index > 0) {
        const stateComponent = getToolComponentFromState(component.id, state);
        stateComponent.timepoints.splice(index, 1);
      }
    },
    applySelectedToolComponentsToWells(state, action) {
      if (state.toolComponentsValid) {
        const { plateId, wellIds } = action.payload;
        const { plates, toolComponents } = state;
        const plate = findPlateById(plateId, plates);
        applySelectedComponentsToWells(plate, wellIds, toolComponents);
        state.componentCounts = getComponentCounts(state.plates);
      }
    },
    applySelectedToolComponentsToSelectedWells(state, action) {
      if (state.toolComponentsValid) {
        const { plateId } = action.payload;
        const { toolComponents, plates } = state;
        const plate = findPlateById(plateId, plates);
        const selectedWells = getSelectedWells(plate);
        const wellIds = selectedWells.map(well => well.id);
        applySelectedComponentsToWells(plate, wellIds, toolComponents);
        state.componentCounts = getComponentCounts(state.plates);
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
        attributes: 'attribute',
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
      state.componentCounts = getComponentCounts(state.plates);
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
      const stateComponent = getToolComponentFromState(component.id, state);
      stateComponent.editing = !stateComponent.editing;
    },
    setComponentConcentration(state, action) {
      const { component, value } = action.payload;
      const stateComponent = getToolComponentFromState(component.id, state);
      stateComponent.concentration = value;
    },
    setDraftStatus(state, action) {
      state.status = STATUS_DRAFT;
    },
    setCompletedStatus(state, action) {
      state.status = STATUS_COMPLETED;
      state.steps.stepTwoCompleted = true;
    },
    setStepThreeComplete(state, action) {
      state.steps.stepThreeCompleted = true;
    },
    setSaveStatus(state, action) {
      const { saveStatus } = action.payload;
      state.saveStatus = saveStatus;
      if (saveStatus === 'SUCCESS') {
        state.lastSaveTime = Date.now();
      }
    },
    setSettings(state, action) {
      const { settings } = action.payload;
      state.settings = Object.assign(state.settings, settings);
    },
    addBarcodes(state, action) {
      const { barcodes } = action.payload;
      state.barcodes = state.barcodes.concat(barcodes);
    },
    setBarcode(state, action) {
      const { plateId, barcode } = action.payload;
      const { plates } = state;
      const plate = findPlateById(plateId, plates);
      plate.barcode = barcode;
    },
  },
});

export const {
  actions: designExperimentActions,
  reducer: designExperimentReducer,
} = designExperiment;

function getToolComponentFromState(componentId, state) {
  return state.toolComponents.find(
    stateComponent => stateComponent.id === componentId
  );
}
