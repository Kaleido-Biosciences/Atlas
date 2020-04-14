import bigInt from 'big-integer';

import { activityActions, selectors } from '../store';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  STATUS_COMPLETED,
} from '../../../constants';
import { api } from '../api';
import { createContainerCollection, exportGrids, importGrids } from '../models';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from '../config/componentTypes';

const {
  selectActivityName,
  selectActivityContainerCollections,
  selectEditorGrids,
} = selectors;

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
  setPublishStatus: _setPublishStatus,
  setPublishedContainerCollectionDetails: _setPublishedContainerCollectionDetails,
} = activityActions;

export const {
  resetState: resetActivity,
  setContainerCollectionsStale,
} = activityActions;

export const loadActivity = (id) => {
  return async (dispatch, getState) => {
    dispatch(_setInitialized({ initialized: false }));
    try {
      const activity = await api.fetchActivity(id);
      const versions = await api.fetchActivityVersions(activity.name);
      if (!versions.length) {
        versions.push({
          plateMaps: [],
          experiment_status: `${activity.name}_DRAFT`,
          version: 0,
        });
      }
      const containerCollections = versions.map((version) => {
        return getCollectionFromVersion(version);
      });
      dispatch(
        _setActivity({
          activity: {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            containerCollections,
            data: activity,
          },
        })
      );
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const getContainerCollection = (status, timestamp) => {
  return async (dispatch, getState) => {
    const parsedTimestamp = parseInt(timestamp);
    const containerCollections = selectActivityContainerCollections(getState());
    let collection = containerCollections.find((collection) => {
      return (
        collection.data.experiment_status === status &&
        collection.data.version === parsedTimestamp
      );
    });
    if (!collection) {
      const version = await api.fetchVersion(status, timestamp);
      collection = getCollectionFromVersion(version);
    }
    return collection;
  };
};

export const importContainerCollection = async (containerCollection) => {
  const grids = containerCollection.data.plateMaps;
  const kaptureComponents = await fetchComponentsForContainers(grids);
  return importGrids(grids, kaptureComponents);
};

export const publishActivityGrids = () => {
  return async (dispatch, getState) => {
    dispatch(_setPublishStatus({ status: REQUEST_PENDING }));
    const activityName = selectActivityName(getState());
    const exportedGrids = exportGrids(selectEditorGrids(getState()));
    try {
      const data = await api.publishActivityGrids(activityName, exportedGrids);
      dispatch(_setPublishStatus({ status: REQUEST_SUCCESS }));
      dispatch(_setPublishedContainerCollectionDetails(data));
      dispatch(setContainerCollectionsStale({ stale: true }));
    } catch (err) {
      dispatch(_setPublishStatus({ status: REQUEST_ERROR }));
    }
  };
};

async function fetchComponentsForContainers(containers) {
  const components = {
    [COMPONENT_TYPE_COMMUNITY]: [],
    [COMPONENT_TYPE_COMPOUND]: [],
    [COMPONENT_TYPE_MEDIUM]: [],
    [COMPONENT_TYPE_SUPPLEMENT]: [],
    [COMPONENT_TYPE_ATTRIBUTE]: [],
  };
  const response = {
    [COMPONENT_TYPE_COMMUNITY]: [],
    [COMPONENT_TYPE_COMPOUND]: [],
    [COMPONENT_TYPE_MEDIUM]: [],
    [COMPONENT_TYPE_SUPPLEMENT]: [],
    [COMPONENT_TYPE_ATTRIBUTE]: [],
  };
  containers.forEach((container) => {
    if (container.rows === 1 && container.columns === 1) {
      if (container.data && container.data.length) {
        container.data[0].components.forEach((component) => {
          const cType = component.type;
          if (!components[cType].includes(component.id)) {
            components[cType].push(component.id);
          }
        });
      }
    } else if (container.rows > 1 && container.columns > 1) {
      container.data.forEach((positionContainer) => {
        positionContainer.components.forEach((component) => {
          const cType = component.type;
          if (!components[cType].includes(component.id)) {
            components[cType].push(component.id);
          }
        });
      });
    }
  });
  let promises, results;
  promises = components[COMPONENT_TYPE_COMMUNITY].map((id) => {
    return api.fetchCommunity(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_COMMUNITY].push(result.data);
  });
  promises = components[COMPONENT_TYPE_COMPOUND].map((id) => {
    return api.fetchCompound(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_COMPOUND].push(result.data);
  });
  promises = components[COMPONENT_TYPE_MEDIUM].map((id) => {
    return api.fetchMedium(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_MEDIUM].push(result.data);
  });
  promises = components[COMPONENT_TYPE_SUPPLEMENT].map((id) => {
    return api.fetchSupplement(id);
  });
  results = await Promise.all(promises);
  results.forEach((result) => {
    response[COMPONENT_TYPE_SUPPLEMENT].push(result.data);
  });
  return response;
}

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
