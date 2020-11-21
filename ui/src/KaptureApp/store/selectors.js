import { createSelector } from '@reduxjs/toolkit';

import { selectors } from 'AtlasUI/store';
import { editorTools } from './editorTools';

const selectEditorToolComponents = (state) => state.editorTools.toolComponents;
const selectEditorComponents = (state) => state.editorComponents.components;
const selectEditorComponentsSearchResults = (state) =>
  state.editorComponents.searchResults;
const selectEditorComponentsSearchTerm = (state) =>
  state.editorComponents.searchTerm;

const kaptureSelectors = {
  ...selectors,
  ...editorTools.selectors,
  selectEditorComponents,
  selectEditorComponentsSearchResults,
  selectEditorComponentsSearchTerm,
  selectEditorComponentsSearchPending: (state) =>
    state.editorComponents.searchPending,
  selectEditorComponentsSearchComplete: (state) =>
    state.editorComponents.searchComplete,
  selectEditorComponentsSearchError: (state) =>
    state.editorComponents.searchError,
  selectEditorComponentsFilteredComponents: createSelector(
    [
      selectEditorComponents,
      selectEditorComponentsSearchResults,
      selectEditorComponentsSearchTerm,
    ],
    (components, searchResults, searchTerm) => {
      let finalArray = [];
      if (searchTerm) {
        let value = searchTerm.toUpperCase();
        const filtered = components.filter((component) => {
          return component.name.toUpperCase().includes(value);
        });
        const filteredIds = filtered.map((component) => {
          return component.id;
        });
        finalArray = finalArray.concat(filtered);
        if (searchResults) {
          const filteredSearchResults = searchResults.filter((searchResult) => {
            return !filteredIds.includes(searchResult.id);
          });
          finalArray = finalArray.concat(filteredSearchResults);
        }
      } else {
        finalArray = finalArray.concat(components);
      }
      return finalArray;
    }
  ),
  selectEditorComponentsImportText: (state) =>
    state.editorComponents.importText,
  selectEditorComponentsImportComponentNames: (state) =>
    state.editorComponents.importComponentNames,
  selectEditorComponentsImportFound: (state) =>
    state.editorComponents.importFound,
  selectEditorComponentsImportNotFound: (state) =>
    state.editorComponents.importNotFound,
  selectEditorComponentsImportPending: (state) =>
    state.editorComponents.importPending,
  selectEditorComponentsImportComplete: (state) =>
    state.editorComponents.importComplete,
  selectEditorComponentsImportError: (state) =>
    state.editorComponents.importError,
  selectEditorToolComponents,
  selectEditorToolComponentsValid: (state) =>
    state.editorTools.toolComponentsValid,
  selectEditorClickMode: (state) => state.editorTools.clickMode,
  selectEditorComponentTypesToClear: (state) =>
    state.editorTools.componentTypesToClear,
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
