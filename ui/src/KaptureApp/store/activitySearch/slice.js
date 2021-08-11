import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  loading: false,
  error: '',
  results: [],
};

const activitySearch = createSlice({
  name: 'activitySearch',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      const { searchTerm } = action.payload;
      if (searchTerm) {
        state.searchTerm = searchTerm;
      } else {
        Object.assign(state, initialState);
      }
    },
    setLoading(state, action) {
      state.loading = action.payload.loading;
    },
    setError(state, action) {
      state.error = action.payload.error;
      state.loading = false;
    },
    setResults(state, action) {
      state.results = action.payload.results;
      state.loading = false;
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
  },
});

export const { actions, reducer } = activitySearch;
