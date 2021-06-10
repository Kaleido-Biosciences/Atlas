import { createSelector } from '@reduxjs/toolkit';
import { STATUS_DRAFT } from 'KaptureApp/config/constants';

export const selectInitialized = (state) => state.activity.initialized;
export const selectInitializationError = (state) =>
  state.activity.initializationError;
export const selectId = (state) => state.activity.id;
export const selectName = (state) => state.activity.name;
export const selectDescription = (state) => state.activity.description;
export const selectContainerCollections = (state) =>
  state.activity.containerCollections;
export const selectContainerCollectionsStale = (state) =>
  state.activity.containerCollectionsStale;
export const selectData = (state) => state.activity.data;
export const selectPublishSuccess = (state) => state.activity.publishSuccess;
export const selectPublishError = (state) => state.activity.publishError;
export const selectPublishedContainerCollectionDetails = (state) =>
  state.activity.publishedContainerCollectionDetails;
export const selectSavePending = (state) => state.activity.savePending;
export const selectLastSaveTime = (state) => state.activity.lastSaveTime;
export const selectSaveError = (state) => state.activity.saveError;

export const selectCloneTargetId = (state) => state.activity.cloneTargetId;
export const selectCloneTargetName = (state) => state.activity.cloneTargetName;
export const selectCloneTargetVersion = (state) =>
  state.activity.cloneTargetVersion;
export const selectCloneTargetVersionFetchStatus = (state) =>
  state.activity.cloneTargetVersionFetchStatus;
export const selectCloneStatus = (state) => state.activity.cloneStatus;
export const selectDraftVersion = createSelector(
  [selectContainerCollections],
  (collections) => {
    const collection = collections.find((collection) => {
      return collection.name === STATUS_DRAFT;
    });
    return collection.data;
  }
);
