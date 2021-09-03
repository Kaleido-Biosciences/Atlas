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
    resetState(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const { actions, reducer } = grids;
