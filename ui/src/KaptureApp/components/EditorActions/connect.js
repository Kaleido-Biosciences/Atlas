import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import { selectors } from 'AtlasUI/store';
import { actions } from '../../actions';
const { selectEditorSaveStatus, selectEditorLastSaveTime } = selectors;
const { addBarcodes } = actions.editor;

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
