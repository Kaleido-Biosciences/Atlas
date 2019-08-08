import { createExperimentActions } from './createExperiment';
import {
  findPlateMapById,
  createWell,
  createPlateMap,
  createPlateMapWithDimensions,
  exportPlateMaps,
} from './plateFunctions';
import { saveExperimentPlateMaps } from '../api';

const {
  addPlateMap: _addPlateMap,
  applySelectedComponentsToWells: _applySelectedComponentsToWells,
  clearWells: _clearWells,
  setActivePlateMap: _setActivePlateMap,
  deletePlateMap: _deletePlateMap,
  setCompletedStatus: _setCompletedStatus,
  applySelectedComponentsToSelectedWells: _applySelectedComponentsToSelectedWells,
  updateNextPlateMapId: _updateNextPlateMapId,
} = createExperimentActions;

const handleChange = experimentData => {
  console.log(
    'SAVE',
    experimentData.experiment.name,
    experimentData.status,
    experimentData.plateMaps
  );
  saveExperimentPlateMaps(
    experimentData.experiment.name,
    experimentData.status,
    exportPlateMaps(experimentData.plateMaps)
  );
};

function wrapWithChangeHandler(fn) {
  return function() {
    return (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      const experimentData = getState().createExperiment;
      handleChange(experimentData);
    };
  };
}

function _addNewPlateMap() {
  return (dispatch, getState) => {
    const { plateSize, plateMaps } = getState().createExperiment;
    const plateMap = createPlateMapWithDimensions(plateSize);
    if (!plateMaps.length) plateMap.active = true;
    dispatch(_addPlateMap(plateMap));
  };
}

export const {
  setExperimentOptions,
  toggleWellsSelected,
  setClickMode,
  deselectAllWells,
  addComponents,
  moveRecentComponentsToComponents,
  removeRecentComponents,
  setClearMode,
  selectComponents,
  deselectComponents,
  removeComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
  setStepThreeComplete,
} = createExperimentActions;

export const initializePlateMaps = wrapWithChangeHandler(() => {
  return (dispatch, getState) => {
    let { plateMaps } = getState().createExperiment;
    if (!plateMaps.length) {
      dispatch(_addNewPlateMap());
    } else {
      const highestId = plateMaps.reduce((highestId, plateMap) => {
        if (plateMap.id > highestId) return plateMap.id;
        else return highestId;
      }, 0);
      dispatch(_updateNextPlateMapId(highestId + 1));
    }
  };
});

export const clonePlateMap = wrapWithChangeHandler(
  (plateMapId, typesToClone) => {
    return (dispatch, getState) => {
      let plateMaps = getState().createExperiment.plateMaps;
      const plateMap = findPlateMapById(plateMapId, plateMaps);
      const data = plateMap.data.map(row => {
        return row.map(well => {
          const components = well.components.filter(component => {
            return typesToClone.includes(component.type);
          });
          return createWell(well.id, well.name, well.index, components);
        });
      });
      dispatch(_addPlateMap(createPlateMap(data)));
      plateMaps = getState().createExperiment.plateMaps;
      const newPlateMap = plateMaps[plateMaps.length - 1];
      dispatch(_setActivePlateMap(newPlateMap.id));
    };
  }
);

export const addNewPlateMap = wrapWithChangeHandler(_addNewPlateMap);

export const applySelectedComponentsToWells = wrapWithChangeHandler(
  _applySelectedComponentsToWells
);

export const clearWells = wrapWithChangeHandler(_clearWells);

export const setActivePlateMap = wrapWithChangeHandler(_setActivePlateMap);

export const deletePlateMap = wrapWithChangeHandler(_deletePlateMap);

export const setCompletedStatus = wrapWithChangeHandler(_setCompletedStatus);

export const applySelectedComponentsToSelectedWells = wrapWithChangeHandler(
  _applySelectedComponentsToSelectedWells
);
