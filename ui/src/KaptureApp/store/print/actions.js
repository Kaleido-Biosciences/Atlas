import { actions } from './slice';
import { activity } from '../activity';
import { CONTAINER_TYPES_KEYED } from 'KaptureApp/config/containerTypes';

const {
  setGrids: _setGrids,
  setInitializationError: _setInitializationError,
  setContainerTypes: _setContainerTypes,
} = actions;

export const { resetState: resetPrint } = actions;

export const loadContainerCollection = (status, version) => {
  return async (dispatch, getState) => {
    try {
      dispatch(_setContainerTypes({ containerTypes: CONTAINER_TYPES_KEYED }));
      const collection = await dispatch(
        activity.getContainerCollection(status, version)
      );
      const importData = await activity.importContainerCollection(collection);
      if (importData.grids.length) {
        dispatch(_setGrids({ grids: importData.grids }));
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
