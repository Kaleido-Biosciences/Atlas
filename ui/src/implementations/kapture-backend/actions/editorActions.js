import { editorActions, editorComponentsActions, editorToolsActions, selectors, plateFunctions } from '../store';
import { importContainerCollection } from './activityActions';
import { REQUEST_PENDING, REQUEST_SUCCESS, REQUEST_ERROR } from '../../../constants';
import { api } from '../api';

const {
  findPlateById,
  createWell,
  createPlate,
  createPlateWithDimensions,
  getSelectedWells,
  exportPlates,
} = plateFunctions;

const {
  selectEditorActivePlate,
  selectEditorClickMode,
  selectEditorToolComponentsValid,
  selectEditorSelectedToolComponents,
  selectEditorClearMode,
  selectEditorPlates,
  selectActivityName,
  selectActivityPlateSize,
} = selectors;

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  setPlateSize: _setPlateSize,
  setPlates: _setPlates,
  addPlate: _addPlate,
  resetNextPlateId: _resetNextPlateId,
  updateNextPlateId: _updateNextPlateId,
  deletePlate: _deletePlate,
  deselectAllWells: _deselectAllWells,
  applyComponentsToWells: _applyComponentsToWells,
  clearWells: _clearWells,
  toggleWellsSelected: _toggleWellsSelected,
  setBarcode: _setBarcode,
  setSaveStatus: _setSaveStatus,
} = editorActions;

const { setClickMode: _setClickMode } = editorToolsActions;

const wrapWithChangeHandler = fn => {
  return function() {
    return async (dispatch, getState) => {
      dispatch(fn.apply(this, arguments));
      dispatch(_setSaveStatus({ saveStatus: REQUEST_PENDING }));
      const activityName = selectActivityName(getState());
      const exportedPlates = exportPlates(selectEditorPlates(getState()));
      try {
        await api.saveExperimentPlates(activityName, exportedPlates);
        dispatch(_setSaveStatus({ saveStatus: REQUEST_SUCCESS }));
      } catch (err) {
        dispatch(_setSaveStatus({ saveStatus: REQUEST_ERROR }));
      }
    };
  };
};

const _addNewPlate = () => {
  return (dispatch, getState) => {
    const { plateSize } = getState().editor;
    const plate = createPlateWithDimensions(plateSize);
    dispatch(_addPlate({ plate }));
  };
};

export const {
  setActivePlate,
  setSettings,
  addBarcodes,
  resetState: resetEditor,
} = editorActions;

export const {
  addKaptureComponentsToComponents,
  addComponentToComponents,
} = editorComponentsActions;

export const {
  addComponentToToolComponents,
  setClearMode,
  selectToolComponents,
  deselectToolComponents,
  removeToolComponents,
  addTimepointToComponent,
  updateTimepoint,
  deleteTimepoint,
} = editorToolsActions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const plates = await dispatch(importContainerCollection(status, version));
      if (plates.length) {
        dispatch(_setPlates({ plates }));
      } else {
        const plateSize = selectActivityPlateSize(getState());
        dispatch(_setPlateSize({ plateSize }));
      }
      dispatch(initializePlates());
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};

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
    dispatch(_setInitialized({ initialized: true }));
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
    const plate = selectEditorActivePlate(getState());
    dispatch(_deselectAllWells({ plateId: plate.id }));
  };
};

export const handlePlateClick = ({ plateId, wellIds }) => {
  return (dispatch, getState) => {
    const clickMode = selectEditorClickMode(getState());
    if (clickMode === 'apply') {
      if (selectEditorToolComponentsValid(getState())) {
        const components = selectEditorSelectedToolComponents(getState());
        const apply = wrapWithChangeHandler(_applyComponentsToWells);
        dispatch(apply({ plateId, wellIds, components }));
      }
    }
    if (clickMode === 'clear') {
      const clearMode = selectEditorClearMode(getState());
      const clear = wrapWithChangeHandler(_clearWells);
      dispatch(clear({ plateId, wellIds, clearMode }));
    }
    if (clickMode === 'select') {
      dispatch(_toggleWellsSelected({ plateId, wellIds }));
    }
  };
};

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
