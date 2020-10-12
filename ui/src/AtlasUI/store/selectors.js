import { createSelector } from '@reduxjs/toolkit';

/* Activity Search */
export const selectActivitySearchSearchTerm = (state) =>
  state.activitySearch.searchTerm;
export const selectActivitySearchLoading = (state) =>
  state.activitySearch.loading;
export const selectActivitySearchError = (state) => state.activitySearch.error;
export const selectActivitySearchResults = (state) =>
  state.activitySearch.results;

/* Activity */
export const selectActivityInitialized = (state) => state.activity.initialized;
export const selectActivityInitializationError = (state) =>
  state.activity.initializationError;
export const selectActivityId = (state) => state.activity.id;
export const selectActivityName = (state) => state.activity.name;
export const selectActivityDescription = (state) => state.activity.description;
export const selectActivityContainerCollections = (state) =>
  state.activity.containerCollections;
export const selectActivityContainerCollectionsStale = (state) =>
  state.activity.containerCollectionsStale;
export const selectActivityData = (state) => state.activity.data;
export const selectActivityPublishSuccess = (state) =>
  state.activity.publishSuccess;
export const selectActivityPublishError = (state) =>
  state.activity.publishError;
export const selectActivityPublishedContainerCollectionDetails = (state) =>
  state.activity.publishedContainerCollectionDetails;

/* Editor */
export const selectEditorInitialized = (state) => state.editor.initialized;
export const selectEditorInitializationError = (state) =>
  state.editor.initializationError;
export const selectEditorGrids = (state) => state.editor.grids;
export const selectEditorGridCount = createSelector(
  [selectEditorGrids],
  (grids) => {
    return grids.length;
  }
);
export const selectEditorActiveGridId = (state) => state.editor.activeGridId;
export const selectEditorActiveGrid = createSelector(
  [selectEditorGrids, selectEditorActiveGridId],
  (grids, activeGridId) => {
    return grids.find((c) => c.id === activeGridId);
  }
);
export const selectEditorGridTabs = createSelector(
  [selectEditorGrids, selectEditorActiveGridId],
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
export const selectEditorBarcodes = (state) => state.editor.barcodes;
export const selectEditorBarcodeOptions = createSelector(
  [selectEditorBarcodes],
  (barcodes) => {
    return barcodes.map((barcode) => {
      return { key: barcode, value: barcode, text: barcode };
    });
  }
);
export const selectEditorSettings = (state) => state.editor.settings;
export const selectEditorSelectedContainersSummary = createSelector(
  [selectEditorGrids, selectEditorActiveGridId],
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
export const selectEditorSavePending = (state) => state.editor.savePending;
export const selectEditorLastSaveTime = (state) => state.editor.lastSaveTime;
export const selectEditorSaveError = (state) => state.editor.saveError;
export const selectEditorComponentTypes = (state) =>
  state.editor.componentTypes;
export const selectEditorAllGridBarcodesSet = createSelector(
  [selectEditorGrids],
  (grids) => {
    const index = grids.findIndex((grid) => {
      return !grid.barcode;
    });
    return !(index > -1);
  }
);

/* Print */
export const selectPrintInitialized = (state) => state.print.initialized;
export const selectPrintInitializationError = (state) =>
  state.print.initializationError;
export const selectPrintGrids = (state) => state.print.grids;
