import { connect } from 'react-redux';

import { Activities } from './Activities';
import { activity, selectors, editor } from 'KaptureApp/store';

const { selectPrintInitialized } = selectors;

const mapState = (state, props) => {
  const initialized = activity.selectInitialized(state);
  const error = activity.selectInitializationError(state);
  let loading = false;
  if (!initialized && !error) {
    loading = true;
  }
  const publishSuccess = activity.selectPublishSuccess(state);
  const publishError = activity.selectPublishError(state);
  let publishPending = false;
  if (!publishSuccess && !publishError) {
    publishPending = true;
  }
  return {
    initialized,
    loading,
    error,
    activityId: activity.selectId(state),
    publishPending,
    publishSuccess,
    publishError,
    publishedContainerCollectionDetails: activity.selectPublishedContainerCollectionDetails(
      state
    ),
    containerCollectionsStale: activity.selectContainerCollectionsStale(state),
    editorInitialized: editor.selectInitialized(state),
    printInitialized: selectPrintInitialized(state),
  };
};

const mapDispatch = {
  loadActivity: activity.loadActivity,
  onMarkAsCompleted: activity.publishActivityGrids,
  onUnmount: activity.resetActivity,
  onCompletedModalClose: activity.resetPublishState,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
