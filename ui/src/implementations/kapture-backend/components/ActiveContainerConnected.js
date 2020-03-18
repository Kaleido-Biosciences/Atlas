import { connect } from 'react-redux';

import { ActiveContainer } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const {
  selectEditorV2ActiveContainer,
  selectEditorV2Barcodes,
  selectEditorV2Settings,
} = selectors;

const {
  addNewContainerToContainerGrid,
  handleContainerClick,
} = actions.editorV2;

const mapState = (state, props) => {
  return {
    activeContainer: selectEditorV2ActiveContainer(state),
    barcodes: selectEditorV2Barcodes(state),
    settings: selectEditorV2Settings(state),
  };
};

const mapDispatch = {
  onAddContainer: addNewContainerToContainerGrid,
  onContainerClick: handleContainerClick,
};

const connected = connect(mapState, mapDispatch)(ActiveContainer);
export { connected as ActiveContainer };
