import { actions } from './slice';

const {
  setGrids: _setGrids,
  setInitializationError: _setInitializationError,
} = actions;

export const { resetState: resetPrint } = actions;

export const setGrids = (grids) => {
  return (dispatch, getState) => {
    dispatch(_setGrids({ grids }));
  };
};

export const setInitializationError = (error) => {
  return (dispatch, getState) => {
    dispatch(_setInitializationError({ error }));
  };
};
