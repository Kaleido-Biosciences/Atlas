/* Editor */
export const selectEditorComponentTypes = (state) =>
  state.editor.componentTypes;

/* Print */
export const selectPrintInitialized = (state) => state.print.initialized;
export const selectPrintInitializationError = (state) =>
  state.print.initializationError;
export const selectPrintGrids = (state) => state.print.grids;
