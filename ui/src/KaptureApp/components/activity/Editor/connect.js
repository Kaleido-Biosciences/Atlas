import { connect } from 'react-redux';
import { Editor } from './Editor';
import { CONTAINER_TYPE_OPTIONS } from 'KaptureApp/config/containerTypes';
import { activity } from 'KaptureApp/store';

const mapState = (state, props) => {
  return {
    containerTypeOptions: CONTAINER_TYPE_OPTIONS,
    settings: activity.selectSettings(state),
  };
};

const mapDispatch = {};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
