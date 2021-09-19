import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function addView(viewData) {
  return (dispatch, getState) => {
    dispatch(
      actions.addView({
        view: {
          id: uuidv4(),
          type: viewData.type,
          data: viewData.data,
          active: false,
        },
      })
    );
  };
}

export function setActiveView(viewId) {
  return (dispatch, getState) => {
    dispatch(actions.setActiveView({ viewId }));
  };
}

export function getOverview(active, grids) {
  const viewGrids = grids.map((grid) => {
    return {
      id: grid.id,
      selected: false,
      selectedPositions: {},
    };
  });
  return {
    id: uuidv4(),
    name: 'Overview',
    type: 'Overview',
    active,
    data: { viewGrids },
  };
}
