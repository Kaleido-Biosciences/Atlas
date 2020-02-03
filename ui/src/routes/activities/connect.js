import { connect } from 'react-redux';

import { Activities } from './Activities';
import {
  selectActivityInitialized,
  selectActivityInitializationError,
  selectActivity,
  selectActivityPublishStatus,
  selectActivityPublishedContainerCollectionDetails,
  selectActivityContainerCollectionsStale,
  selectEditorInitialized,
  selectPrintInitialized,
} from '../../store/selectors';
import {
  fetchActivity,
  publishActivityPlates,
  resetState,
} from '../../store/activitiesActions';

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
    activity: selectActivity(state),
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
  fetchActivity,
  onMarkAsCompleted: publishActivityPlates,
  onUnmount: resetState,
};

const connected = connect(mapState, mapDispatch)(Activities);
export { connected as Activities };
