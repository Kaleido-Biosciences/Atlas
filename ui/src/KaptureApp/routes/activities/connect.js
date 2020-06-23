import { connect } from 'react-redux';

import { Activities } from './Activities';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const {
  loadActivity,
  resetActivity,
  publishActivityGrids,
  resetPublishState,
} = actions.activity;

const {
  selectActivityInitialized,
  selectActivityInitializationError,
  selectActivityId,
  selectActivityPublishSuccess,
  selectActivityPublishError,
  selectActivityPublishedContainerCollectionDetails,
  selectActivityContainerCollectionsStale,
  selectPrintInitialized,
  selectEditorInitialized,
} = selectors;

const mapState = (state, props) => {
  const initialized = selectActivityInitialized(state);
  const error = selectActivityInitializationError(state);
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  const publishSuccess = selectActivityPublishSuccess(state);
  const publishError = selectActivityPublishError(state);
  let publishPending = false;
  if (!publishSuccess && !publishError) {
    publishPending = true;
  }
  return {
    initialized,
    loading,
    error,
    activityId: selectActivityId(state),
    publishPending,
    publishSuccess,
    publishError,
    publishedContainerCollectionDetails: selectActivityPublishedContainerCollectionDetails(
      state
    ),
    containerCollectionsStale: selectActivityContainerCollectionsStale(state),
    editorInitialized: selectEditorInitialized(state),
    printInitialized: selectPrintInitialized(state),
  };
};

const mapDispatch = {
  loadActivity,
  onMarkAsCompleted: publishActivityGrids,
  onUnmount: resetActivity,
  onCompletedModalClose: resetPublishState,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
