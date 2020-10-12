import _ from 'lodash';
import { api } from 'KaptureApp/api';
import { editorComponentsActions } from 'KaptureApp/store';

const {
  setSearchTerm,
  setSearchPending,
  setSearchResults,
  setSearchError,
} = editorComponentsActions;

export const {
  addKaptureComponentsToComponents,
  addComponentToComponents,
  resetComponents,
} = editorComponentsActions;

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
