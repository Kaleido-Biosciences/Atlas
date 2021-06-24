import { createSlice } from '@reduxjs/toolkit';
import { STATUS_DRAFT } from 'KaptureApp/config/constants';

const initialSaveTime = {
  savePending: false,
  saveError: null,
  lastSaveTime: null,
};

const initialCloneState = {
  cloneTargetId: null,
  cloneTargetName: null,
  cloneTargetVersion: null,
  cloneTargetVersionFetchStatus: {
    pending: false,
    success: false,
    error: null,
  },
  cloneStatus: {
    pending: false,
    success: false,
    error: null,
  },
};

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
  ...initialSaveTime,
  ...initialCloneState,
};

const activity = createSlice({
  name: 'activity',
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
    setSavePending(state, action) {
      state.savePending = true;
      state.saveError = null;
      state.lastSaveTime = null;
    },
    setLastSaveTime(state, action) {
      state.savePending = false;
      state.saveError = null;
      state.lastSaveTime = action.payload.lastSaveTime;
    },
    setSaveError(state, action) {
      state.savePending = false;
      state.saveError = action.payload.error;
    },
    resetSaveTime(state, action) {
      Object.assign(state, initialSaveTime);
    },
    setCloneTarget(state, action) {
      state.cloneTargetId = action.payload.id;
      state.cloneTargetName = action.payload.name;
      state.cloneTargetVersionFetchStatus = {
        pending: true,
        success: false,
        error: null,
      };
      state.cloneTargetVersion = null;
    },
    setCloneTargetVersion(state, action) {
      state.cloneTargetVersionFetchStatus = {
        pending: false,
        success: true,
        error: null,
      };
      state.cloneTargetVersion = action.payload.version;
    },
    setCloneTargetVersionFetchError(state, action) {
      state.cloneTargetVersionFetchStatus = {
        pending: false,
        success: false,
        error: action.payload.error,
      };
      state.cloneTargetVersion = null;
    },
    setClonePending(state, action) {
      state.cloneStatus = {
        pending: true,
        success: false,
        error: null,
      };
    },
    setCloneSuccess(state, action) {
      state.cloneStatus = {
        pending: false,
        success: true,
        error: null,
      };
    },
    setCloneError(state, action) {
      state.cloneStatus = {
        pending: false,
        success: false,
        error: action.payload.error,
      };
    },
    resetCloneState(state, action) {
      Object.assign(state, initialCloneState);
    },
    updateDraftPlateMaps(state, action) {
      const draft = state.containerCollections.find((collection) => {
        return collection.name === STATUS_DRAFT;
      });
      if (draft) {
        draft.data.plateMaps = action.payload.plateMaps;
      }
    },
  },
});

export const { actions, reducer } = activity;
