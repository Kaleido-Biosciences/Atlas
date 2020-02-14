import { connect } from 'react-redux';

import { ImportComponents } from './ImportComponents';
import { actions } from '../../../../implementations/kapture-backend/actions';

const { addKaptureComponentsToComponents } = actions.editor;

const mapDispatch = {
  onAdd: addKaptureComponentsToComponents,
};

const connected = connect(null, mapDispatch)(ImportComponents);
export { connected as ImportComponents };
