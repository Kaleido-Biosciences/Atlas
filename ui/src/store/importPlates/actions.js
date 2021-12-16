import { actions } from './slice';
import { activity } from '../activity';
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
      const targetPlates = activity.selectPlates(getState());
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

export const reset = actions.resetState;
