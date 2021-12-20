import { actions } from './slice';
import * as selectors from './selectors';
import { activity } from '../activity';
import { actions as activityActions } from '../activity/slice';
import * as activitySelectors from '../activity/selectors';
import { api } from 'api';
import { createPlate } from 'models';

export function loadSourceActivity(name) {
  return async (dispatch, getState) => {
    dispatch(actions.setLoadingSourceActivity());
    try {
      const sourceActivity = await api.fetchActivity(name);
      const plates = sourceActivity.plates.map((plate) => {
        return createPlate(plate, sourceActivity.components);
      });
      const targetPlates = activitySelectors.selectPlates(getState());
      dispatch(
        actions.setSourceActivity({
          sourceActivity: {
            name: sourceActivity.name,
            plates,
          },
          targetPlates,
        })
      );
    } catch (error) {
      dispatch(actions.setLoadingSourceActivityError({ error: error.message }));
    }
  };
}

export function updateMappings(mappings) {
  return (dispatch, getState) => {
    dispatch(actions.updateMappings({ mappings }));
  };
}

export function importPlates() {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.setImportPending());
      const plates = activitySelectors.selectPlates(getState());
      const sourcePlates = selectors.selectSourceActivity(getState()).plates;
      const importMappings = selectors.selectMappings(getState());
      const plateTypeSettings = [];
      importMappings.forEach((mapping) => {
        if (mapping.sourceId) {
          const target = plates.find((plate) => plate.id === mapping.targetId);
          const source = sourcePlates.find(
            (plate) => plate.id === mapping.sourceId
          );
          if (
            !target.plateType ||
            target.plateType.id !== source.plateType.id
          ) {
            plateTypeSettings.push({
              id: target.id,
              plateTypeId: source.plateType.id,
            });
          }
        }
      });
      const responseData = await api.setPlateType(plateTypeSettings);
      responseData.forEach((data) => {
        dispatch(activityActions.updatePlateType({ data }));
      });
      dispatch(activityActions.importPlates({ importMappings, sourcePlates }));
      dispatch(actions.setImportSuccess());
      dispatch(activity.instantSaveActivity());
    } catch (error) {
      dispatch(actions.setImportError({ error: error.message }));
    }
  };
}

export const reset = actions.resetState;
