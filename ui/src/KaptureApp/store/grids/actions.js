import { actions } from './slice';

export const setGrids = (grids) => {
  return (dispatch, getState) => {
    dispatch(actions.setGrids({ grids }));
  };
};
