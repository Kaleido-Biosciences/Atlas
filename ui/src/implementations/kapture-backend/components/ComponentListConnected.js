import { connect } from 'react-redux';

import { ComponentList } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { addComponentToToolComponents } = actions.editorTools;
const { addComponentToComponents } = actions.editorComponents;
const { selectEditorV2Components, selectEditorV2ComponentCounts } = selectors;

const onComponentClick = ({ component }) => {
  return (dispatch, getState) => {
    dispatch(addComponentToComponents({ component }));
    dispatch(addComponentToToolComponents({ component }));
  };
};

const mapState = (state, props) => {
  return {
    components: selectEditorV2Components(state),
    componentCounts: selectEditorV2ComponentCounts(state),
  };
};

const mapDispatch = {
  onComponentClick,
};

const connected = connect(mapState, mapDispatch)(ComponentList);
export { connected as ComponentList };
