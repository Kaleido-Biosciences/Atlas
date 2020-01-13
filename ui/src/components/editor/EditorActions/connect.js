import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import {
  selectEditorSaveStatus,
  selectEditorLastSaveTime,
} from '../../../store/selectors';
import { setCompletedStatus, addBarcodes } from '../../../store/designActions';

const mapState = (state, props) => {
  return {
    saveStatus: selectEditorSaveStatus(state),
    lastSaveTime: selectEditorLastSaveTime(state),
  };
};

const mapDispatch = {
  //   onMarkAsCompleted: setCompletedStatus,
  //   onImport: addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
