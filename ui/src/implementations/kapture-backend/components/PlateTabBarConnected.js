import { connect } from 'react-redux';

import { PlateTabBar } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const { addNewPlate, setActivePlate, clonePlate, deletePlate } = actions.editor;

const { selectEditorPlates, selectEditorActivePlate } = selectors;

const mapState = (state, props) => {
  const plates = selectEditorPlates(state);
  const activePlate = selectEditorActivePlate(state);
  return { plates, activePlate };
};

const mapDispatch = {
  onAddClick: addNewPlate,
  onTabClick: setActivePlate,
  onClone: clonePlate,
  onDelete: deletePlate,
};

const connected = connect(mapState, mapDispatch)(PlateTabBar);
export { connected as PlateTabBar };
