import { createSelector } from '@reduxjs/toolkit';

const selectComponents = (state) => state.components.components;
const selectSearchResults = (state) => state.components.searchResults;

export const selectSearchComplete = (state) => state.components.searchComplete;
export const selectSearchError = (state) => state.components.searchError;
export const selectSearchPending = (state) => state.components.searchPending;
export const selectSearchTerm = (state) => state.components.searchTerm;
export const selectFilteredComponents = createSelector(
  [selectComponents, selectSearchResults, selectSearchTerm],
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
);
export const selectImportComponentNames = (state) =>
  state.components.importComponentNames;
export const selectImportComplete = (state) => state.components.importComplete;
export const selectImportError = (state) => state.components.importError;
export const selectImportFound = (state) => state.components.importFound;
export const selectImportNotFound = (state) => state.components.importNotFound;
export const selectImportPending = (state) => state.components.importPending;
export const selectImportText = (state) => state.components.importText;
