import { createSelector } from '@reduxjs/toolkit';

const selectEditorToolComponents = (state) => state.editorTools.toolComponents;

const kaptureSelectors = {
  selectEditorToolComponents,
  selectEditorToolComponentsValid: (state) =>
    state.editorTools.toolComponentsValid,
  selectEditorClickMode: (state) => state.editorTools.clickMode,
  // delete
  selectEditorComponentTypesToClear: (state) =>
    state.editorTools.componentTypesToClear,
  //delete this
  selectEditorSelectedToolComponents: createSelector(
    [selectEditorToolComponents],
    (toolComponents) => {
      return toolComponents.filter((component) => component.selected);
    }
  ),
};

export { kaptureSelectors as selectors };
