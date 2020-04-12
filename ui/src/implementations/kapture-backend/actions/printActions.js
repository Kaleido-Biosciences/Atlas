import { printActions } from '../store';
import {
  getContainerCollection,
  importContainerCollection,
} from './activityActions';
import { CONTAINER_TYPES_KEYED } from '../config/containerTypes';

const {
  setGrids: _setGrids,
  setInitializationError: _setInitializationError,
  setContainerTypes: _setContainerTypes,
} = printActions;

export const { resetState: resetPrint } = printActions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      dispatch(_setContainerTypes({ containerTypes: CONTAINER_TYPES_KEYED }));
      const collection = await dispatch(
        getContainerCollection(status, version)
      );
      const importedGrids = await importContainerCollection(collection);
      if (importedGrids.length) {
        dispatch(_setGrids({ grids: importedGrids }));
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
