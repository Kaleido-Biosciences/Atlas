import { editorActions } from './editor';
import { createPlateWithDimensions } from './plateFunctions';
const {
  addPlate: _addPlate,
  resetNextPlateId: _resetNextPlateId,
  updateNextPlateId: _updateNextPlateId,
} = editorActions;

const _addNewPlate = () => {
  return (dispatch, getState) => {
    const { plateSize } = getState().editor;
    const plate = createPlateWithDimensions(plateSize);
    dispatch(_addPlate({ plate }));
  };
}

function wrapWithChangeHandler(fn, publishPlateIndicator) {
  return function() {
    return (dispatch, getState) => {
      // dispatch(fn.apply(this, arguments));
      // const experimentData = getState().designExperiment;
      // dispatch(_setSaveStatus({ saveStatus: REQUEST_PENDING }));
      // handleChange(
      //   experimentData,
      //   publishPlateIndicator
      //     ? aws.publishExperimentPlates
      //     : aws.saveExperimentPlates
      // )
      //   .then(() => {
      //     dispatch(_setSaveStatus({ saveStatus: REQUEST_SUCCESS }));
      //   })
      //   .catch(() => {
      //     dispatch(_setSaveStatus({ saveStatus: REQUEST_ERROR }));
      //   });
    };
  };
}

export const { setInitialized, setPlates } = editorActions;

export const initializePlates = () => {
  return (dispatch, getState) => {
    let { plates } = getState().editor;
    if (!plates.length) {
      dispatch(_resetNextPlateId());
      dispatch(_addNewPlate());
    } else {
      const highestId = plates.reduce((highestId, plate) => {
        if (plate.id > highestId) return plate.id;
        else return highestId;
      }, 0);
      dispatch(_updateNextPlateId({ plateId: highestId + 1 }));
    }
  };
};

export const addNewPlate = wrapWithChangeHandler(_addNewPlate);