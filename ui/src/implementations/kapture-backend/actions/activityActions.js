import bigInt from 'big-integer';

import { activityActions, plateFunctions, selectors } from '../store';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  STATUS_COMPLETED,
} from '../../../constants';
import { api } from '../api';
import { createContainerCollection } from '../models';

const {
  selectActivityName,
  selectActivityContainerCollections,
  selectEditorPlates,
} = selectors;

const {
  createComponent,
  createWell,
  createPlate,
  exportPlates,
} = plateFunctions;

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
  setPublishStatus: _setPublishStatus,
  setPublishedContainerCollectionDetails: _setPublishedContainerCollectionDetails,
} = activityActions;

const ldapToJS = n => {
  return new Date(Number(bigInt(n) / bigInt(1e4) - bigInt(1.16444736e13)));
};

const getCollectionFromVersion = v => {
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
};

export const {
  resetState: resetActivity,
  setContainerCollectionsStale,
} = activityActions;

export const loadActivity = id => {
  return async (dispatch, getState) => {
    dispatch(_setInitialized({ initialized: false }));
    try {
      const activity = await api.fetchExperiment(id);
      const versions = await api.fetchExperimentVersions(activity.name);
      if (!versions.length) {
        versions.push({
          plateMaps: [],
          experiment_status: `${activity.name}_DRAFT`,
          version: 0,
        });
      }
      const containerCollections = versions.map(version => {
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
    let collection = containerCollections.find(collection => {
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

export const importContainerCollection = (status, timestamp, slice) => {
  return async (dispatch, getState) => {
    const parsedTimestamp = parseInt(timestamp);
    const containerCollections = selectActivityContainerCollections(getState());
    let collection = containerCollections.find(collection => {
      return (
        collection.data.experiment_status === status &&
        collection.data.version === parsedTimestamp
      );
    });
    if (!collection) {
      const version = await api.fetchVersion(status, timestamp);
      collection = getCollectionFromVersion(version);
    }
    if (!collection) {
      return [];
    } else {
      const plates = await importPlates(collection.data.plateMaps, dispatch);
      return plates;
    }
  };
};

const importPlates = async (plates, dispatch) => {
  if (plates) {
    const components = await fetchComponentsForPlates(plates);
    const statePlates = plates.map(plate => {
      let wellIndex = 0;
      const stateWells = plate.data.map(rows => {
        return rows.map(well => {
          const stateComponents = well.components.map(component => {
            const lookup = components[component.type];
            const data = lookup.find(data => data.id === component.id);
            const stateComponent = createComponent(data, component.type);
            stateComponent.timepoints = component.timepoints;
            return stateComponent;
          });
          const stateWell = createWell(
            well.id,
            well.id,
            wellIndex,
            stateComponents
          );
          wellIndex++;
          return stateWell;
        });
      });
      return createPlate(stateWells, plate.id, plate.barcode);
    });
    if (statePlates.length) {
      statePlates[0].active = true;
    }
    return statePlates;
  } else return null;
};

async function fetchComponentsForPlates(plates) {
  const components = {
    community: [],
    compound: [],
    medium: [],
    supplement: [],
    attribute: [],
  };
  const response = {
    community: [],
    compound: [],
    medium: [],
    supplement: [],
    attribute: [],
  };
  plates.forEach(plate => {
    const wells = plate.data.flat();
    wells.forEach(well => {
      well.components.forEach(component => {
        const cType = component.type;
        if (cType === 'attribute') {
          response.attribute.push(component.attributeValues);
        } else if (!components[cType].includes(component.id)) {
          components[cType].push(component.id);
        }
      });
    });
  });
  let promises, results;
  promises = components.community.map(id => {
    return api.fetchCommunity(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.community.push(result.data);
  });
  promises = components.compound.map(id => {
    return api.fetchCompound(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.compound.push(result.data);
  });
  promises = components.medium.map(id => {
    return api.fetchMedium(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.medium.push(result.data);
  });
  promises = components.supplement.map(id => {
    return api.fetchSupplement(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.supplement.push(result.data);
  });
  return response;
}

export const publishActivityPlates = () => {
  return async (dispatch, getState) => {
    dispatch(_setPublishStatus({ status: REQUEST_PENDING }));
    const activityName = selectActivityName(getState());
    const exportedPlates = exportPlates(selectEditorPlates(getState()));
    try {
      const data = await api.publishExperimentPlates(
        activityName,
        exportedPlates
      );
      dispatch(_setPublishStatus({ status: REQUEST_SUCCESS }));
      dispatch(_setPublishedContainerCollectionDetails(data));
    } catch (err) {
      dispatch(_setPublishStatus({ status: REQUEST_ERROR }));
    }
  };
};
