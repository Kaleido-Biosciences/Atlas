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
