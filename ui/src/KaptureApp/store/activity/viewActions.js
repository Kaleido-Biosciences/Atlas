import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function addView(type, gridIds, data) {
  return (dispatch, getState) => {
    const viewGrids = gridIds.map((gridId) => {
      return {
        id: gridId,
        selected: type === 'Editor' || type === 'PlateTable' ? true : false,
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

export function getOverview(plates, active) {
  return {
    id: uuidv4(),
    name: 'Overview',
    type: 'Overview',
    active,
    viewPlates: plates.map((plate) => {
      return {
        id: plate.id,
        selected: false,
        selectedContainers: [],
      };
    }),
    data: {},
  };
}
