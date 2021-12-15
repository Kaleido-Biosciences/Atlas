import { connect } from 'react-redux';
import { ImportPlatesDialog } from './ImportPlatesDialog';
import { activity } from 'store';

const mapState = (state, props) => {
  return {
    loadingSourceActivity: activity.selectLoadingImportSourceActivity(state),
    loadingSourceActivityError:
      activity.selectLoadingImportSourceActivityError(state),
    importError: activity.selectImportError(state),
    importMappings: activity.selectImportMappings(state),
    importPending: activity.selectImportPending(state),
    importSuccess: activity.selectImportSuccess(state),
    sourceActivity: activity.selectImportSourceActivity(state),
    targetPlates: activity.selectPlates(state),
  };
};

const mapDispatch = {
  onActivitySearchInputFocus: activity.resetImport,
  onActivitySelect: activity.loadImportSourceActivity,
  onImport: activity.importPlates,
  onMappingChange: activity.updateImportMappings,
  onStartOver: activity.resetImport,
};

const connected = connect(mapState, mapDispatch)(ImportPlatesDialog);
export { connected as ImportPlatesDialog };
