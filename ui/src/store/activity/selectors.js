import { createSelector } from '@reduxjs/toolkit';

export const selectLoading = (state) => state.activity.loading;
export const selectInitialized = (state) => state.activity.initialized;
export const selectInitializationError = (state) =>
  state.activity.initializationError;
export const selectId = (state) => state.activity.id;
export const selectName = (state) => state.activity.name;
export const selectDescription = (state) => state.activity.description;
export const selectUpdateDate = (state) => state.activity.updateDate;
export const selectPlates = (state) => state.activity.plates;
export const selectPlateCount = createSelector([selectPlates], (plates) => {
  return plates.length;
});
export const selectViews = (state) => state.activity.views;
export const selectActiveView = createSelector([selectViews], (views) => {
  return views.find((view) => view.active);
});
export const selectPlateTypes = (state) => state.activity.plateTypes;
