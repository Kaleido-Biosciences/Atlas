import { connect } from 'react-redux';

import { ImportComponentsModal } from './ImportComponentsModal';
import { components } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    componentNames: components.selectImportComponentNames(state),
    foundResults: components.selectImportFound(state),
    importComplete: components.selectImportComplete(state),
    importError: components.selectImportError(state),
    importPending: components.selectImportPending(state),
    notFoundResults: components.selectImportNotFound(state),
    textAreaValue: components.selectImportText(state),
  };
};

const mapDispatch = {
  onAddClick: components.addImportedResultsToComponents,
  onBackClick: components.resetImport,
  onImportClick: components.importComponents,
  onTextAreaChange: components.setImportText,
};

const connected = connect(mapState, mapDispatch)(ImportComponentsModal);
export { connected as ImportComponentsModal };
