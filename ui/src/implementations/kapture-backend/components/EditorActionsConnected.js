import { connect } from 'react-redux';

import { EditorActions } from '../../../components';
import { selectors } from '../store';
import { actions } from '../actions';
const { selectEditorSaveStatus, selectEditorLastSaveTime } = selectors;
const { addBarcodes } = actions.editorV2;

const mapState = (state, props) => {
  return {
    saveStatus: selectEditorSaveStatus(state),
    lastSaveTime: selectEditorLastSaveTime(state),
  };
};

const mapDispatch = {
  onImportBarcodes: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
