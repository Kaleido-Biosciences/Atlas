import { connect } from 'react-redux';
import { GridHeader } from './GridHeader';
import { activity } from 'KaptureApp/store';

const mapDispatch = { onSaveName: activity.setGridName };

const connected = connect(null, mapDispatch)(GridHeader);
export { connected as GridHeader };
