import { connect } from 'react-redux';

import { Activities } from './Activities';
import { selectors } from '../../store';
import { actions } from '../../actions';

const { loadActivity, resetActivity, publishActivityGrids } = actions.activity;

const {
  selectActivityInitialized,
  selectActivityInitializationError,
  selectActivityId,
  selectActivityPublishStatus,
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
  return {
    initialized,
    loading,
    error,
    activityId: selectActivityId(state),
    publishStatus: selectActivityPublishStatus(state),
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
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
