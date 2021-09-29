import _ from 'lodash';

import { api } from 'api';
import { actions } from './slice';
import { selectImportComponentNames, selectImportFound } from './selectors';
import { createComponent } from 'KaptureApp/config/componentTypes';

const {
  setSearchTerm,
  setSearchPending,
  setSearchResults,
  setSearchError,
  addComponents: _addComponents,
  setImportText: _setImportText,
  setImportPending,
  setImportComplete,
  addImportResult,
} = actions;

export const { resetComponentSearch, resetImport } = actions;

export const addComponents = (components) => {
  return (dispatch, getState) => {
    dispatch(_addComponents({ components }));
  };
};

export const searchComponents = (searchTerm) => {
  return async (dispatch, getState) => {
    dispatch(setSearchTerm({ searchTerm }));
    loadResults(searchTerm, dispatch);
  };
};

const loadResults = _.debounce(async (searchTerm, dispatch) => {
  if (searchTerm) {
    try {
      dispatch(setSearchPending());
      const results = await api.searchComponents(0, 4, searchTerm);
      const searchUpper = searchTerm.toUpperCase();
      results.sort((a, b) => {
        const aName = a.data.name.toUpperCase();
        const bName = b.data.name.toUpperCase();
        const aNameContainsTerm = aName.includes(searchUpper);
        const bNameContainsTerm = bName.includes(searchUpper);
        let value;
        if (aNameContainsTerm && bNameContainsTerm) {
          value = 0;
        } else if (aNameContainsTerm && !bNameContainsTerm) {
          value = -1;
        } else if (!aNameContainsTerm && bNameContainsTerm) {
          value = 1;
        }
        return value;
      });
      dispatch(setSearchResults({ results }));
    } catch (error) {
      dispatch(setSearchError({ error: error.message }));
    }
  }
}, 500);

export const setImportText = (importText) => {
  return (dispatch) => {
    dispatch(_setImportText({ importText }));
  };
};

export const importComponents = () => {
  return async (dispatch, getState) => {
    dispatch(setImportPending());
    const componentNames = selectImportComponentNames(getState());
    for (let i = 0; i < componentNames.length; i++) {
      const result = await api.findComponent(componentNames[i]);
      dispatch(addImportResult({ result }));
    }
    dispatch(setImportComplete());
  };
};

export const addImportedResultsToComponents = () => {
  return (dispatch, getState) => {
    const foundResults = selectImportFound(getState());
    const components = foundResults.map(({ type, data }) => {
      return createComponent(data, type);
    });
    dispatch(_addComponents({ components }));
  };
};
