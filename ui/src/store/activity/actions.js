import _ from 'lodash';
import { actions } from './slice';
import * as selectors from './selectors';
import * as gridActions from './gridActions';
import * as viewActions from './viewActions';
import { api } from 'api';
import { createPlate } from 'models';

export const { resetState: resetActivity, resetSaveTime } = actions;

export function loadActivity(name) {
  return async (dispatch, getState) => {
    dispatch(actions.setLoading());
    // try {
    const plateTypes = await api.fetchPlateTypes();
    dispatch(actions.setPlateTypes({ plateTypes }));
    const activityData = await api.fetchActivity(name);
    let plates = [];
    if (activityData.plates && activityData.plates.length) {
      plates = activityData.plates.map((plate) => {
        return createPlate(plate, activityData.components);
      });
    }
    const activity = {
      id: activityData.id,
      name: activityData.name,
      startDate: activityData.startDate,
      updateDate: activityData.updateDate,
      plates,
      views: [
        viewActions.getOverview(true),
        viewActions.getPlateEditor(false),
        viewActions.getPlateTable(false),
      ],
    };
    dispatch(actions.setActivity({ activity }));
    // } catch (error) {
    //   dispatch(actions.setInitializationError({ error: error.message }));
    // }
  };
}

const saveActivity = async (dispatch, getState) => {
  dispatch(actions.setSavePending());
  try {
    const name = selectors.selectName(getState());
    const plates = selectors.selectPlates(getState());
    const response = await api.saveActivity(name, plates);
    dispatch(actions.setSaveSuccess({ updateDate: response.updateDate }));
  } catch (error) {
    dispatch(actions.setSaveError({ error: error.message }));
  }
};

const debouncedSave = _.debounce(saveActivity, 1000);

export function debouncedSaveActivity() {
  return (dispatch, getState) => {
    debouncedSave(dispatch, getState);
  };
}

export function instantSaveActivity() {
  return (dispatch, getState) => {
    saveActivity(dispatch, getState);
  };
}

export function deleteActivity(name) {
  return async (dispatch, getState) => {
    dispatch(actions.setDeleteActivityStatus({ status: 'Deleting...' }));
    try {
      await api.deleteActivity(name);
      dispatch(actions.setDeleteActivityStatus({ status: 'Activity deleted' }));
    } catch (error) {
      dispatch(actions.setDeleteActivityStatus({ status: error.message }));
    }
  };
}

export function setPlateType(plateTypeSettings) {
  return async (dispatch, getState) => {
    const plateIds = plateTypeSettings.map((setting) => setting.id);
    dispatch(actions.setPlatesSaving({ plateIds, saving: true }));
    try {
      const responseData = await api.setPlateType(plateTypeSettings);
      responseData.forEach((data) => {
        dispatch(actions.updatePlateType({ data }));
      });
      dispatch(
        actions.setUpdateDate({ updateDate: responseData[0].updateDate })
      );
      dispatch(actions.setPlatesSaving({ plateIds, saving: false }));
      return true;
    } catch (error) {
      dispatch(actions.setSetPlateTypeError({ error: error.message }));
      return false;
    }
  };
}

export function pasteToPlates(plateIds) {
  return async (dispatch, getState) => {
    const plates = selectors.selectPlates(getState());
    const plateToCopy = selectors.selectPlateToCopy(getState());
    const pasteTargets = plates.filter((plate) => plateIds.includes(plate.id));
    const plateTypeSettings = [];
    pasteTargets.forEach((pasteTarget) => {
      if (
        !pasteTarget.plateType ||
        pasteTarget.plateType.id !== plateToCopy.plateType.id
      ) {
        plateTypeSettings.push({
          id: pasteTarget.id,
          plateTypeId: plateToCopy.plateType.id,
        });
      }
    });
    let setTypeSuccess = false;
    if (plateTypeSettings.length) {
      setTypeSuccess = await dispatch(setPlateType(plateTypeSettings));
    }
    if (!plateTypeSettings.length || setTypeSuccess) {
      dispatch(actions.pasteToPlates({ plateIds }));
      dispatch(debouncedSaveActivity());
    }
  };
}

export function swapComponents(plateIds) {
  return (dispatch, getState) => {
    dispatch(actions.swapComponents({ plateIds }));
    dispatch(debouncedSaveActivity());
  };
}

export function removeComponentFromWell(plateId, wellId, componentId) {
  return (dispatch, getState) => {
    dispatch(
      actions.removeWellComponent({
        plateId,
        wellId,
        componentId,
      })
    );
    dispatch(debouncedSaveActivity());
  };
}

export const autoArrangePlates = actions.autoArrangePlates;
export const clearSetPlateTypeError = actions.clearSetPlateTypeError;
export const setPlateName = gridActions.setPlateName;
export const setPlateIdToCopy = gridActions.setPlateIdToCopy;
export const updatePlateProperties = gridActions.updatePlateProperties;
export const setPlateSelections = gridActions.setPlateSelections;
export const selectAllPlateWells = gridActions.selectAllPlateWells;
export const deselectAllPlateWells = gridActions.deselectAllPlateWells;
export const selectInteriorPlateWells = gridActions.selectInteriorPlateWells;
export const selectBorderPlateWells = gridActions.selectBorderPlateWells;
export const updatePlateWells = gridActions.updatePlateWells;
export const togglePlateWellSelections = gridActions.togglePlateWellSelections;
export const removeComponentTypesFromWells =
  gridActions.removeComponentTypesFromWells;
export const setGridComponents = gridActions.setGridComponents;

export const setActiveView = viewActions.setActiveView;
export const updateViewData = viewActions.updateViewData;
