import { connect } from 'react-redux';

import { ImportComponents } from './ImportComponents';
import { addKaptureComponentsToComponents } from '../../../../../store/editorActions';

const mapDispatch = {
  onAdd: addKaptureComponentsToComponents,
};

const connected = connect(null, mapDispatch)(ImportComponents);
export { connected as ImportComponents };
