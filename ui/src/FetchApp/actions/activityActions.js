import bigInt from 'big-integer';

import { activityActions, selectors } from 'FetchApp/store';
import { api } from 'FetchApp/api';
import { createContainerCollection } from 'KaptureApp/models';
import { STATUS_COMPLETED } from 'FetchApp/config/constants';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
} = activityActions;

const { selectActivityId } = selectors;

export const loadActivity = (id) => {
  return async (dispatch, getState) => {
    dispatch(_setInitialized({ initialized: false }));
    try {
      const response = await api.fetchActivity(id);
      const activity = response.data.body;
      dispatch(
        _setActivity({
          activity: {
            id: activity.name,
            name: activity.name,
            description: activity.description,
            data: activity,
          },
        })
      );
      dispatch(_setInitialized({ initialized: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const loadCollections = () => {
  return async (dispatch, getState) => {
    const activityId = selectActivityId(getState());
    const versions = await api.fetchActivityVersions(activityId);
    if (!versions.length) {
      versions.push({
        plateMaps: [],
        experiment_status: `${activityId}_DRAFT`,
        version: 0,
      });
    }
    const containerCollections = versions.map((version) => {
      return getCollectionFromVersion(version);
    });
    console.log(containerCollections);
  };
};

function getCollectionFromVersion(v) {
  const { experiment_status, version } = v;
  const status = experiment_status.split('_')[1];
  const containerCount = v.plateMaps.length;
  let updatedTime = null,
    icon = 'edit',
    tooltip = 'View in editor',
    route = `/editor?status=${experiment_status}&version=0`;
  if (status === STATUS_COMPLETED) {
    updatedTime = ldapToJS(version).getTime();
    icon = 'print';
    tooltip = 'Print plates';
    route = `/print?status=${experiment_status}&version=${version}`;
  }
  return createContainerCollection(
    status,
    null,
    updatedTime,
    icon,
    containerCount,
    route,
    tooltip,
    v
  );
}

function ldapToJS(n) {
  return new Date(Number(bigInt(n) / bigInt(1e4) - bigInt(1.16444736e13)));
}
