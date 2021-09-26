import { createSlice } from '@reduxjs/toolkit';
import {
  createWells,
  createRowHeaders,
  createColumnHeaders,
} from 'AtlasUI/models';

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
    addGrids(state, action) {
      const { grids } = action.payload;
      let highestUntitled = 0;
      state.grids.forEach((grid) => {
        if (grid.name.startsWith('Untitled')) {
          const gridNum = parseInt(grid.name.substring(8));
          if (gridNum > highestUntitled) highestUntitled = gridNum;
        }
      });
      grids.forEach((grid) => {
        highestUntitled++;
        grid.name = `Untitled${highestUntitled}`;
      });
      state.grids = state.grids.concat(grids);
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
    setGridComponents(state, action) {
      const { gridId, positions } = action.payload;
      const grid = findGrid(gridId, state.grids);
      positions.forEach((position) => {
        const gridPosition = findPosition(position, grid.positions);
        if (gridPosition.container) {
          gridPosition.container.components = position.components;
        }
      });
    },
    setPlateName(state, action) {
      const { plateId, name } = action.payload;
      const plate = findPlate(plateId, state.plates);
      plate.name = name;
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
    setAllViewPlatesSelected(state, action) {
      const { viewId, selected } = action.payload;
      const view = findView(viewId, state.views);
      view.viewPlates.forEach((viewPlate) => {
        viewPlate.selected = selected;
      });
    },
    togglePlateSelection(state, action) {
      const { plateId, viewId } = action.payload;
      const view = findView(viewId, state.views);
      const viewPlate = view.viewPlates.find(
        (viewPlate) => viewPlate.id === plateId
      );
      viewPlate.selected = !viewPlate.selected;
    },
    selectAllGridContainers(state, action) {
      const { gridIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      gridIds.forEach((gridId) => {
        const grid = findGrid(gridId, state.grids);
        const viewGrid = findGrid(gridId, view.data.viewGrids);
        viewGrid.selectedContainers = [];
        grid.positions.forEach((position) => {
          viewGrid.selectedContainers.push(position.name);
        });
      });
    },
    deselectAllGridContainers(state, action) {
      const { gridIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      gridIds.forEach((gridId) => {
        const viewGrid = findGrid(gridId, view.data.viewGrids);
        viewGrid.selectedContainers = [];
      });
    },
    selectInteriorGridContainers(state, action) {
      const { gridIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      gridIds.forEach((gridId) => {
        const grid = findGrid(gridId, state.grids);
        const viewGrid = findGrid(gridId, view.data.viewGrids);
        viewGrid.selectedContainers = [];
        for (let i = 1; i < grid.rows - 1; i++) {
          const start = i * grid.columns;
          const end = (i + 1) * grid.columns;
          const row = grid.positions.slice(start + 1, end - 1);
          row.forEach((position) => {
            viewGrid.selectedContainers.push(position.name);
          });
        }
      });
    },
    selectBorderGridContainers(state, action) {
      const { gridIds, viewId } = action.payload;
      const view = findView(viewId, state.views);
      gridIds.forEach((gridId) => {
        const grid = findGrid(gridId, state.grids);
        const viewGrid = findGrid(gridId, view.data.viewGrids);
        viewGrid.selectedContainers = [];
        for (let i = 0; i < grid.rows; i++) {
          const start = i * grid.columns;
          const end = (i + 1) * grid.columns;
          const row = grid.positions.slice(start, end);
          if (i === 0 || i === grid.rows - 1) {
            row.forEach((position) => {
              viewGrid.selectedContainers.push(position.name);
            });
          } else {
            viewGrid.selectedContainers.push(row[0].name);
            viewGrid.selectedContainers.push(row[grid.columns - 1].name);
          }
        }
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

function findGrid(gridId, grids) {
  return grids.find((grid) => grid.id === gridId);
}

function findPosition(position, positions) {
  return positions.find(
    (pos) => pos.row === position.row && pos.column === position.column
  );
}

function findView(viewId, views) {
  return views.find((view) => view.id === viewId);
}
