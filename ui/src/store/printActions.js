import { printActions } from './print';
import { importContainerCollection } from './activitiesActions';

const {
  setPlates: _setPlates,
  setInitializationError: _setInitializationError,
} = printActions;

export const { resetState } = printActions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const plates = await dispatch(importContainerCollection(status, version));
      if (plates.length) {
        dispatch(_setPlates({ plates }));
      } else {
        dispatch(
          _setInitializationError({
            error: 'There are no containers in this collection.',
          })
        );
      }
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};
