import { createSlice } from 'redux-starter-kit';

const initialSearchValues = {
  searchTerm: '',
  searchStatus: null,
  searchResults: null,
};

const activities = createSlice({
  slice: 'activities',
  initialState: Object.assign({}, initialSearchValues),
  reducers: {
    setSearchTerm(state, action) {
      const { searchTerm } = action.payload;
      if (searchTerm) {
        state.searchTerm = searchTerm;
      } else {
        state = Object.assign(state, initialSearchValues);
      }
    },
    setSearchStatus(state, action) {
      state.searchStatus = action.payload.status;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload.searchResults;
    },
  },
});

export const {
  actions: activitiesActions,
  reducer: activitiesReducer,
} = activities;
