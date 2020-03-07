import { connect } from 'react-redux';

import { ContainerTabBar } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { clonePlate, deletePlate } = actions.editor;
const {
  addNewContainer,
  addNewContainerGrid,
  setActiveContainerId,
} = actions.editorV2;

const { selectEditorV2ContainerTabs } = selectors;

const mapState = (state, props) => {
  return {
    tabs: selectEditorV2ContainerTabs(state),
  };
};

const mapDispatch = {
  onTabClick: setActiveContainerId,
  // onClone: clonePlate,
  // onDelete: deletePlate,
  onAddContainer: addNewContainer,
  onAddContainerGrid: addNewContainerGrid,
};

const connected = connect(mapState, mapDispatch)(ContainerTabBar);
export { connected as ContainerTabBar };
