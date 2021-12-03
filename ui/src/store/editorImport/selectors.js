export const selectImportStarted = (state) => state.editorImport.importStarted;
export const selectImportPending = (state) => state.editorImport.importPending;
export const selectImportError = (state) => state.editorImport.importError;
export const selectImportedComponents = (state) =>
  state.editorImport.importedComponents;
export const selectComponentImportErrors = (state) =>
  state.editorImport.componentImportErrors;
