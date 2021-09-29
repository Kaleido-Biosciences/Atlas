import { connect } from 'react-redux';
import { Editor } from './Editor';
import { tools } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {};
};

const mapDispatch = { onGridClick: tools.handleContainerClick };

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
