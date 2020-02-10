import _ from 'lodash';

import { kapture } from '../../../api';
import { activitySearchActions } from '../store';

const {
  setSearchTerm: _setSearchTerm,
  setLoading: _setLoading,
  setResults: _setResults,
  setError: _setError,
} = activitySearchActions;

export const { resetState } = activitySearchActions;

export const searchActivities = ({ searchTerm }) => {
  return async (dispatch, getState) => {
    dispatch(_setSearchTerm({ searchTerm }));
    loadResults(searchTerm, dispatch);
  };
};

const loadResults = _.debounce(async (value, dispatch) => {
  if (value) {
    try {
      dispatch(_setLoading({ loading: true }));
      const response = await kapture.searchActivities(0, 5, value);
      const results = response.data.map(activity => {
        return {
          title: activity.name,
          description: activity.description,
          data: activity,
        };
      });
      dispatch(_setResults({ results }));
    } catch (error) {
      dispatch(_setError({ error: error.message }));
    }
  }
}, 500);
