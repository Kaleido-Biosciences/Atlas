import { connect } from 'react-redux';

import { Activities } from './Activities';
import {
  selectActivityInitialized,
  selectActivityInitializationError,
  selectActivityId,
  selectActivityPublishStatus,
  selectActivityPublishedContainerCollectionDetails,
  selectActivityContainerCollectionsStale,
  selectEditorInitialized,
  selectPrintInitialized,
} from '../../../../store/selectors';
import {
  loadActivity
  // publishActivityPlates,
  // resetState,
} from '../../actions';

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
  // onMarkAsCompleted: publishActivityPlates,
  // onUnmount: resetState,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
