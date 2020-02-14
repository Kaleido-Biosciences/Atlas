import { connect } from 'react-redux';

import { Plate } from '../../../components';
import { actions } from '../actions';
import { selectors } from '../store';

const {
  handlePlateClick,
  setSettings,
  addBarcodes,
  setBarcode,
} = actions.editor;

const {
  selectEditorActivePlate,
  selectEditorSettings,
  selectEditorBarcodes,
} = selectors;

const mapState = (state, props) => {
  return {
    plate: selectEditorActivePlate(state),
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
