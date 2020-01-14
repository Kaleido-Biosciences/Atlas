import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import {
  selectEditorSaveStatus,
  selectEditorLastSaveTime,
} from '../../../store/selectors';
import { addBarcodes } from '../../../store/editorActions';

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
