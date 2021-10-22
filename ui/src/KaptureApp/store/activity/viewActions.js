import { v4 as uuidv4 } from 'uuid';
import { actions } from './slice';

export function addView(type, plateIds, data) {
  return (dispatch, getState) => {
    let name;
    if (type === 'PlateEditor') name = 'Editor';
    if (type === 'PlateTable') name = 'Table';
    dispatch(
      actions.addView({
        view: {
          id: uuidv4(),
          name,
          type,
          active: false,
          viewPlates: plateIds.map((plateId) => {
            return {
              id: plateId,
              selected:
                type === 'PlateEditor' || type === 'PlateTable' ? true : false,
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

export function getPlateEditor(plates, active) {
  return {
    id: uuidv4(),
    name: 'Plate Editor',
    type: 'PlateEditor',
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

export function getPlateTable(plates, active) {
  return {
    id: uuidv4(),
    name: 'Plate Table',
    type: 'PlateTable',
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

export function setViewPlateSelections(viewId, selections) {
  return (dispatch, getState) => {
    dispatch(
      actions.setViewPlateSelections({
        viewId,
        selections,
      })
    );
  };
}
