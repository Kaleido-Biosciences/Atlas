import { connect } from 'react-redux';

import { ClearTool } from './ClearTool';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const {
  selectEditorComponentTypesToClear,
  selectEditorComponentTypes,
} = selectors;
const { setComponentTypesToClear } = actions.editorTools;

const mapState = (state, props) => {
  return {
    componentTypesToClear: selectEditorComponentTypesToClear(state),
    componentTypes: selectEditorComponentTypes(state),
  };
};
const mapDispatch = { onChange: setComponentTypesToClear };

const connected = connect(mapState, mapDispatch)(ClearTool);
export { connected as ClearTool };
