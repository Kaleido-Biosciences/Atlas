import { connect } from 'react-redux';

import { EditorActions } from '../../../components';
import { selectors } from '../store';
import { actions } from '../actions';
const { selectEditorV2SaveStatus, selectEditorV2LastSaveTime } = selectors;
const { addBarcodes } = actions.editorV2;

const mapState = (state, props) => {
  return {
    saveStatus: selectEditorV2SaveStatus(state),
    lastSaveTime: selectEditorV2LastSaveTime(state),
  };
};

const mapDispatch = {
  onImportBarcodes: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
