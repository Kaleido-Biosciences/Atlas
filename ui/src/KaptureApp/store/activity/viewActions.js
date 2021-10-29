import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function setActiveView(viewId) {
  return (dispatch, getState) => {
    dispatch(actions.setActiveView({ viewId }));
  };
}

export function setActiveViewWithPlate(viewType, plateId) {
  return (dispatch, getState) => {
    dispatch(
      actions.setActiveViewWithPlate({
        viewType,
        plateId,
      })
    );
  };
}

export function getOverview(active) {
  return {
    id: uuidv4(),
    name: 'Overview',
    type: 'Overview',
    active,
    data: {},
  };
}

export function getPlateEditor(active) {
  return {
    id: uuidv4(),
    name: 'Plate Editor',
    type: 'PlateEditor',
    active,
    data: {},
  };
}

export function getPlateTable(active) {
  return {
    id: uuidv4(),
    name: 'Plate Table',
    type: 'PlateTable',
    active,
    data: {},
  };
}
