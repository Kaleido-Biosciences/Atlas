import { experimentActions } from './experiment';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';
import { kapture } from '../api';

const {
  setExperiment: _setExperiment,
  setLoadingStatus: _setLoadingStatus,
} = experimentActions;

export const fetchExperiment = experimentId => {
  return async (dispatch, getState) => {
    dispatch(_setLoadingStatus({ status: REQUEST_PENDING }));
    try {
      const experiment = await kapture.fetchExperiment(experimentId);
      dispatch(_setExperiment({ experiment }));
      dispatch(_setLoadingStatus({ status: REQUEST_SUCCESS }));
    } catch (error) {
      dispatch(_setLoadingStatus({ status: REQUEST_ERROR }));
    }
  };
};
