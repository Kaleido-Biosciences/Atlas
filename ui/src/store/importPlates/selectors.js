export const selectLoadingSourceActivity = (state) =>
  state.importPlates.loadingSourceActivity;
export const selectLoadingSourceActivityError = (state) =>
  state.importPlates.loadingSourceActivityError;
export const selectSourceActivity = (state) =>
  state.importPlates.sourceActivity;
export const selectMappings = (state) => state.importPlates.mappings;
export const selectImportPending = (state) => state.importPlates.importPending;
export const selectImportError = (state) => state.importPlates.importError;
export const selectImportSuccess = (state) => state.importPlates.importSuccess;
