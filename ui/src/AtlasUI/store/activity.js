import { createSlice } from 'redux-starter-kit';

const initialState = {
  initialized: false,
  initializationError: null,
  id: null,
  name: null,
  description: null,
  containerCollections: null,
  data: null,
  containerCollectionsStale: true,
  publishSuccess: false,
  publishError: null,
  publishedContainerCollectionDetails: null,
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
    setContainerCollectionsStale(state, action) {
      state.containerCollectionsStale = action.payload.stale;
    },
    setPublishSuccess(state, action) {
      state.publishSuccess = action.payload.publishSuccess;
    },
    setPublishError(state, action) {
      state.publishError = action.payload.publishError;
    },
    setPublishedContainerCollectionDetails(state, action) {
      state.publishedContainerCollectionDetails =
        action.payload.containerCollectionDetails;
    },
    resetPublishState(state, action) {
      state.publishSuccess = false;
      state.publishError = null;
      state.publishedContainerCollectionDetails = null;
    },
  },
});

export const { actions: activityActions, reducer: activityReducer } = activity;
