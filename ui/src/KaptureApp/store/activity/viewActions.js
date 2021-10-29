import { actions } from './slice';

export function setActiveView(viewId, plateId) {
  return (dispatch, getState) => {
    dispatch(actions.setActiveView({ viewId, plateId }));
  };
}

export function getOverview(active) {
  return {
    id: 'Overview',
    name: 'Overview',
    active,
    data: {},
  };
}

export function getPlateEditor(active) {
  return {
    id: 'PlateEditor',
    name: 'Plate Editor',
    active,
    data: {},
  };
}

export function getPlateTable(active) {
  return {
    id: 'PlateTable',
    name: 'Plate Table',
    active,
    data: {},
  };
}
