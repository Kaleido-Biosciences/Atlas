import { connect } from 'react-redux';

import { ComponentList } from './ComponentList';
import { selectors } from 'KaptureApp/store';
import { actions } from 'KaptureApp/actions';

const { addComponentToToolComponents } = actions.editorTools;
const { addComponentToComponents } = actions.editorComponents;
const { selectEditorComponents, selectEditorComponentCounts } = selectors;

const onComponentClick = ({ component }) => {
  return (dispatch, getState) => {
    dispatch(addComponentToComponents({ component }));
    dispatch(addComponentToToolComponents({ component }));
  };
};

const mapState = (state, props) => {
  return {
    components: selectEditorComponents(state),
    componentCounts: selectEditorComponentCounts(state),
  };
};

const mapDispatch = {
  onComponentClick,
};

const connected = connect(mapState, mapDispatch)(ComponentList);
export { connected as ComponentList };