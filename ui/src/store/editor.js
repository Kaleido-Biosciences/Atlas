import { createSlice } from 'redux-starter-kit';

import {
  DEFAULT_COMPONENT_COLOR_CODES,
  COMPONENT_TYPES_PLURAL_TO_SINGULAR,
} from '../constants';
import {
  createComponent,
  findPlateById,
  applySelectedComponentsToWells,
  getComponentCounts,
} from './plateFunctions';

const initialState = {
  initialized: false,
  plates: [],
  plateSize: { rows: 8, columns: 12 },
  nextPlateId: 1,
  components: [],
  toolComponents: [],
  toolComponentsValid: true,
  componentCounts: {},
  clickMode: 'apply',
  clearMode: 'all',
  settings: {
    wellSize: {
      size: 120,
      padding: 5,
    },
    componentColors: Object.assign({}, DEFAULT_COMPONENT_COLOR_CODES),
  },
};

const editor = createSlice({
  slice: 'editor',
  initialState,
  reducers: {
    setInitialized(state, action) {
      state.initialized = action.payload.initialized;
    },
    setPlates(state, action) {
      const { plates } = action.payload;
      state.plates = plates;
      state.plateSize = {
        rows: plates[0].wells.length,
        columns: plates[0].wells[0].length,
      };
    },
    addPlate(state, action) {
      const { plate } = action.payload;
      state.plates.forEach(plate => {
        plate.active = false;
      });
      plate.active = true;
      plate.id = state.nextPlateId;
      state.plates.push(plate);
      state.nextPlateId++;
    },
    resetNextPlateId(state, action) {
      state.nextPlateId = 1;
    },
    updateNextPlateId(state, action) {
      state.nextPlateId = action.payload.plateId;
    },
    setActivePlate(state, action) {
      const { plateId } = action.payload;
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
    // TODO This should be changed to take normal components
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
      const existingComponent = findComponent(component.id, components);
      if (!existingComponent) {
        components.unshift(component);
      }
    },
    addComponentToToolComponents(state, action) {
      const { component } = action.payload;
      const { toolComponents } = state;
      const existingComponent = findComponent(component.id, toolComponents);
      if (!existingComponent) {
        toolComponents.unshift(component);
      }
    },
    setClickMode(state, action) {
      state.clickMode = action.payload.clickMode;
    },
    deselectAllWells(state, action) {
      const { plateId } = action.payload;
      const plate = findPlateById(plateId, state.plates);
      const wells = plate.wells.flat();
      wells.forEach(well => {
        well.selected = false;
      });
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
    clearWells(state, action) {
      const { plateId, wellIds } = action.payload;
      const { plates, clearMode } = state;
      const plate = findPlateById(plateId, plates);
      const wells = plate.wells.flat();
      const componentTypes = COMPONENT_TYPES_PLURAL_TO_SINGULAR;
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
      state.componentCounts = getComponentCounts(plates);
    },
    toggleWellsSelected(state, action) {
      const { plateId, wellIds } = action.payload;
      const plate = findPlateById(plateId, state.plates);
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
  },
});

export const { actions: editorActions, reducer: editorReducer } = editor;

function findComponent(componentId, componentArray) {
  return componentArray.find(component => component.id === componentId);
}

// function getToolComponentFromState(componentId, state) {
//   return state.toolComponents.find(
//     stateComponent => stateComponent.id === componentId
//   );
// }
