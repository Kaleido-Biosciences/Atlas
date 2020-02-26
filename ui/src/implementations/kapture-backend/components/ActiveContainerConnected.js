import { connect } from 'react-redux';

import { ActiveContainer } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { selectEditorV2ActiveContainer } = selectors;

const mapState = (state, props) => {
  return {
    activeContainer: selectEditorV2ActiveContainer(state),
  };
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(ActiveContainer);
export { connected as ActiveContainer };
