import { connect } from 'react-redux';

import { ImportComponents } from './ImportComponents';
import { actions } from 'KaptureApp/actions';
import { selectors } from 'KaptureApp/store';

const {
  selectEditorComponentsImportText,
  selectEditorComponentsImportComponentNames,
  selectEditorComponentsImportFound,
  selectEditorComponentsImportNotFound,
  selectEditorComponentsImportPending,
  selectEditorComponentsImportComplete,
  selectEditorComponentsImportError,
} = selectors;
const {
  setImportText,
  importComponents,
  addImportedResultsToComponents,
  resetImport,
} = actions.editorComponents;

const mapState = (state, props) => {
  return {
    textAreaValue: selectEditorComponentsImportText(state),
    componentNames: selectEditorComponentsImportComponentNames(state),
    foundResults: selectEditorComponentsImportFound(state),
    notFoundResults: selectEditorComponentsImportNotFound(state),
    importPending: selectEditorComponentsImportPending(state),
    importComplete: selectEditorComponentsImportComplete(state),
    importError: selectEditorComponentsImportError(state),
  };
};

const mapDispatch = {
  onTextAreaChange: setImportText,
  onImportClick: importComponents,
  onAddClick: addImportedResultsToComponents,
  onBackClick: resetImport,
};

const connected = connect(mapState, mapDispatch)(ImportComponents);
export { connected as ImportComponents };
