import { createSlice } from '@reduxjs/toolkit';
import { createWells, createRowHeaders, createColumnHeaders } from 'models';

const initialSaveTime = {
  savePending: false,
  saveError: '',
  lastSaveTime: null,
};

const initialState = {
  loading: false,
  initialized: false,
  initializationError: '',
  id: null,
  name: '',
  description: '',
  createdTime: null,
  updatedTime: null,
  plates: [],
  views: [],
  settings: {
    containerSize: {
      size: 120,
      innerPadding: 4,
      outerPadding: 2,
    },
  },
  status: '',
  ...initialSaveTime,
};

const activity = createSlice({
  name: 'activity',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = true;
      state.initialized = false;
      state.initializationError = '';
    },
    setInitializationError(state, action) {
      state.loading = false;
      state.initialized = false;
      state.initializationError = action.payload.error;
    },
    setActivity(state, action) {
      const { activity } = action.payload;
      Object.assign(state, activity);
      state.loading = false;
      state.initialized = true;
      state.initializationError = '';
    },
    setPlateSize(state, action) {
      const { plateIds, numRows, numCols } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        plate.numRows = numRows;
        plate.numCols = numCols;
        plate.wells = createWells(numRows, numCols);
        plate.rowHeaders = createRowHeaders(numRows);
        plate.columnHeaders = createColumnHeaders(numCols);
      });
    },
    updatePlateWells(state, action) {
      const { plateId, updatedWells } = action.payload;
      const plate = findPlate(plateId, state.plates);
      updatedWells.forEach((updatedWell) => {
        const plateWell = findWell(updatedWell.id, plate.wells);
        plateWell.components = updatedWell.components;
      });
    },
    setPlateName(state, action) {
      const { plateId, name } = action.payload;
      const plate = findPlate(plateId, state.plates);
      plate.name = name;
    },
    updatePlateDetails(state, action) {
      const { plateId, details } = action.payload;
      const plate = findPlate(plateId, state.plates);
      Object.assign(plate, details);
    },
    addView(state, action) {
      const { view } = action.payload;
      if (!view.name) {
        let highestUntitled = 0;
        state.views.forEach((view) => {
          if (view.name.startsWith('View')) {
            const viewNum = parseInt(view.name.substring(4));
            if (viewNum > highestUntitled) highestUntitled = viewNum;
          }
        });
        view.name = `View${highestUntitled + 1}`;
      }
      state.views.push(view);
    },
    setActiveView(state, action) {
      const { viewId } = action.payload;
      state.views.forEach((view) => {
        if (view.id === viewId) {
          view.active = true;
        } else view.active = false;
      });
    },
    setViewPlateSelections(state, action) {
      const { viewId, selections } = action.payload;
      const view = findView(viewId, state.views);
      selections.forEach((selection) => {
        const viewPlate = findPlate(selection.plateId, view.viewPlates);
        viewPlate.selected = selection.selected;
      });
    },
    selectAllPlateWells(state, action) {
      const { plateIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        const viewPlate = findPlate(plateId, view.viewPlates);
        viewPlate.selectedWells = [];
        plate.wells.forEach((well) => {
          viewPlate.selectedWells.push(well.id);
        });
      });
    },
    deselectAllPlateWells(state, action) {
      const { plateIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      plateIds.forEach((plateId) => {
        const viewPlate = findPlate(plateId, view.viewPlates);
        viewPlate.selectedWells = [];
      });
    },
    selectInteriorPlateWells(state, action) {
      const { plateIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        const viewPlate = findPlate(plateId, view.viewPlates);
        viewPlate.selectedWells = [];
        for (let i = 1; i < plate.numRows - 1; i++) {
          const start = i * plate.numCols;
          const end = (i + 1) * plate.numCols;
          const row = plate.wells.slice(start + 1, end - 1);
          row.forEach((well) => {
            viewPlate.selectedWells.push(well.id);
          });
        }
      });
    },
    selectBorderPlateWells(state, action) {
      const { plateIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        const viewPlate = findPlate(plateId, view.viewPlates);
        viewPlate.selectedWells = [];
        for (let i = 0; i < plate.numRows; i++) {
          const start = i * plate.numCols;
          const end = (i + 1) * plate.numCols;
          const row = plate.wells.slice(start, end);
          if (i === 0 || i === plate.numRows - 1) {
            row.forEach((well) => {
              viewPlate.selectedWells.push(well.id);
            });
          } else {
            viewPlate.selectedWells.push(row[0].id);
            viewPlate.selectedWells.push(row[plate.numCols - 1].id);
          }
        }
      });
    },
    togglePlateWellSelections(state, action) {
      const { wellIds, plateIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      plateIds.forEach((plateId) => {
        const viewPlate = findPlate(plateId, view.viewPlates);
        const status = { selected: false, deselected: false };
        const unaffectedSelectedWells = viewPlate.selectedWells.filter(
          (selectedWell) => {
            return !wellIds.includes(selectedWell);
          }
        );
        wellIds.forEach((wellId) => {
          if (viewPlate.selectedWells.includes(wellId)) {
            status.selected = true;
          } else {
            status.deselected = true;
          }
        });
        const newSelectionStatus =
          (status.selected && status.deselected) || !status.selected
            ? true
            : false;
        if (newSelectionStatus) {
          viewPlate.selectedWells = unaffectedSelectedWells.concat(wellIds);
        } else viewPlate.selectedWells = unaffectedSelectedWells;
      });
    },
    removeWellComponent(state, action) {
      const { plateId, wellId, componentId } = action.payload;
      const plate = findPlate(plateId, state.plates);
      const well = findWell(wellId, plate.wells);
      const wellIndex = well.components.findIndex(
        (component) => component.id === componentId
      );
      well.components.splice(wellIndex, 1);
    },
    removeComponentTypesFromWells(state, action) {
      const { componentTypes, wellIds, plateIds } = action.payload;
      plateIds.forEach((plateId) => {
        const plate = findPlate(plateId, state.plates);
        wellIds.forEach((wellId) => {
          const well = findWell(wellId, plate.wells);
          well.components = well.components.filter(
            (component) => !componentTypes.includes(component.type)
          );
        });
      });
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
    setSavePending(state, action) {
      state.savePending = true;
      state.saveError = '';
      state.lastSaveTime = null;
    },
    setLastSaveTime(state, action) {
      state.savePending = false;
      state.saveError = '';
      state.lastSaveTime = action.payload.lastSaveTime;
    },
    setSaveError(state, action) {
      state.savePending = false;
      state.saveError = action.payload.error;
    },
    resetSaveTime(state, action) {
      Object.assign(state, initialSaveTime);
    },
  },
});

export const { actions, reducer } = activity;

function findPlate(plateId, plates) {
  return plates.find((plate) => plate.id === plateId);
}

function findWell(wellId, wells) {
  return wells.find((well) => well.id === wellId);
}

function findView(viewId, views) {
  return views.find((view) => view.id === viewId);
}
