import _ from 'lodash';

import { activitiesActions } from './activities';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';
import { kapture, aws, api } from '../api';

const {
  setSearchTerm: _setSearchTerm,
  setSearchStatus: _setSearchStatus,
  setSearchResults: _setSearchResults,
  setActivity: _setActivity,
  setActivityLoadingStatus: _setActivityLoadingStatus,
} = activitiesActions;

export const { setPlateSize, setStale } = activitiesActions;

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

export const fetchActivity = id => {
  return async (dispatch, getState) => {
    dispatch(_setActivityLoadingStatus({ status: REQUEST_PENDING }));
    try {
      const activity = await kapture.fetchExperiment(id);
      const versions = await aws.fetchExperimentVersions(activity.name);
      dispatch(
        _setActivity({
          activity: {
            id: activity.id,
            name: activity.name,
            data: activity,
            containerCollections: versions,
          },
        })
      );
    } catch (error) {
      dispatch(_setActivityLoadingStatus({ status: REQUEST_ERROR }));
    }
  };
};
