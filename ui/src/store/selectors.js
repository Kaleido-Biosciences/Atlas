import { createSelector } from 'redux-starter-kit';
import { getActivePlate, getSelectedWells } from './plateFunctions';

/* Activity Search */
export const selectActivitySearchSearchTerm = createSelector([
  'activitySearch.searchTerm',
]);
export const selectActivitySearchLoading = createSelector([
  'activitySearch.loading',
]);
export const selectActivitySearchError = createSelector([
  'activitySearch.error',
]);
export const selectActivitySearchResults = createSelector([
  'activitySearch.results',
]);

/* Activity */
export const selectActivityInitialized = createSelector([
  'activity.initialized',
]);
export const selectActivityInitializationError = createSelector([
  'activity.initializationError',
]);
export const selectActivityId = createSelector(['activity.id']);
export const selectActivityName = createSelector(['activity.name']);
export const selectActivityDescription = createSelector([
  'activity.description',
]);
export const selectActivityContainerCollections = createSelector([
  'activity.containerCollections',
]);
export const selectActivityData = createSelector(['activity.data']);
export const selectActivityPublishStatus = createSelector([
  'activity.publishStatus',
]);
export const selectActivityPublishedContainerCollectionDetails = createSelector(
  ['activity.publishedContainerCollectionDetails']
);
export const selectActivityContainerCollectionsStale = createSelector([
  'activity.containerCollectionsStale',
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

/* Editor V2 */
export const selectEditorV2Initialized = createSelector([
  'editorV2.initialized',
]);
export const selectEditorV2InitializationError = createSelector([
  'editorV2.initializationError',
]);
export const selectEditorV2Containers = createSelector(['editorV2.containers']);
export const selectEditorV2ActiveContainerId = createSelector([
  'editorV2.activeContainerId',
]);
export const selectEditorV2ActiveContainer = createSelector(
  ['editorV2.containers', 'editorV2.activeContainerId'],
  (containers, activeId) => {
    return containers.find(c => c.id === activeId);
  }
);
export const selectEditorV2ContainerTabs = createSelector(
  ['editorV2.containers', 'editorV2.activeContainerId'],
  (containers, activeContainerId) => {
    const typeCounts = {};
    const tabs = [];
    containers.forEach(container => {
      if (!typeCounts[container.subType]) {
        typeCounts[container.subType] = 1;
      } else {
        typeCounts[container.subType]++;
      }
      tabs.push({
        id: container.id,
        name: `${container.subType} ${typeCounts[container.subType]}`,
        active: container.id === activeContainerId,
      });
    });
    return tabs;
  }
);
export const selectEditorV2Barcodes = createSelector(['editorV2.barcodes']);
export const selectEditorV2Settings = createSelector(['editorV2.settings']);
