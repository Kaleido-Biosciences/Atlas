import { actions } from './slice';

export function togglePlateSelection(plateId, viewId) {
  return (dispatch, getState) => {
    dispatch(actions.togglePlateSelection({ plateId, viewId }));
  };
}

export function setPlateSize(plateIds, numRows, numCols) {
  return (dispatch, getState) => {
    dispatch(actions.setPlateSize({ plateIds, numRows, numCols }));
  };
}

export function setPlateName(plateId, name) {
  return (dispatch, getState) => {
    dispatch(
      actions.setPlateName({
        plateId,
        name,
      })
    );
  };
}

export function updatePlateWells(plateId, updatedWells) {
  return (dispatch, getState) => {
    dispatch(
      actions.updatePlateWells({
        plateId,
        updatedWells,
      })
    );
  };
}

export function setGridComponents(gridId, actionPositions) {
  return (dispatch, getState) => {
    dispatch(
      actions.setGridComponents({
        gridId,
        positions: actionPositions,
      })
    );
  };
}

export function selectAllPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectAllPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function deselectAllPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.deselectAllPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function selectInteriorPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectInteriorPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}

export function selectBorderPlateWells(plateIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectBorderPlateWells({
        plateIds,
        viewId,
      })
    );
  };
}
