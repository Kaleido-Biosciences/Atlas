import { createSelector } from '@reduxjs/toolkit';

import { selectors } from 'AtlasUI/store';

const selectEditorToolComponents = (state) => state.editorTools.toolComponents;

const kaptureSelectors = {
  ...selectors,
  selectEditorToolComponents,
  selectEditorToolComponentsValid: (state) =>
    state.editorTools.toolComponentsValid,
  selectEditorClickMode: (state) => state.editorTools.clickMode,
  selectEditorComponentTypesToClear: (state) =>
    state.editorTools.componentTypesToClear,
  //delete this
  selectEditorSelectedToolComponents: createSelector(
    [selectEditorToolComponents],
    (toolComponents) => {
      return toolComponents.filter((component) => component.selected);
    }
  ),
  selectEditorImportImportStarted: (state) => state.editorImport.importStarted,
  selectEditorImportImportPending: (state) => state.editorImport.importPending,
  selectEditorImportImportError: (state) => state.editorImport.importError,
  selectEditorImportImportedComponents: (state) =>
    state.editorImport.importedComponents,
  selectEditorComponentImportErrors: (state) =>
    state.editorImport.componentImportErrors,
};

export { kaptureSelectors as selectors };
