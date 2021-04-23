import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import { activity, editor } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { addBarcodes } = actions.editor;

const mapState = (state, props) => {
  return {
    savePending: activity.selectSavePending(state),
    lastSaveTime: activity.selectLastSaveTime(state),
    saveError: activity.selectSaveError(state),
    allGridBarcodesSet: editor.selectAllGridBarcodesSet(state),
  };
};

const mapDispatch = {
  onImportBarcodes: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
