import { activityActions, plateFunctions, selectors } from '../store';
import {
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
} from '../../../constants';
import { kapture, aws } from '../../../api';

const { selectActivityName, selectEditorPlates } = selectors;

const {
  createComponent,
  createWell,
  createPlate,
  exportPlates,
} = plateFunctions;

const { fetchCommunity, fetchCompound, fetchMedium, fetchSupplement } = kapture;

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setActivity: _setActivity,
  setPublishStatus: _setPublishStatus,
  setPublishedContainerCollectionDetails: _setPublishedContainerCollectionDetails,
} = activityActions;

export const {
  setPlateSize,
  resetState,
  setContainerCollectionsStale,
} = activityActions;

export const loadActivity = id => {
  return async (dispatch, getState) => {
    dispatch(_setInitialized({ initialized: false }));
    try {
      const activity = await kapture.fetchExperiment(id);
      const versions = await aws.fetchExperimentVersions(activity.name);
      dispatch(
        _setActivity({
          activity: {
            id: activity.id,
            name: activity.name,
            description: activity.description,
            containerCollections: versions,
            data: activity,
          },
        })
      );
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

export const importContainerCollection = (status, timestamp, slice) => {
  return async (dispatch, getState) => {
    const parsedTimestamp = parseInt(timestamp);
    const { activities } = getState();
    const { containerCollections } = activities.activity;
    let collection = containerCollections.find(collection => {
      return (
        collection.experiment_status === status &&
        collection.version === parsedTimestamp
      );
    });
    if (!collection) {
      collection = await aws.fetchVersion(status, timestamp);
    }
    if (!collection) {
      return [];
    } else {
      const plates = await importPlates(collection.plateMaps, dispatch);
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
      const data = await aws.publishExperimentPlates(
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
