import { createSelector } from '@reduxjs/toolkit';

export const selectInitialized = (state) => state.editor.initialized;
export const selectInitializationError = (state) =>
  state.editor.initializationError;
export const selectGrids = (state) => state.editor.grids;
export const selectGridCount = createSelector([selectGrids], (grids) => {
  return grids.length;
});
export const selectActiveGridId = (state) => state.editor.activeGridId;
export const selectActiveGrid = createSelector(
  [selectGrids, selectActiveGridId],
  (grids, activeGridId) => {
    return grids.find((c) => c.id === activeGridId);
  }
);
export const selectGridTabs = createSelector(
  [selectGrids, selectActiveGridId],
  (grids, activeGridId) => {
    const tabs = [];
    grids.forEach((grid) => {
      tabs.push({
        id: grid.id,
        name: grid.name,
        active: grid.id === activeGridId,
      });
    });
    return tabs;
  }
);
export const selectBarcodes = (state) => state.editor.barcodes;
export const selectBarcodeOptions = createSelector(
  [selectBarcodes],
  (barcodes) => {
    return barcodes.map((barcode) => {
      return { key: barcode, value: barcode, text: barcode };
    });
  }
);
export const selectSettings = (state) => state.editor.settings;
export const selectSelectedContainersSummary = createSelector(
  [selectGrids, selectActiveGridId],
  (grids, activeGridId) => {
    const selectedContainersSummary = {
      count: 0,
      text: '',
    };
    if (grids.length) {
      const activeGrid = grids.find((grid) => grid.id === activeGridId);
      if (activeGrid) {
        const positions = activeGrid.data.flat();
        const selectedPositions = positions.filter((position) => {
          if (position.container && position.container.selected) return true;
          else return false;
        });
        const mapped = selectedPositions.map(
          (position) => position.row + position.column
        );
        if (mapped.length) {
          selectedContainersSummary.text = `${activeGrid.name}: ${mapped.join(
            ','
          )}`;
          selectedContainersSummary.count = mapped.length;
        }
      }
    }
    return selectedContainersSummary;
  }
);
export const selectSavePending = (state) => state.editor.savePending;
export const selectLastSaveTime = (state) => state.editor.lastSaveTime;
export const selectSaveError = (state) => state.editor.saveError;
export const selectAllGridBarcodesSet = createSelector(
  [selectGrids],
  (grids) => {
    const index = grids.findIndex((grid) => {
      return !grid.barcode;
    });
    return !(index > -1);
  }
);
