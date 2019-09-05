import { designExperimentActions } from './designExperiment';
import {
  findPlateById,
  createWell,
  createPlate,
  createPlateWithDimensions,
  exportPlates,
} from './plateFunctions';
import { aws } from '../api';

const {
  addPlate: _addPlate,
  applySelectedComponentsToWells: _applySelectedComponentsToWells,
  clearWells: _clearWells,
  setActivePlate: _setActivePlate,
  deletePlate: _deletePlate,
  setCompletedStatus: _setCompletedStatus,
  applySelectedComponentsToSelectedWells: _applySelectedComponentsToSelectedWells,
  resetNextPlateId: _resetNextPlateId,
  updateNextPlateId: _updateNextPlateId,
} = designExperimentActions;

const handleChange = experimentData => {
  console.log(
    'SAVE',
    experimentData.experiment.name,
    experimentData.status,
    experimentData.plates
  );
  aws.saveExperimentPlates(
    experimentData.experiment.name,
    experimentData.status,
    exportPlates(experimentData.plates)
  );
};

function wrapWithChangeHandler(fn) {
  return function() {
    return (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      const experimentData = getState().designExperiment;
      handleChange(experimentData);
    };
  };
}

function _addNewPlate() {
  return (dispatch, getState) => {
    const { plateSize, plates } = getState().designExperiment;
    const plate = createPlateWithDimensions(plateSize);
    if (!plates.length) plate.active = true;
    dispatch(_addPlate(plate));
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
  addKaptureComponentsToComponentsList,
  addComponentToComponents,
  setClearMode,
  selectComponents,
  deselectComponents,
  removeComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
  setStepThreeComplete,
} = designExperimentActions;

export const initializePlates = wrapWithChangeHandler(() => {
  return (dispatch, getState) => {
    let { plates } = getState().designExperiment;
    if (!plates.length) {
      dispatch(_resetNextPlateId());
      dispatch(_addNewPlate());
    } else {
      const highestId = plates.reduce((highestId, plate) => {
        if (plate.id > highestId) return plate.id;
        else return highestId;
      }, 0);
      dispatch(_updateNextPlateId(highestId + 1));
    }
  };
});

export const clonePlate = wrapWithChangeHandler((plateId, typesToClone) => {
  return (dispatch, getState) => {
    let plates = getState().designExperiment.plates;
    const plate = findPlateById(plateId, plates);
    const wells = plate.wells.map(row => {
      return row.map(well => {
        const components = well.components.filter(component => {
          return typesToClone.includes(component.type);
        });
        return createWell(well.id, well.name, well.index, components);
      });
    });
    dispatch(_addPlate(createPlate(wells)));
    plates = getState().designExperiment.plates;
    const newPlate = plates[plates.length - 1];
    dispatch(_setActivePlate(newPlate.id));
  };
});

export const addNewPlate = wrapWithChangeHandler(_addNewPlate);

export const applySelectedComponentsToWells = wrapWithChangeHandler(
  _applySelectedComponentsToWells
);

export const clearWells = wrapWithChangeHandler(_clearWells);

export const setActivePlate = wrapWithChangeHandler(_setActivePlate);

export const deletePlate = wrapWithChangeHandler(_deletePlate);

export const setCompletedStatus = wrapWithChangeHandler(_setCompletedStatus);

export const applySelectedComponentsToSelectedWells = wrapWithChangeHandler(
  _applySelectedComponentsToSelectedWells
);
