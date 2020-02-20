import { editorV2Actions } from '../store';
import { importContainerCollection } from './activityActions';

const {
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
} = editorV2Actions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      const containers = await dispatch(
        importContainerCollection(status, version)
      );
      if (containers.length) {
        // TODO need a set containers action
        // dispatch(_setPlates({ plates }));
      }
      dispatch(_setInitialized({ initialized: true }));
    } catch (error) {
      dispatch(_setInitializationError({ error: error.message }));
    }
  };
};
