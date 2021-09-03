import { actions } from './slice';
import { activity } from '../activity';
import {
  createGrid,
  createGridData,
  createContainersForGrid,
  addContainersToGrid,
} from 'AtlasUI/models';

const { wrapWithChangeHandler } = activity;

export const setGrids = (grids) => {
  return (dispatch, getState) => {
    dispatch(actions.setGrids({ grids }));
  };
};

export const addNewPlates = wrapWithChangeHandler((dimensions, quantity) => {
  return (dispatch, getState) => {
    const grids = [];
    for (let i = 0; i < quantity; i++) {
      const gridData = createGridData(dimensions);
      const grid = createGrid({
        containerType: 'Plate',
        dimensions: dimensions,
        data: gridData,
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
});
