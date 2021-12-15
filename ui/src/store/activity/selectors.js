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
export const selectSelectedPlates = createSelector([selectPlates], (plates) => {
  return plates.filter((plate) => plate.selected);
});
export const selectSelectedPlateIds = createSelector(
  [selectSelectedPlates],
  (selectedPlates) => {
    return selectedPlates.map((plate) => plate.id);
  }
);
export const selectViews = (state) => state.activity.views;
export const selectActiveView = createSelector([selectViews], (views) => {
  return views.find((view) => view.active);
});
export const selectPlateTypes = (state) => state.activity.plateTypes;
export const selectSetPlateTypeError = (state) =>
  state.activity.setPlateTypeError;
export const selectDeleteActivityStatus = (state) =>
  state.activity.deleteActivityStatus;
export const selectPlateIdToCopy = (state) => state.activity.plateIdToCopy;
export const selectPlateToCopy = createSelector(
  [selectPlateIdToCopy, selectPlates],
  (plateIdToCopy, plates) => {
    return plates.find((plate) => plate.id === plateIdToCopy);
  }
);
export const selectCopyPlateDisabled = createSelector(
  [selectSelectedPlates],
  (selectedPlates) => {
    let copyDisabled = true;
    if (selectedPlates.length === 1 && selectedPlates[0].plateType) {
      copyDisabled = false;
    }
    return copyDisabled;
  }
);
export const selectPastePlateDisabled = createSelector(
  [selectSelectedPlates, selectPlateToCopy],
  (selectedPlates, plateToCopy) => {
    let pasteDisabled = true;
    if (plateToCopy && selectedPlates.length > 0) {
      const validTargets = selectedPlates.filter(
        (plate) => plate.id !== plateToCopy.id
      );
      if (validTargets.length === selectedPlates.length) {
        pasteDisabled = false;
      }
    }
    return pasteDisabled;
  }
);
export const selectSwapComponentsDisabled = createSelector(
  [selectSelectedPlates],
  (selectedPlates) => {
    let swapDisabled = true;
    if (
      selectedPlates.length === 2 &&
      selectedPlates[0].plateType &&
      selectedPlates[1].plateType &&
      selectedPlates[0].plateType.id === selectedPlates[1].plateType.id
    ) {
      swapDisabled = false;
    }
    return swapDisabled;
  }
);
export const selectSavePending = (state) => state.activity.savePending;
export const selectSaveError = (state) => state.activity.saveError;
export const selectImportSourceActivity = (state) =>
  state.activity.importSourceActivity;
export const selectImportMappings = (state) => state.activity.importMappings;
export const selectLoadingImportSourceActivity = (state) =>
  state.activity.loadingImportSourceActivity;
export const selectLoadingImportSourceActivityError = (state) =>
  state.activity.loadingImportSourceActivityError;
export const selectImportPending = (state) => state.activity.importPending;
export const selectImportError = (state) => state.activity.importError;
export const selectImportSuccess = (state) => state.activity.importSuccess;
