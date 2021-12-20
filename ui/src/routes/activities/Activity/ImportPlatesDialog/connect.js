import { connect } from 'react-redux';
import { ImportPlatesDialog } from './ImportPlatesDialog';
import { activity, importPlates } from 'store';

const mapState = (state, props) => {
  return {
    importError: importPlates.selectImportError(state),
    importPending: importPlates.selectImportPending(state),
    importSuccess: importPlates.selectImportSuccess(state),
    loadingSourceActivity: importPlates.selectLoadingSourceActivity(state),
    loadingSourceActivityError:
      importPlates.selectLoadingSourceActivityError(state),
    mappings: importPlates.selectMappings(state),
    sourceActivity: importPlates.selectSourceActivity(state),
    targetPlates: activity.selectPlates(state),
  };
};

const mapDispatch = {
  onActivitySearchInputFocus: importPlates.reset,
  onActivitySelect: importPlates.loadSourceActivity,
  onImport: importPlates.importPlates,
  onMappingChange: importPlates.updateMappings,
  onStartOver: importPlates.reset,
};

const connected = connect(mapState, mapDispatch)(ImportPlatesDialog);
export { connected as ImportPlatesDialog };
