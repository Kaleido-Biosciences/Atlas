import _ from 'lodash';

import { activitiesActions } from './activities';
import { setPlates as _setEditorPlates } from './editorActions';
import { setPlates as _setPrintPlates } from './printActions';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';
import { kapture, aws, api } from '../api';
import {
  createComponent,
  createWell,
  createPlate,
  exportPlates,
} from './plateFunctions';
import { selectActivityName, selectEditorPlates } from './selectors';
const { fetchCommunity, fetchCompound, fetchMedium, fetchSupplement } = kapture;

const {
  setSearchTerm: _setSearchTerm,
  setSearchStatus: _setSearchStatus,
  setSearchResults: _setSearchResults,
  setActivity: _setActivity,
  setActivityLoadingStatus: _setActivityLoadingStatus,
  setPublishStatus: _setPublishStatus,
} = activitiesActions;

export const {
  setPlateSize,
  setInitialized,
  setContainerImportStatus,
} = activitiesActions;

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

export const importContainerCollection = (status, timestamp, slice) => {
  return async (dispatch, getState) => {
    const parsedTimestamp = parseInt(timestamp);
    const { activities } = getState();
    const { containerCollections } = activities.activity;
    const collection = containerCollections.find(collection => {
      return (
        collection.experiment_status === status &&
        collection.version === parsedTimestamp
      );
    });
    const plates = await importPlates(collection.plateMaps, dispatch);
    if (slice === 'editor') {
      dispatch(_setEditorPlates({ plates }));
    } else if (slice === 'print') {
      dispatch(_setPrintPlates({ plates }));
    }
    return plates;
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
    return fetchCommunity(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.community.push(result.data);
  });
  promises = components.compound.map(id => {
    return fetchCompound(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.compound.push(result.data);
  });
  promises = components.medium.map(id => {
    return fetchMedium(id);
  });
  results = await Promise.all(promises);
  results.forEach(result => {
    response.medium.push(result.data);
  });
  promises = components.supplement.map(id => {
    return fetchSupplement(id);
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
      await aws.publishExperimentPlates(activityName, exportedPlates);
      dispatch(_setPublishStatus({ status: REQUEST_SUCCESS }));
    } catch (err) {
      dispatch(_setPublishStatus({ status: REQUEST_ERROR }));
    }
  };
};
