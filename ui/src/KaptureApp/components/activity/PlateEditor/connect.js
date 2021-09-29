import { connect } from 'react-redux';
import { PlateEditor } from './PlateEditor';
import { tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = { onGridClick: tools.handleContainerClick };

const connected = connect(mapState, mapDispatch)(PlateEditor);
export { connected as PlateEditor };
