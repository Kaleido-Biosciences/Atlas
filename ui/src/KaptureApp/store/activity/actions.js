import bigInt from 'big-integer';

import { actions } from './slice';
import * as selectors from './selectors';
import { editor } from '../editor';
import { api } from 'KaptureApp/api';
import { createContainerCollection } from 'KaptureApp/models';
import { exportGrids, importGrids } from 'KaptureApp/utils/containerFunctions';
import { STATUS_COMPLETED } from 'KaptureApp/config/constants';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from 'KaptureApp/config/componentTypes';
import { CONTAINER_TYPES } from 'KaptureApp/config/containerTypes';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
  setPublishSuccess: _setPublishSuccess,
  setPublishError: _setPublishError,
  setPublishedContainerCollectionDetails: _setPublishedContainerCollectionDetails,
  setContainerCollectionsStale: _setContainerCollectionsStale,
} = actions;

let lastSaveData = '';

export const { resetState: resetActivity, resetPublishState } = actions;

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

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      dispatch(editor.setContainerTypes(CONTAINER_TYPES));
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      dispatch(editor.setContainerCollection(collection));
      const importData = await importContainerCollection(collection);
      dispatch(editor.addBarcodes(importData.barcodes));
      dispatch(editor.setGrids(importData.grids));
      const exportedGrids = exportGrids(editor.selectGrids(getState()));
      lastSaveData = JSON.stringify(exportedGrids);
      dispatch(editor.setInitialized(true));
      dispatch(_setContainerCollectionsStale({ stale: true }));
    } catch (error) {
      dispatch(editor.setInitializationError(error.message));
    }
  };
};

export const getContainerCollection = (status, timestamp) => {
  return async (dispatch, getState) => {
    const parsedTimestamp = parseInt(timestamp);
    const containerCollections = selectors.selectContainerCollections(
      getState()
    );
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
    dispatch(_setPublishSuccess({ publishSuccess: false }));
    const activityName = selectors.selectName(getState());
    const exportedGrids = exportGrids(editor.selectGrids(getState()));
    try {
      const data = await api.publishActivityGrids(activityName, exportedGrids);
      dispatch(_setPublishedContainerCollectionDetails(data));
      dispatch(_setContainerCollectionsStale({ stale: true }));
      dispatch(_setPublishSuccess({ publishSuccess: true }));
    } catch (error) {
      dispatch(_setPublishError({ publishError: error.message }));
    }
  };
};

export const setContainerCollectionsStale = (stale) => {
  return (dispatch, getState) => {
    dispatch(_setContainerCollectionsStale({ stale }));
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
