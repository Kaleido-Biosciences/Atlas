import { connect } from 'react-redux';

import { ImportComponents } from './ImportComponents';
import { actions } from '../../../../actions';

const { addKaptureComponentsToComponents } = actions.editorComponents;

const mapDispatch = {
  onAdd: addKaptureComponentsToComponents,
};

const connected = connect(null, mapDispatch)(ImportComponents);
export { connected as ImportComponents };
