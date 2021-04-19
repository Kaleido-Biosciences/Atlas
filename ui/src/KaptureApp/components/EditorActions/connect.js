import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import { editor } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { addBarcodes } = actions.editor;

const mapState = (state, props) => {
  return {
    savePending: editor.selectSavePending(state),
    lastSaveTime: editor.selectLastSaveTime(state),
    saveError: editor.selectSaveError(state),
    allGridBarcodesSet: editor.selectAllGridBarcodesSet(state),
  };
};

const mapDispatch = {
  onImportBarcodes: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
