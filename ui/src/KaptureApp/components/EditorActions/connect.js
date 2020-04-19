import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const {
  selectEditorSavePending,
  selectEditorLastSaveTime,
  selectEditorSaveError,
} = selectors;
const { addBarcodes } = actions.editor;

const mapState = (state, props) => {
  return {
    savePending: selectEditorSavePending(state),
    lastSaveTime: selectEditorLastSaveTime(state),
    saveError: selectEditorSaveError(state),
  };
};

const mapDispatch = {
  onImportBarcodes: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
