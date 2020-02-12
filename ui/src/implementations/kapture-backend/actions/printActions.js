import { printActions } from '../store';
import { importContainerCollection } from './activityActions';

const {
  setPlates: _setPlates,
  setInitializationError: _setInitializationError,
} = printActions;

export const { resetState: resetPrint } = printActions;

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
