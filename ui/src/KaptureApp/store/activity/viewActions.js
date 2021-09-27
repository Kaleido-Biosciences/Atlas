import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function addView(type, plateIds, data) {
  return (dispatch, getState) => {
    dispatch(
      actions.addView({
        view: {
          id: uuidv4(),
          name: type,
          type: type,
          active: false,
          viewPlates: plateIds.map((plateId) => {
            return {
              id: plateId,
              selected:
                type === 'Editor' || type === 'PlateTable' ? true : false,
              selectedWells: [],
            };
          }),
          data: { ...data },
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
        selectedWells: [],
      };
    }),
    data: {},
  };
}

export function setAllViewPlatesSelected(viewId, selected) {
  return (dispatch, getState) => {
    dispatch(actions.setAllViewPlatesSelected({ viewId, selected }));
  };
}
