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

export function selectAllGridContainers(gridIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectAllGridContainers({
        gridIds,
        viewId,
      })
    );
  };
}

export function deselectAllGridContainers(gridIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.deselectAllGridContainers({
        gridIds,
        viewId,
      })
    );
  };
}

export function selectInteriorGridContainers(gridIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectInteriorGridContainers({
        gridIds,
        viewId,
      })
    );
  };
}

export function selectBorderGridContainers(gridIds, viewId) {
  return (dispatch, getState) => {
    dispatch(
      actions.selectBorderGridContainers({
        gridIds,
        viewId,
      })
    );
  };
}
