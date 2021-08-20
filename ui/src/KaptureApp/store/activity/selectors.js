import { createSelector } from '@reduxjs/toolkit';

export const selectLoading = (state) => state.activity.loading;
export const selectInitialized = (state) => state.activity.initialized;
export const selectInitializationError = (state) =>
  state.activity.initializationError;
export const selectId = (state) => state.activity.id;
export const selectName = (state) => state.activity.name;
export const selectDescription = (state) => state.activity.description;
export const selectGrids = (state) => state.activity.grids;
export const selectViews = (state) => state.activity.views;
export const selectActiveView = createSelector(
  [selectViews, selectGrids],
  (views, grids) => {
    const activeView = views.find((view) => view.active);
    let viewGrids = [];
    if (activeView.type === 'Overview') {
      viewGrids = grids;
    } else {
      if (activeView.data && activeView.data.gridIds) {
        activeView.data.gridIds.forEach((gridId) => {
          const grid = grids.find((grid) => grid.id === gridId);
          if (grid) viewGrids.push(grid);
        });
      }
    }
    return {
      ...activeView,
      data: {
        ...activeView.data,
        grids: viewGrids,
      },
    };
  }
);
export const selectSavePending = (state) => state.activity.savePending;
export const selectLastSaveTime = (state) => state.activity.lastSaveTime;
export const selectSaveError = (state) => state.activity.saveError;
