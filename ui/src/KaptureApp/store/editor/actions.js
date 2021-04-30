import { actions } from './slice';
import * as selectors from './selectors';
import { activity } from '../activity';
import {
  createGrid,
  createGridData,
  createContainersForGrid,
  addContainersToGrid,
  createContainer,
} from 'KaptureApp/models';
import { GRID_ROW_HEADERS } from 'KaptureApp/config/grid';
import { cloneComponents } from 'KaptureApp/config/componentTypes';

const {
  addGrid: _addGrid,
  addGrids: _addGrids,
  addContainerToGrid: _addContainerToGrid,
  toggleGridContainerSelections: _toggleGridContainerSelections,
  deselectGridContainers: _deselectGridContainers,
  setGridComponents: _setGridComponents,
  setContainerTypes: _setContainerTypes,
  setContainerCollection: _setContainerCollection,
  addBarcodes: _addBarcodes,
  setGrids: _setGrids,
  setInitialized: _setInitialized,
  setInitializationError: _setInitializationError,
  deleteGrid: _deleteGrid,
  setActiveGridId: _setActiveGridId,
  setGridBarcode: _setGridBarcode,
} = actions;

const { wrapWithChangeHandler } = activity;

export const addNewPlates = wrapWithChangeHandler((dimensions, quantity) => {
  return (dispatch, getState) => {
    const grids = [];
    for (let i = 0; i < quantity; i++) {
      const gridData = createGridData(dimensions, GRID_ROW_HEADERS);
      const grid = createGrid({
        containerType: 'Plate',
        dimensions: dimensions,
        data: gridData,
      });
      const containerPositions = createContainersForGrid(
        dimensions,
        'PlateWell',
        GRID_ROW_HEADERS
      );
      addContainersToGrid(grid, containerPositions, GRID_ROW_HEADERS);
      grids.push(grid);
    }
    dispatch(_addGrids({ grids, activeGridId: grids[0].id }));
  };
});

export const addNewRack = wrapWithChangeHandler(({ dimensions }) => {
  return (dispatch, getState) => {
    const gridData = createGridData(dimensions, GRID_ROW_HEADERS);
    const grid = createGrid({
      containerType: 'Rack',
      dimensions: dimensions,
      data: gridData,
    });
    dispatch(_addGrid({ grid }));
  };
});

export const addNewContainer = wrapWithChangeHandler(({ containerType }) => {
  return (dispatch, getState) => {
    const gridData = createGridData({ rows: 1, columns: 1 }, GRID_ROW_HEADERS);
    const grid = createGrid({
      containerType,
      dimensions: { rows: 1, columns: 1 },
      data: gridData,
    });
    const containerPositions = createContainersForGrid(
      { rows: 1, columns: 1 },
      containerType,
      GRID_ROW_HEADERS
    );
    addContainersToGrid(grid, containerPositions, GRID_ROW_HEADERS);
    dispatch(_addGrid({ grid }));
  };
});

export const addNewContainerToGrid = wrapWithChangeHandler(
  ({ gridId, position, containerType }) => {
    return (dispatch, getState) => {
      const container = createContainer({ containerType });
      dispatch(
        _addContainerToGrid({
          gridId,
          position,
          container,
        })
      );
    };
  }
);

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

export const deleteGrid = wrapWithChangeHandler((gridId) => {
  return (dispatch, getState) => {
    dispatch(_deleteGrid({ gridId }));
  };
});

export const setActiveGridId = (gridId) => {
  return (dispatch, getState) => {
    dispatch(_setActiveGridId({ gridId }));
  };
};

export const cloneGrid = wrapWithChangeHandler(
  (gridId, componentTypesToClone, quantity) => {
    return (dispatch, getState) => {
      const grids = selectors.selectGrids(getState());
      const grid = grids.find((grid) => grid.id === gridId);
      const containerPositions = [];
      const positions = grid.data.flat();
      positions.forEach((position) => {
        if (position.container) {
          const clonedComponents = cloneComponents(
            position.container.components,
            componentTypesToClone
          );
          const newContainer = createContainer({
            containerType: position.container.containerType,
            components: clonedComponents,
          });
          containerPositions.push({
            row: position.row,
            column: position.column,
            container: newContainer,
          });
        }
      });
      const newGrids = [];
      for (let i = 0; i < quantity; i++) {
        const gridData = createGridData(
          { ...grid.dimensions },
          GRID_ROW_HEADERS
        );
        const newGrid = createGrid({
          containerType: grid.containerType,
          dimensions: grid.dimensions,
          data: gridData,
        });
        addContainersToGrid(newGrid, containerPositions, GRID_ROW_HEADERS);
        newGrids.push(newGrid);
      }
      dispatch(_addGrids({ grids: newGrids, activeGridId: gridId }));
    };
  }
);

export const setGridBarcode = wrapWithChangeHandler((gridId, barcode) => {
  return (dispatch, getState) => {
    dispatch(_setGridBarcode({ gridId, barcode }));
  };
});
