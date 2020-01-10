import { connect } from 'react-redux';

import { Plate } from './Plate';
import {
  handlePlateClick,
  setSettings,
  addBarcodes,
  setBarcode,
} from '../../../store/editorActions';
import {
  selectActivePlate,
  selectEditorSettings,
  selectEditorBarcodes,
} from '../../../store/selectors';

const mapState = (state, props) => {
  return {
    plate: selectActivePlate(state),
    settings: selectEditorSettings(state),
    barcodes: selectEditorBarcodes(state),
  };
};

const mapDispatch = {
  onClick: handlePlateClick,
  onSettingsChange: setSettings,
  onBarcodeAdd: addBarcodes,
  onBarcodeSelect: setBarcode,
};

const connected = connect(mapState, mapDispatch)(Plate);
export { connected as Plate };
