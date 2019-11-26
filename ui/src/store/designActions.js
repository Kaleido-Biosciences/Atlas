import { designExperimentActions } from './designExperiment';
import {
  findPlateById,
  createWell,
  createPlate,
  createPlateWithDimensions,
  exportPlates,
} from './plateFunctions';
import { aws } from '../api';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../constants';

const {
  addPlate: _addPlate,
  applySelectedToolComponentsToWells: _applySelectedToolComponentsToWells,
  clearWells: _clearWells,
  deletePlate: _deletePlate,
  setCompletedStatus: _setCompletedStatus,
  applySelectedToolComponentsToSelectedWells: _applySelectedToolComponentsToSelectedWells,
  resetNextPlateId: _resetNextPlateId,
  updateNextPlateId: _updateNextPlateId,
  setSaveStatus: _setSaveStatus,
  setBarcode: _setBarcode,
} = designExperimentActions;

/**
 * Logs the current plate state to be saved and sends the plate to be persisted
 * @param {Object} experimentData The plates to be saved
 * @param {function} saveFunction The function to be called to save the plates
 * @returns {*}
 */
const handleChange = (experimentData, saveFunction) => {
  console.log(
    'SAVE',
    saveFunction.name,
    experimentData.experiment.name,
    experimentData.plates
  );
  return saveFunction(
    experimentData.experiment.name,
    exportPlates(experimentData.plates)
  );
};

/**
 * Wraps change types with a handler that will auto save the plate on every change event.
 * @param {function} fn callback function to apply with the change (e.g. change state status, clear plate, etc...)
 * @param {boolean} [publishPlateIndicator] if this parameter is passed is truthy than it will call the publish plate function instead of save plate
 * @returns {function(): Function}
 */

function wrapWithChangeHandler(fn, publishPlateIndicator) {
  return function() {
    return (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      const experimentData = getState().designExperiment;
      dispatch(_setSaveStatus({ saveStatus: REQUEST_PENDING }));
      handleChange(
        experimentData,
        publishPlateIndicator
          ? aws.publishExperimentPlates
          : aws.saveExperimentPlates
      )
        .then(() => {
          dispatch(_setSaveStatus({ saveStatus: REQUEST_SUCCESS }));
        })
        .catch(() => {
          dispatch(_setSaveStatus({ saveStatus: REQUEST_ERROR }));
        });
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
  setActivePlate,
  toggleWellsSelected,
  setClickMode,
  deselectAllWells,
  addKaptureComponentsToComponents,
  addComponentToToolComponents,
  addComponentToComponents,
  setClearMode,
  selectToolComponents,
  deselectToolComponents,
  removeToolComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
  setStepThreeComplete,
  setSettings,
  addBarcodes,
} = designExperimentActions;

export const initializePlates = () => {
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
};

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
    dispatch(setActivePlate(newPlate.id));
  };
});

export const addNewPlate = wrapWithChangeHandler(_addNewPlate);

export const applySelectedToolComponentsToWells = wrapWithChangeHandler(
  _applySelectedToolComponentsToWells
);

export const applySelectedToolComponentsToSelectedWells = wrapWithChangeHandler(
  _applySelectedToolComponentsToSelectedWells
);

export const clearWells = wrapWithChangeHandler(_clearWells);

export const deletePlate = wrapWithChangeHandler(_deletePlate);

export const setCompletedStatus = wrapWithChangeHandler(
  _setCompletedStatus,
  true
);

export const setBarcode = wrapWithChangeHandler(_setBarcode);