import { connect } from 'react-redux';

import { Plate } from './Plate';
import { handlePlateClick } from '../../../store/editorActions';
import {
  selectActivePlate,
  selectEditorSettings,
} from '../../../store/selectors';

const mapState = (state, props) => {
  return {
    plate: selectActivePlate(state),
    settings: selectEditorSettings(state),
  };
};

const mapDispatch = {
  onClick: handlePlateClick,
};

const connected = connect(mapState, mapDispatch)(Plate);
export { connected as Plate };
