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
export const selectEditorComponentTypes = (state) =>
  state.editor.componentTypes;

/* Print */
export const selectPrintInitialized = (state) => state.print.initialized;
export const selectPrintInitializationError = (state) =>
  state.print.initializationError;
export const selectPrintGrids = (state) => state.print.grids;
