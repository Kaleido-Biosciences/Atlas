import { connect } from 'react-redux';

import { EditorActions } from './EditorActions';
import { editor } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    allGridBarcodesSet: editor.selectAllGridBarcodesSet(state),
  };
};

const mapDispatch = {
  onImportBarcodes: editor.addBarcodes,
};

const connected = connect(mapState, mapDispatch)(EditorActions);
export { connected as EditorActions };
