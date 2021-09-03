import { actions } from './slice';
import {
  createGrid,
  createGridPositions,
  createContainersForGrid,
  addContainersToGrid,
} from 'AtlasUI/models';

export function addNewPlates(dimensions, quantity) {
  return (dispatch, getState) => {
    const grids = [];
    for (let i = 0; i < quantity; i++) {
      const gridPositions = createGridPositions(dimensions);
      const grid = createGrid({
        containerType: 'Plate',
        dimensions: dimensions,
        positions: gridPositions,
      });
      const containerPositions = createContainersForGrid(
        dimensions,
        'PlateWell'
      );
      addContainersToGrid(grid, containerPositions);
      grids.push(grid);
    }
    dispatch(actions.addGrids({ grids }));
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
