import { connect } from 'react-redux';

import { ContainerTabBar } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { addNewPlate, setActivePlate, clonePlate, deletePlate } = actions.editor;

const { selectEditorV2Containers, selectEditorV2ActiveContainer } = selectors;

const mapState = (state, props) => {
  const containers = selectEditorV2Containers(state);
  const activeContainer = selectEditorV2ActiveContainer(state);
  return { containers, activeContainer };
};

const mapDispatch = {
  // onAddClick: addNewPlate,
  // onTabClick: setActivePlate,
  // onClone: clonePlate,
  // onDelete: deletePlate,
};

const connected = connect(mapState, mapDispatch)(ContainerTabBar);
export { connected as ContainerTabBar };
