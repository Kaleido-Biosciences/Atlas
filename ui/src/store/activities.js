import { createSlice } from 'redux-starter-kit';

import { DEFAULT_PLATE_SIZE } from '../constants';

const initialSearchValues = {
  searchTerm: '',
  searchStatus: null,
  searchResults: null,
};

const initialActivityValues = {
  currentActivity: null,
  currentActivityLoadingStatus: null,
  containerCollections: [],
  plateSize: DEFAULT_PLATE_SIZE,
};

const activities = createSlice({
  slice: 'activities',
  initialState: Object.assign({}, initialSearchValues, initialActivityValues),
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
    setCurrentActivity(state, action) {
      state.currentActivity = action.payload.activity;
      state.containerCollections = [];
    },
  },
});

export const {
  actions: activitiesActions,
  reducer: activitiesReducer,
} = activities;
