/* Activity Search */
export const selectActivitySearchSearchTerm = (state) =>
  state.activitySearch.searchTerm;
export const selectActivitySearchLoading = (state) =>
  state.activitySearch.loading;
export const selectActivitySearchError = (state) => state.activitySearch.error;
export const selectActivitySearchResults = (state) =>
  state.activitySearch.results;

/* Editor */
export const selectEditorComponentTypes = (state) =>
  state.editor.componentTypes;

/* Print */
export const selectPrintInitialized = (state) => state.print.initialized;
export const selectPrintInitializationError = (state) =>
  state.print.initializationError;
export const selectPrintGrids = (state) => state.print.grids;
