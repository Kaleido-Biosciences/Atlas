import { actions } from './slice';

const {
  toggleGridContainerSelections: _toggleGridContainerSelections,
  deselectGridContainers: _deselectGridContainers,
  setGridComponents: _setGridComponents,
} = actions;

export const toggleGridContainerSelections = (gridId, positions) => {
  return (dispatch, getState) => {
    dispatch(_toggleGridContainerSelections({ gridId, positions }));
  };
};

export const deselectGridContainers = (gridIds) => {
  return (dispatch, getState) => {
    dispatch(_deselectGridContainers({ gridIds }));
  };
};

// wrap with change handler
export const setGridComponents = (gridId, actionPositions) => {
  return (dispatch, getState) => {
    dispatch(
      _setGridComponents({
        gridId,
        positions: actionPositions,
      })
    );
  };
};
