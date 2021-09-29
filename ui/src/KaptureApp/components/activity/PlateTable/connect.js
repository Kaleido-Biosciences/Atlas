import { connect } from 'react-redux';
import { PlateTable } from './PlateTable';
import { activity, tools } from 'KaptureApp/store';

const mapDispatch = {
  onSaveName: activity.setPlateName,
  onWellClick: tools.handleContainerClick,
};

const connected = connect(null, mapDispatch)(PlateTable);
export { connected as PlateTable };
