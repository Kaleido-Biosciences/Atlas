import bigInt from 'big-integer';
import _ from 'lodash';

import { actions } from './slice';
import * as selectors from './selectors';
import { actions as editorActions } from '../editor/slice';
import * as editorSelectors from '../editor/selectors';
import { print } from '../print';
import { api } from 'KaptureApp/api';
import { STATUS_DRAFT, STATUS_COMPLETED } from 'KaptureApp/config/constants';
import {
  COMPONENT_TYPE_COMMUNITY,
  COMPONENT_TYPE_COMPOUND,
  COMPONENT_TYPE_MEDIUM,
  COMPONENT_TYPE_SUPPLEMENT,
  COMPONENT_TYPE_ATTRIBUTE,
} from 'KaptureApp/config/componentTypes';
import { CONTAINER_TYPES } from 'KaptureApp/config/containerTypes';
import { createContainerCollection } from 'AtlasUI/models';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
  setPublishSuccess: _setPublishSuccess,
  setPublishError: _setPublishError,
  setPublishedContainerCollectionDetails: _setPublishedContainerCollectionDetails,
  setContainerCollectionsStale: _setContainerCollectionsStale,
  setSavePending: _setSavePending,
  setLastSaveTime: _setLastSaveTime,
  setSaveError: _setSaveError,
} = actions;

let lastSaveData = '';

const saveGrids = _.debounce(async (dispatch, getState) => {
  const exportedGrids = api.exportGrids(
    editorSelectors.selectGrids(getState())
  );
  const stringifiedGrids = JSON.stringify(exportedGrids);
  if (stringifiedGrids !== lastSaveData) {
    dispatch(_setSavePending());
    const activityName = selectors.selectName(getState());
    try {
      await api.saveActivityGrids(activityName, exportedGrids);
      dispatch(
        _setLastSaveTime({
          lastSaveTime: Date.now(),
        })
      );
      lastSaveData = stringifiedGrids;
    } catch (error) {
      dispatch(_setSaveError({ error: error.message }));
    }
  }
}, 500);

export const wrapWithChangeHandler = (fn) => {
  return function () {
    return async (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      saveGrids(dispatch, getState);
    };
  };
};

export const {
  resetState: resetActivity,
  resetPublishState,
  resetSaveTime,
} = actions;

export const loadActivity = (id) => {
  return async (dispatch, getState) => {
    dispatch(_setInitialized({ initialized: false }));
    try {
      const activity = await api.fetchActivity(id);
      const versions = await api.fetchActivityVersions(activity.name);
      const draftStatus = `${activity.name}_${STATUS_DRAFT}`;
      const draftVersion = versions.find((version) => {
        return version.experiment_status === draftStatus;
      });
      if (!draftVersion) {
        versions.unshift({
          plateMaps: [],
          experiment_status: draftStatus,
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

export const loadEditorContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      dispatch(
        editorActions.setContainerTypes({ containerTypes: CONTAINER_TYPES })
      );
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      dispatch(
        editorActions.setContainerCollection({
          containerCollection: collection,
        })
      );
      const importData = await importContainerCollection(collection);
      dispatch(editorActions.addBarcodes({ barcodes: importData.barcodes }));
      dispatch(editorActions.setGrids({ grids: importData.grids }));
      const exportedGrids = api.exportGrids(
        editorSelectors.selectGrids(getState())
      );
      lastSaveData = JSON.stringify(exportedGrids);
      dispatch(editorActions.setInitialized({ initialized: true }));
      dispatch(_setContainerCollectionsStale({ stale: true }));
    } catch (error) {
      dispatch(editorActions.setInitializationError({ error: error.message }));
    }
  };
};

export const loadPrintContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      const importData = await importContainerCollection(collection);
      if (importData.grids.length) {
        dispatch(print.setGrids(importData.grids));
      } else {
        dispatch(
          print.setInitializationError(
            'There are no containers in this collection.'
          )
        );
      }
    } catch (error) {
      dispatch(print.setInitializationError(error.message));
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
  return api.importGrids(grids, kaptureComponents);
};

export const publishActivityGrids = () => {
  return async (dispatch, getState) => {
    dispatch(_setPublishSuccess({ publishSuccess: false }));
    const activityName = selectors.selectName(getState());
    const exportedGrids = api.exportGrids(
      editorSelectors.selectGrids(getState())
    );
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
