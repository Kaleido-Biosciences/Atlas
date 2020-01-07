import { connect } from 'react-redux';
import queryString from 'query-string';

import { Editor } from './Editor';
import { selectActivePlate } from '../../../store/selectors';
import { importContainerCollection } from '../../../store/activitiesActions';
import { initializePlates, addNewPlate } from '../../../store/designActions';

const onMount = query => {
  return async dispatch => {
    const params = queryString.parse(query);
    await dispatch(importContainerCollection(params.status, params.version));
    dispatch(initializePlates());
  };
};

const mapState = (state, props) => {
  const { plates } = state.designExperiment;
  const activePlate = selectActivePlate(state);
  return { plates, activePlate };
};

const mapDispatch = {
  onMount,
  onAddClick: addNewPlate,
};

const connected = connect(mapState, mapDispatch)(Editor);
export { connected as Editor };
