import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grids: [],
};

const grids = createSlice({
  name: 'grids',
  initialState,
  reducers: {
    setGrids(state, action) {
      state.grids = action.payload.grids;
    },
    addGrids(state, action) {
      const { grids } = action.payload;
      let highestUntitled = 0;
      state.grids.forEach((grid) => {
        if (grid.name.startsWith('Untitled')) {
          const gridNum = parseInt(grid.name.substring(8));
          if (gridNum > highestUntitled) highestUntitled = gridNum;
        }
      });
      grids.forEach((grid) => {
        highestUntitled++;
        grid.name = `Untitled${highestUntitled}`;
      });
      state.grids = state.grids.concat(grids);
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const { actions, reducer } = grids;
