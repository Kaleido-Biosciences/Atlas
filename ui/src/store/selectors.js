import { createSelector } from 'redux-starter-kit';
import { getActivePlate, getSelectedWells } from './plateFunctions';

export const selectActivity = createSelector(['activities.activity']);

export const selectActivityName = createSelector(['activities.activity.name']);

export const selectActivityInitialized = createSelector([
  'activities.initialized',
]);

export const selectActivityLoadingStatus = createSelector([
  'activities.activityLoadingStatus',
]);

export const selectActivityContainerImportStatus = createSelector([
  'activities.containerImportStatus',
]);

export const selectActivityPublishStatus = createSelector([
  'activities.publishStatus',
]);

export const selectActivePlate = createSelector(
  ['editor.plates'],
  getActivePlate
);

export const selectSelectedWellsFromActivePlate = createSelector(
  ['editor.plates'],
  plates => {
    const activePlate = getActivePlate(plates);
    if (activePlate) {
      return getSelectedWells(activePlate);
    } else return null;
  }
);

export const selectEditorInitialized = createSelector(['editor.initialized']);

export const selectEditorPlates = createSelector(['editor.plates']);

export const selectEditorActivePlate = createSelector(
  ['editor.plates'],
  getActivePlate
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
