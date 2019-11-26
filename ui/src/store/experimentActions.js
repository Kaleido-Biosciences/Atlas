import { experimentActions } from './experiment';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';
import { kapture, aws } from '../api';

const {
  setExperiment: _setExperiment,
  setExperimentLoadingStatus: _setExperimentLoadingStatus,
  setVersions: _setVersions,
  setVersionsLoadingStatus: _setVersionsLoadingStatus,
} = experimentActions;

export const { setPlateSize } = experimentActions;

export const fetchExperiment = experimentId => {
  return async (dispatch, getState) => {
    dispatch(_setExperimentLoadingStatus({ status: REQUEST_PENDING }));
    try {
      const experiment = await kapture.fetchExperiment(experimentId);
      dispatch(_setExperiment({ experiment }));
      dispatch(_setExperimentLoadingStatus({ status: REQUEST_SUCCESS }));
    } catch (error) {
      dispatch(_setExperimentLoadingStatus({ status: REQUEST_ERROR }));
    }
  };
};

export const fetchExperimentVersions = experimentId => {
  return async (dispatch, getState) => {
    dispatch(_setVersionsLoadingStatus({ status: REQUEST_PENDING }));
    try {
      const versions = await aws.fetchExperimentVersions(experimentId);
      dispatch(_setVersions({ versions }));
      dispatch(_setVersionsLoadingStatus({ status: REQUEST_SUCCESS }));
    } catch (error) {
      dispatch(_setVersionsLoadingStatus({ status: REQUEST_ERROR }));
    }
  };
};
