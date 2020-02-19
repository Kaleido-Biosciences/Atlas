import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  initializationError: null,
  id: null,
  name: null,
  description: null,
  containerCollections: null,
  data: null,
  publishStatus: null,
  publishedContainerCollectionDetails: null,
  containerCollectionsStale: true,
};

const activity = createSlice({
  slice: 'activity',
  initialState,
  reducers: {
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
      const { activity } = action.payload;
      Object.assign(state, activity);
      state.initialized = true;
      state.containerCollectionsStale = false;
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

export const { actions: activityActions, reducer: activityReducer } = activity;
