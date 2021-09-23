import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function addView(type, gridIds, data) {
  return (dispatch, getState) => {
    const viewGrids = gridIds.map((gridId) => {
      return {
        id: gridId,
        selected: false,
        selectedContainers: [],
      };
    });
    dispatch(
      actions.addView({
        view: {
          id: uuidv4(),
          name: type,
          type: type,
          data: { viewGrids, ...data },
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
      selectedContainers: [],
    };
  });
  return {
    id: uuidv4(),
    name: 'Overview',
    type: 'Overview',
    data: { viewGrids },
    active,
  };
}
