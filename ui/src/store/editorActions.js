import { editorActions } from './editor';
import {
  findPlateById,
  createWell,
  createPlate,
  createPlateWithDimensions,
} from './plateFunctions';
import { selectActivePlate } from './selectors';

const {
  addPlate: _addPlate,
  resetNextPlateId: _resetNextPlateId,
  updateNextPlateId: _updateNextPlateId,
  deletePlate: _deletePlate,
  setClickMode: _setClickMode,
  deselectAllWells: _deselectAllWells,
} = editorActions;

const _addNewPlate = () => {
  return (dispatch, getState) => {
    const { plateSize } = getState().editor;
    const plate = createPlateWithDimensions(plateSize);
    dispatch(_addPlate({ plate }));
  };
};

function wrapWithChangeHandler(fn, publishPlateIndicator) {
  return function() {
    return (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
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

export const {
  setInitialized,
  setPlates,
  setActivePlate,
  addKaptureComponentsToComponents,
  addComponentToComponents,
  addComponentToToolComponents,
} = editorActions;

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

export const clonePlate = wrapWithChangeHandler((plateId, typesToClone) => {
  return (dispatch, getState) => {
    let plates = getState().editor.plates;
    const plate = findPlateById(plateId, plates);
    const wells = plate.wells.map(row => {
      return row.map(well => {
        const components = well.components.filter(component => {
          return typesToClone.includes(component.type);
        });
        return createWell(well.id, well.name, well.index, components);
      });
    });
    dispatch(_addPlate({ plate: createPlate(wells) }));
  };
});

export const deletePlate = wrapWithChangeHandler(_deletePlate);

export const setClickMode = ({ clickMode }) => {
  return (dispatch, getState) => {
    dispatch(_setClickMode({ clickMode }));
    const plate = selectActivePlate(getState());
    dispatch(_deselectAllWells({ plateId: plate.id }));
  };
};
