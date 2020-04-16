import { connect } from 'react-redux';

import { ClearTool } from './ClearTool';
import { selectors } from 'AtlasUI/store';
import { actions } from '../../../../implementations/kapture-backend/actions/';

const { selectEditorClearMode } = selectors;
const { setClearMode } = actions.editorTools;

const mapState = (state, props) => {
  return { clearMode: selectEditorClearMode(state) };
};
const mapDispatch = { onChange: setClearMode };

const connected = connect(mapState, mapDispatch)(ClearTool);
export { connected as ClearTool };
