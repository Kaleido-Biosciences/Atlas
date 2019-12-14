import _ from 'lodash';

import { activitiesActions } from './activities';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';
import { api } from '../api';

const {
  setSearchTerm: _setSearchTerm,
  setSearchStatus: _setSearchStatus,
  setSearchResults: _setSearchResults,
} = activitiesActions;

export const { setCurrentActivity } = activitiesActions;

export const searchActivities = ({ searchTerm }) => {
  return async (dispatch, getState) => {
    dispatch(_setSearchTerm({ searchTerm }));
    loadResults(searchTerm, dispatch);
  };
};

const loadResults = _.debounce(async (value, dispatch) => {
  if (value) {
    try {
      dispatch(_setSearchStatus({ status: REQUEST_PENDING }));
      const response = await api.kapture.searchActivities(0, 5, value);
      const results = response.data.map(activity => {
        return {
          title: activity.name,
          description: activity.description,
          data: activity,
        };
      });
      dispatch(_setSearchResults({ searchResults: results }));
      dispatch(_setSearchStatus({ status: REQUEST_SUCCESS }));
    } catch (err) {
      dispatch(_setSearchStatus({ status: REQUEST_ERROR }));
    }
  }
}, 500);
