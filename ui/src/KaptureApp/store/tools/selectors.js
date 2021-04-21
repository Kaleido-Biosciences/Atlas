import { createSelector } from '@reduxjs/toolkit';

export const selectActiveTool = (state) => state.tools.activeTool;
export const selectComponentSearchTerm = (state) =>
  state.tools.componentSearchTerm;
export const selectComponentSearchComplete = (state) =>
  state.tools.componentSearchComplete;
export const selectComponentSearchPending = (state) =>
  state.tools.componentSearchPending;
export const selectComponentSearchResults = (state) =>
  state.tools.componentSearchResults;
export const selectApplyToolComponents = (state) =>
  state.tools.applyToolComponents;
export const selectSelectedApplyToolComponents = createSelector(
  [selectApplyToolComponents],
  (toolComponents) => {
    return toolComponents.filter((component) => component.selected);
  }
);
export const selectClickMode = (state) => state.tools.clickMode;
export const selectApplyToolComponentsValid = (state) =>
  state.tools.applyToolComponentsValid;
export const selectComponentTypesToClear = (state) =>
  state.tools.componentTypesToClear;
