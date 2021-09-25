import { createSelector } from '@reduxjs/toolkit';

export const selectLoading = (state) => state.activity.loading;
export const selectInitialized = (state) => state.activity.initialized;
export const selectInitializationError = (state) =>
  state.activity.initializationError;
export const selectId = (state) => state.activity.id;
export const selectName = (state) => state.activity.name;
export const selectDescription = (state) => state.activity.description;
export const selectPlates = (state) => state.activity.plates;
export const selectPlateCount = createSelector([selectPlates], (plates) => {
  return plates.length;
});
export const selectViews = (state) => state.activity.views;
export const selectActiveView = createSelector(
  [selectViews, selectPlates],
  (views, plates) => {
    const activeView = views.find((view) => view.active);
    const viewPlates = activeView.viewPlates.map((viewPlate) => {
      const plate = plates.find((plate) => plate.id === viewPlate.id);
      return {
        ...viewPlate,
        plate,
      };
    });
    return {
      ...activeView,
      viewPlates,
    };
  }
);
export const selectSettings = (state) => state.activity.settings;
export const selectSavePending = (state) => state.activity.savePending;
export const selectLastSaveTime = (state) => state.activity.lastSaveTime;
export const selectSaveError = (state) => state.activity.saveError;
