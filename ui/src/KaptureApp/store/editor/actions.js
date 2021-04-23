import { actions } from './slice';

const {
  toggleGridContainerSelections: _toggleGridContainerSelections,
  deselectGridContainers: _deselectGridContainers,
  setGridComponents: _setGridComponents,
  setContainerTypes: _setContainerTypes,
  setContainerCollection: _setContainerCollection,
  addBarcodes: _addBarcodes,
  setGrids: _setGrids,
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
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

export const setContainerTypes = (containerTypes) => {
  return (dispatch, getState) => {
    dispatch(_setContainerTypes({ containerTypes }));
  };
};

export const setContainerCollection = (containerCollection) => {
  return (dispatch, getState) => {
    dispatch(_setContainerCollection({ containerCollection }));
  };
};

export const addBarcodes = (barcodes) => {
  return (dispatch, getState) => {
    dispatch(_addBarcodes({ barcodes }));
  };
};

export const setGrids = (grids) => {
  return (dispatch, getState) => {
    dispatch(_setGrids({ grids }));
  };
};

export const setInitialized = (initialized) => {
  return (dispatch, getState) => {
    dispatch(_setInitialized({ initialized }));
  };
};

export const setInitializationError = (error) => {
  return (dispatch, getState) => {
    dispatch(_setInitializationError({ error }));
  };
};
