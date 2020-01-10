import { createSelector } from 'redux-starter-kit';
import { getActivePlate, getSelectedWells } from './plateFunctions';

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

export const selectContainerCollectionImportStatus = createSelector([
  'activities.importStatus',
]);

export const selectEditorInitialized = createSelector(['editor.initialized']);

export const selectEditorPlates = createSelector(['editor.plates']);

export const selectEditorActivePlate = createSelector(
  ['editor.plates'],
  getActivePlate
);

export const selectEditorComponents = createSelector(['editor.components']);

export const selectEditorComponentCounts = createSelector([
  'editor.componentCounts',
]);

export const selectEditorClickMode = createSelector(['editor.clickMode']);

export const selectEditorSettings = createSelector(['editor.settings']);
