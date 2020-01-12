import { editorActions } from './editor';
import { editorComponentsActions } from './editorComponents';
import { editorToolsActions } from './editorTools';

import {
  findPlateById,
  createWell,
  createPlate,
  createPlateWithDimensions,
  getSelectedWells,
} from './plateFunctions';
import {
  selectActivePlate,
  selectEditorClickMode,
  selectEditorToolComponentsValid,
  selectEditorSelectedToolComponents,
  selectEditorClearMode,
  selectEditorPlates,
} from './selectors';

const {
  addPlate: _addPlate,
  resetNextPlateId: _resetNextPlateId,
  updateNextPlateId: _updateNextPlateId,
  deletePlate: _deletePlate,
  deselectAllWells: _deselectAllWells,
  applyComponentsToWells: _applyComponentsToWells,
  clearWells: _clearWells,
  toggleWellsSelected: _toggleWellsSelected,
  setBarcode: _setBarcode,
} = editorActions;

const { setClickMode: _setClickMode } = editorToolsActions;

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
  setSettings,
  addBarcodes,
} = editorActions;

export const {
  addKaptureComponentsToComponents,
  addComponentToComponents,
} = editorComponentsActions;

export const {
  addComponentToToolComponents,
  setClearMode,
} = editorToolsActions;

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

export const handlePlateClick = wrapWithChangeHandler(
  ({ plateId, wellIds }) => {
    return (dispatch, getState) => {
      const clickMode = selectEditorClickMode(getState());
      if (clickMode === 'apply') {
        if (selectEditorToolComponentsValid(getState())) {
          const components = selectEditorSelectedToolComponents(getState());
          dispatch(_applyComponentsToWells({ plateId, wellIds, components }));
        }
      }
      if (clickMode === 'clear') {
        const clearMode = selectEditorClearMode(getState());
        dispatch(_clearWells({ plateId, wellIds, clearMode }));
      }
      if (clickMode === 'select') {
        dispatch(_toggleWellsSelected({ plateId, wellIds }));
      }
    };
  }
);

export const setBarcode = wrapWithChangeHandler(_setBarcode);

export const applySelectedToolComponentsToSelectedWells = wrapWithChangeHandler(
  ({ plateId }) => {
    return (dispatch, getState) => {
      const plates = selectEditorPlates(getState());
      const plate = findPlateById(plateId, plates);
      const selectedWells = getSelectedWells(plate);
      const wellIds = selectedWells.map(well => well.id);
      const components = selectEditorSelectedToolComponents(getState());
      dispatch(_applyComponentsToWells({ plateId, wellIds, components }));
    };
  }
);
