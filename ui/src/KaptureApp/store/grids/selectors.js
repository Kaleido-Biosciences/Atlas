import { createSelector } from '@reduxjs/toolkit';

export const selectGrids = (state) => state.grids.grids;
export const selectGridCount = createSelector([selectGrids], (grids) => {
  return grids.length;
});
