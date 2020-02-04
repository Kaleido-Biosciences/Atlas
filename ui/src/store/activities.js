import { createSlice } from 'redux-starter-kit';

import { DEFAULT_PLATE_SIZE } from '../constants';

const initialState = {
  searchTerm: '',
  searchStatus: null,
  searchResults: null,
  initialized: false,
  initializationError: null,
  activity: null,
  plateSize: DEFAULT_PLATE_SIZE,
  publishStatus: null,
  publishedContainerCollectionDetails: null,
  containerCollectionsStale: true,
};

const activities = createSlice({
  slice: 'activities',
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
    setSearchStatus(state, action) {
      state.searchStatus = action.payload.status;
    },
    setSearchResults(state, action) {
      state.searchResults = action.payload.searchResults;
    },
    setInitialized(state, action) {
      state.initialized = action.payload.initialized;
    },
    setInitializationError(state, action) {
      state.initializationError = action.payload.error;
    },
    resetState(state, action) {
      Object.assign(state, initialState);
    },
    setActivity(state, action) {
      state.activity = action.payload.activity;
      state.initialized = true;
      state.containerCollectionsStale = false;
    },
    setPlateSize(state, action) {
      state.plateSize = action.payload.plateSize;
    },
    setPublishStatus(state, action) {
      state.publishStatus = action.payload.status;
    },
    setPublishedContainerCollectionDetails(state, action) {
      state.publishedContainerCollectionDetails =
        action.payload.containerCollectionDetails;
    },
    setContainerCollectionsStale(state, action) {
      state.containerCollectionsStale = action.payload.stale;
    },
  },
});

export const {
  actions: activitiesActions,
  reducer: activitiesReducer,
} = activities;
