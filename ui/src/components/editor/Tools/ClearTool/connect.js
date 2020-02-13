import { connect } from 'react-redux';

import { ClearTool } from './ClearTool';
import { selectEditorClearMode } from '../../../../../store/selectors';
import { setClearMode } from '../../../../../store/editorActions';

const mapState = (state, props) => {
  return { clearMode: selectEditorClearMode(state) };
};
const mapDispatch = { onChange: setClearMode };

const connected = connect(mapState, mapDispatch)(ClearTool);
export { connected as ClearTool };
