import { createSelector } from 'redux-starter-kit';

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
export const selectEditorGrids = createSelector(['editor.grids']);
export const selectEditorGridCount = createSelector(
  ['editor.grids'],
  (grids) => {
    return grids.length;
  }
);
export const selectEditorActiveGridId = createSelector(['editor.activeGridId']);
export const selectEditorActiveGrid = createSelector(
  ['editor.grids', 'editor.activeGridId'],
  (grids, activeGridId) => {
    return grids.find((c) => c.id === activeGridId);
  }
);
export const selectEditorGridTabs = createSelector(
  ['editor.grids', 'editor.activeGridId'],
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
export const selectEditorBarcodes = createSelector(['editor.barcodes']);
export const selectEditorSettings = createSelector(['editor.settings']);
export const selectEditorSelectedContainersSummary = createSelector(
  ['editor.grids', 'editor.activeGridId'],
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
export const selectEditorSaveStatus = createSelector(['editor.saveStatus']);
export const selectEditorLastSaveTime = createSelector(['editor.lastSaveTime']);
export const selectEditorComponentCounts = createSelector([
  'editor.componentCounts',
]);
export const selectEditorComponents = createSelector([
  'editorComponents.components',
]);
export const selectEditorToolComponents = createSelector([
  'editorTools.toolComponents',
]);
export const selectEditorToolComponentsValid = createSelector([
  'editorTools.toolComponentsValid',
]);
export const selectEditorClickMode = createSelector(['editorTools.clickMode']);
export const selectEditorClearMode = createSelector(['editorTools.clearMode']);
export const selectEditorSelectedToolComponents = createSelector(
  ['editorTools.toolComponents'],
  (toolComponents) => {
    return toolComponents.filter((component) => component.selected);
  }
);

/* Print */
export const selectPrintInitialized = createSelector(['print.initialized']);
export const selectPrintInitializationError = createSelector([
  'print.initializationError',
]);
export const selectPrintGrids = createSelector(['print.grids']);
