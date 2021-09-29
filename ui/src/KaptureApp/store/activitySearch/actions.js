import _ from 'lodash';

import { actions } from './slice';
import { api } from 'api';

const {
  setSearchTerm: _setSearchTerm,
  setLoading: _setLoading,
  setResults: _setResults,
  setError: _setError,
} = actions;

export const { resetState: resetActivitySearch } = actions;

export const searchActivities = (searchTerm) => {
  return async (dispatch, getState) => {
    dispatch(_setSearchTerm({ searchTerm }));
    loadResults(searchTerm, dispatch);
  };
};

const loadResults = _.debounce(async (value, dispatch) => {
  if (value) {
    try {
      dispatch(_setLoading({ loading: true }));
      const response = await api.searchActivities(0, 5, value);
      const results = response.data.map((activity) => {
        return {
          name: activity.name,
          description: activity.description,
          id: activity.id,
        };
      });
      dispatch(_setResults({ results }));
    } catch (error) {
      dispatch(_setError({ error: error.message }));
    }
  }
}, 500);
