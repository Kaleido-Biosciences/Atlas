import { createSelector } from 'redux-starter-kit';
import { getActivePlate, getSelectedWells } from './plateFunctions';

/* Activities */
export const selectActivityInitialized = createSelector([
  'activities.initialized',
]);
export const selectActivityInitializationError = createSelector([
  'activities.initializationError',
]);
export const selectActivity = createSelector(['activities.activity']);
export const selectActivityName = createSelector(['activities.activity.name']);
export const selectActivityDescription = createSelector([
  'activities.activity.data.description',
]);
export const selectActivityContainerImportStatus = createSelector([
  'activities.containerImportStatus',
]);
export const selectActivityPublishStatus = createSelector([
  'activities.publishStatus',
]);
export const selectActivityPublishedContainerCollectionDetails = createSelector(
  ['activities.publishedContainerCollectionDetails']
);
export const selectActivityPlateSize = createSelector(['activities.plateSize']);
export const selectActivityContainerCollectionsStale = createSelector([
  'activities.containerCollectionsStale',
]);

/* Editor */
export const selectEditorInitialized = createSelector(['editor.initialized']);
export const selectEditorInitializationError = createSelector([
  'editor.initializationError',
]);
export const selectEditorPlates = createSelector(['editor.plates']);
export const selectEditorActivePlate = createSelector(
  ['editor.plates'],
  getActivePlate
);
export const selectEditorSelectedWellsFromActivePlate = createSelector(
  ['editor.plates'],
  plates => {
    const activePlate = getActivePlate(plates);
    if (activePlate) {
      return getSelectedWells(activePlate);
    } else return null;
  }
);
export const selectEditorSettings = createSelector(['editor.settings']);
export const selectEditorBarcodes = createSelector(['editor.barcodes']);
export const selectEditorComponentCounts = createSelector([
  'editor.componentCounts',
]);
export const selectEditorSaveStatus = createSelector(['editor.saveStatus']);
export const selectEditorLastSaveTime = createSelector(['editor.lastSaveTime']);
export const selectEditorComponents = createSelector([
  'editorComponents.components',
]);
export const selectEditorToolComponentsValid = createSelector([
  'editorTools.toolComponentsValid',
]);
export const selectEditorClickMode = createSelector(['editorTools.clickMode']);
export const selectEditorToolComponents = createSelector([
  'editorTools.toolComponents',
]);
export const selectEditorSelectedToolComponents = createSelector(
  ['editorTools.toolComponents'],
  toolComponents => {
    return toolComponents.filter(component => component.selected);
  }
);
export const selectEditorClearMode = createSelector(['editorTools.clearMode']);

/* Print */
export const selectPrintInitialized = createSelector(['print.initialized']);
export const selectPrintInitializationError = createSelector([
  'print.initializationError',
]);
export const selectPrintPlates = createSelector(['print.plates']);
