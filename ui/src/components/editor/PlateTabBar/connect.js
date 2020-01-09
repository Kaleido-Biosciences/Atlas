import { connect } from 'react-redux';

import { PlateTabBar } from './PlateTabBar';
import {
  addNewPlate,
  setActivePlate,
  clonePlate,
  deletePlate,
} from '../../../store/editorActions';
import {
  selectEditorPlates,
  selectEditorActivePlate,
} from '../../../store/selectors';

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
