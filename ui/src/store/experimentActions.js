import { experimentActions } from './experiment';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';
import { kapture, aws } from '../api';

const {
  setExperimentLoadingStatus: _setExperimentLoadingStatus,
  pushVersion: _pushVersion,
  setVersions: _setVersions,
  setVersionsLoadingStatus: _setVersionsLoadingStatus,
} = experimentActions;

export const { setExperiment, setPlateSize } = experimentActions;

export const fetchExperiment = experimentId => {
  return async (dispatch, getState) => {
    dispatch(_setExperimentLoadingStatus({ status: REQUEST_PENDING }));
    try {
      const experiment = await kapture.fetchExperiment(experimentId);
      dispatch(setExperiment({ experiment }));
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

export const fetchVersion = (status, timestamp) => {
  const parsedTimestamp = parseInt(timestamp);
  return async (dispatch, getState) => {
    const { experiment } = getState();
    let version = experiment.versions.find(version => {
      return (
        version.experiment_status === status &&
        version.version === parsedTimestamp
      );
    });
    if (version) return version;
    else {
      let version = await aws.fetchVersion(status, timestamp);
      dispatch(_pushVersion({ version }));
      return version;
    }
  };
};
